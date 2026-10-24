(function (global) {
  const AI_SETTINGS_KEY = "vitrina-ai-settings";
  const AI_CHAT_KEY = "vitrina-ai-chat";
  const REQUEST_TIMEOUT_MS = 45000;

  function loadSettings() {
    try {
      return JSON.parse(localStorage.getItem(AI_SETTINGS_KEY) || "{}") || {};
    } catch {
      return {};
    }
  }

  function saveSettings(partial) {
    const next = { ...loadSettings(), ...partial };
    localStorage.setItem(AI_SETTINGS_KEY, JSON.stringify(next));
    return next;
  }

  function getApiKey() {
    return String(loadSettings().apiKey || "").trim();
  }

  function getProvider() {
    return loadSettings().provider || "gemini";
  }

  function getModel() {
    const saved = loadSettings().model || "gemini-3.8-flash";
    if (saved === "gemini-2.0-flash") {
      saveSettings({ model: "gemini-3.8-flash" });
      return "gemini-3.8-flash";
    }
    return saved;
  }

  function loadChat() {
    try {
      return JSON.parse(localStorage.getItem(AI_CHAT_KEY) || "[]") || [];
    } catch {
      return [];
    }
  }

  function saveChat(messages) {
    localStorage.setItem(AI_CHAT_KEY, JSON.stringify((messages || []).slice(-30)));
  }

  function clearChat() {
    localStorage.removeItem(AI_CHAT_KEY);
  }

  function moneyBR(n) {
    return Number(n || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  /** Contexto enxuto = resposta mais rápida e estável. */
  function buildFinanceContext(db, { compact = true } = {}) {
    if (!db) return "Sem dados financeiros carregados.";
    const txs = Array.isArray(db.transacoes) ? db.transacoes : [];
    const now = new Date();
    const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const mes = txs.filter((t) => String(t.data || "").startsWith(ym));
    const recMes = mes.filter((t) => t.tipo === "receita").reduce((a, t) => a + Number(t.valor || 0), 0);
    const desMes = mes.filter((t) => t.tipo === "despesa").reduce((a, t) => a + Number(t.valor || 0), 0);
    const pendentes = txs.filter((t) => t.status === "pendente");
    const byCat = {};
    mes.filter((t) => t.tipo === "despesa").forEach((t) => {
      byCat[t.categoria || "Outros"] = (byCat[t.categoria || "Outros"] || 0) + Number(t.valor || 0);
    });
    const topCats = Object.entries(byCat).sort((a, b) => b[1] - a[1]).slice(0, compact ? 5 : 8);
    const recentLimit = compact ? 12 : 25;
    const recent = [...txs].sort((a, b) => String(b.data).localeCompare(String(a.data))).slice(0, recentLimit);

    const lines = [
      `Empresa: ${db.empresa || "Vitrina Contabilidade"}`,
      `Mês ${ym}: receitas ${moneyBR(recMes)} | despesas ${moneyBR(desMes)} | resultado ${moneyBR(recMes - desMes)}`,
      `Pendentes: ${pendentes.length} (${moneyBR(pendentes.reduce((a, t) => a + Number(t.valor || 0), 0))})`,
      `Top despesas: ${topCats.map(([c, v]) => `${c} ${moneyBR(v)}`).join("; ") || "nenhuma"}`,
      `Cats receita: ${(db.categorias?.receita || []).slice(0, 8).join(", ")}`,
      `Cats despesa: ${(db.categorias?.despesa || []).slice(0, 10).join(", ")}`,
      "Últimos lançamentos:"
    ];
    recent.forEach((t) => {
      lines.push(`- ${t.data}|${t.tipo}|${t.categoria}|${moneyBR(t.valor)}|${String(t.desc || "").slice(0, 70)}`);
    });
    return lines.join("\n");
  }

  const SYSTEM_FAST = `Você é o Assistente Financeiro da Vitrina Contabilidade.
Responda em português do Brasil, curto e direto (máx. 12 linhas, salvo se pedirem detalhe).
Use só os dados do contexto. Não invente valores. Use R$. Bullets curtos.`;

  function extractGeminiText(data) {
    const parts = data?.candidates?.[0]?.content?.parts || [];
    const texts = parts
      .filter((p) => p && p.text && !p.thought)
      .map((p) => p.text);
    let text = texts.join("\n").trim();
    if (!text) {
      // fallback: qualquer texto disponível
      text = parts.map((p) => p?.text).filter(Boolean).join("\n").trim();
    }
    return text;
  }

  async function fetchWithTimeout(url, options, ms = REQUEST_TIMEOUT_MS) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), ms);
    try {
      return await fetch(url, { ...options, signal: ctrl.signal });
    } catch (err) {
      if (err?.name === "AbortError") throw new Error("A IA demorou demais. Tente de novo em alguns segundos.");
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }

  async function callGemini({ apiKey, model, system, user, maxTokens = 900, thinkingLevel = "low" }) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const generationConfig = {
      temperature: 0.2,
      maxOutputTokens: maxTokens
    };
    if (thinkingLevel) {
      generationConfig.thinkingConfig = { thinkingLevel };
    }
    const body = {
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: "user", parts: [{ text: user }] }],
      generationConfig
    };

    let res = await fetchWithTimeout(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    let data = await res.json().catch(() => ({}));

    // Se thinkingConfig não for aceito no modelo, tenta sem ele.
    if (!res.ok && /thinking|Thinking/i.test(data?.error?.message || "")) {
      delete body.generationConfig.thinkingConfig;
      res = await fetchWithTimeout(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      data = await res.json().catch(() => ({}));
    }

    if (!res.ok) {
      throw new Error(data?.error?.message || `Erro Gemini HTTP ${res.status}`);
    }

    const block = data?.promptFeedback?.blockReason;
    if (block) throw new Error(`Resposta bloqueada pela IA (${block}). Reformule a pergunta.`);

    const text = extractGeminiText(data);
    const finish = data?.candidates?.[0]?.finishReason;
    if (!text.trim()) {
      throw new Error(
        finish && finish !== "STOP"
          ? `A IA não concluiu a resposta (${finish}). Tente de novo.`
          : "A IA não retornou texto. Tente novamente."
      );
    }
    return text.trim();
  }

  async function callGeminiWithFallback(opts) {
    const primary = getModel();
    try {
      return await callGemini({ ...opts, model: primary });
    } catch (err) {
      const msg = String(err?.message || "");
      // Fallback rápido se 3.8 falhar/timeout
      if (primary !== "gemini-2.0-flash" && /demorou|404|not found|not supported|timed|HTTP 5|Abort/i.test(msg)) {
        return callGemini({ ...opts, model: "gemini-2.0-flash", thinkingLevel: null });
      }
      throw err;
    }
  }

  async function ask({ prompt, db, mode }) {
    const apiKey = getApiKey();
    if (!apiKey) {
      throw new Error("Configure a chave da IA em Configurações (Gemini API Key).");
    }
    const context = buildFinanceContext(db, { compact: true });
    const user = `DADOS:\n${context}\n\nPERGUNTA:\n${prompt}\n\nResposta objetiva:`;
    return callGeminiWithFallback({
      apiKey,
      system: SYSTEM_FAST,
      user,
      maxTokens: mode === "analyze" ? 1100 : 800,
      thinkingLevel: "low"
    });
  }

  async function analyzeMonth(db) {
    return ask({
      db,
      mode: "analyze",
      prompt: `Analise o mês atual em 4 blocos curtos:
1) Resultado
2) 3 alertas
3) 3 ações para 7 dias
4) Pendências`
    });
  }

  async function organizeExtrato({ texto, categoriasReceita, categoriasDespesa, db }) {
    const apiKey = getApiKey();
    if (!apiKey) throw new Error("Configure a chave da IA em Configurações para importar com IA.");

    const knownDocs = [];
    (db?.transacoes || []).slice(-80).forEach((t) => {
      const m = String(t.desc || "").match(/\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}|\d{3}\.?\d{3}\.?\d{3}-?\d{2}/g);
      if (m) knownDocs.push(`${m[0]} => ${t.desc}`);
    });

    const prompt = `Converta o extrato em JSON. Só movimentos reais.
Regras: tipo receita|despesa; data YYYY-MM-DD; valor > 0; desc com nome/CPF/CNPJ; categoria de:
receitas=${JSON.stringify(categoriasReceita || [])}
despesas=${JSON.stringify(categoriasDespesa || [])}
Se CPF/CNPJ já conhecido, reutilize a descrição.
Conhecidos: ${knownDocs.slice(0, 20).join(" | ") || "nenhum"}
JSON only: {"lancamentos":[{"data":"YYYY-MM-DD","desc":"...","tipo":"receita|despesa","valor":0,"categoria":"..."}]}

EXTRATO:
${String(texto || "").slice(0, 12000)}`;

    const raw = await callGeminiWithFallback({
      apiKey,
      system: "Responda somente JSON válido, sem markdown.",
      user: prompt,
      maxTokens: 4096,
      thinkingLevel: "low"
    });

    const jsonText = String(raw).replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "").trim();
    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      const m = jsonText.match(/\{[\s\S]*\}/);
      if (!m) throw new Error("A IA não retornou JSON válido para o extrato.");
      parsed = JSON.parse(m[0]);
    }
    const list = Array.isArray(parsed?.lancamentos) ? parsed.lancamentos : [];
    return list
      .map((r) => ({
        data: String(r.data || "").slice(0, 10),
        desc: String(r.desc || "").trim().slice(0, 180),
        tipo: r.tipo === "receita" ? "receita" : "despesa",
        valor: Math.abs(Number(r.valor) || 0),
        categoria: String(r.categoria || "").trim(),
        status: "pago",
        include: true
      }))
      .filter((r) => r.data && r.desc && r.valor > 0);
  }

  global.VitrinaAI = {
    loadSettings,
    saveSettings,
    getApiKey,
    getProvider,
    getModel,
    loadChat,
    saveChat,
    clearChat,
    buildFinanceContext,
    ask,
    analyzeMonth,
    organizeExtrato,
    hasKey: () => Boolean(getApiKey())
  };
})(window);
