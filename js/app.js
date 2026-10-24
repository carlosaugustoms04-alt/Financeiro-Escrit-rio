const KEY = "vitrina-financas-v3";
const CAT_VERSION = 4;
const BANK_VERSION = 5;

const SEED = {
  usuario: "Carlos",
  acessoUsuario: "Carlos",
  senha: "Carlos27",
  moeda: "BRL",
  empresa: "Vitrina Contabilidade · Finanças",
  authCredVersion: 2,
  catVersion: CAT_VERSION,
  bankVersion: BANK_VERSION,
  categorias: {
    receita: [
      "Honorários Fixos Mensais",
      "Imposto de Renda",
      "Certificado Digital",
      "Legalização de Empresas",
      "Serviços Diversos"
    ],
    despesa: [
      "Folha de pagamento",
      "Água",
      "Luz",
      "IPTU",
      "Despesas com informática",
      "Materiais de papelaria",
      "Despesas com manutenção",
      "Conselho de classe",
      "Outros"
    ],
    funcionario: ["Contador", "Analista fiscal", "Assistente", "Financeiro"]
  },
  bancos: [
    { id: "nubank-vitrina", nome: "Nu Bank Vitrina", saldoInicial: 0 },
    { id: "nubank-patricia", nome: "Nu Bank Patrícia", saldoInicial: 0 },
    { id: "c6", nome: "C6 Bank", saldoInicial: 0 },
    { id: "caixa", nome: "Caixa Econômica Federal", saldoInicial: 0 },
    { id: "sicoob", nome: "Sicoob", saldoInicial: 0 },
    { id: "bb", nome: "Banco do Brasil", saldoInicial: 0 },
    { id: "itau", nome: "Itaú", saldoInicial: 0 }
  ],
  funcionarios: [],
  metas: [
    { id: "m1", nome: "Receita mensal", alvo: 0, tipo: "receita" },
    { id: "m2", nome: "Limite de despesas", alvo: 0, tipo: "despesa" }
  ],
  orcamentos: [
    { id: "o1", categoria: "Folha de pagamento", limite: 0 },
    { id: "o2", categoria: "Despesas com informática", limite: 0 },
    { id: "o3", categoria: "Despesas com manutenção", limite: 0 }
  ],
  recorrentes: [],
  transacoes: []
};

// Aba "Desp Escr" de OUTUBRO.xlsx — competência SETEMBRO/2026.
// Só entra lançamento com valor. Ids fixos evitam duplicar no F5.
const DESP_ESCR_SETEMBRO = [
  { id: "xlsx-desp-emex", desc: "EMEX", tipo: "despesa", valor: 118.08, data: "2026-09-30", categoria: "Folha de pagamento", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-maria-rita", desc: "Maria Rita 3X 926,93", tipo: "despesa", valor: 926.93, data: "2026-09-30", categoria: "Folha de pagamento", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-emily", desc: "Emily 1840,63", tipo: "despesa", valor: 1928.28, data: "2026-09-30", categoria: "Folha de pagamento", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-carlos-augusto", desc: "Carlos Augusto", tipo: "despesa", valor: 2100, data: "2026-09-30", categoria: "Folha de pagamento", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-priscila", desc: "Priscila", tipo: "despesa", valor: 3400, data: "2026-09-30", categoria: "Folha de pagamento", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-priscila-13", desc: "Priscila 13° parcelado em 14 semanas parc 01/14", tipo: "despesa", valor: 972, data: "2026-09-30", categoria: "Folha de pagamento", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-jeniffer", desc: "Jeniffer", tipo: "despesa", valor: 1100, data: "2026-09-30", categoria: "Folha de pagamento", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-aguas", desc: "Aguas de Paraty", tipo: "despesa", valor: 165.72, data: "2026-09-30", categoria: "Água", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-alterdata", desc: "Alterdata 09/26", tipo: "despesa", valor: 1745.63, data: "2026-09-30", categoria: "Despesas com informática", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-curso-dp", desc: "Curso DP 04/06", tipo: "despesa", valor: 226.66, data: "2026-09-30", categoria: "Outros", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-enel", desc: "ENEL ESCRITORIO 08/2026", tipo: "despesa", valor: 314.74, data: "2026-09-30", categoria: "Luz", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-iptu", desc: "IPTU Escritório 9/10", tipo: "despesa", valor: 110.09, data: "2026-09-30", categoria: "IPTU", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-curso-reforma", desc: "CURSO REFORMA TRIBUTARIA 04/06", tipo: "despesa", valor: 200, data: "2026-09-30", categoria: "Outros", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-econet", desc: "Econet Editora", tipo: "despesa", valor: 249.97, data: "2026-09-30", categoria: "Outros", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-oi", desc: "oi 09/2026", tipo: "despesa", valor: 13.31, data: "2026-09-30", categoria: "Outros", banco: "nubank-vitrina", status: "pago" },
  { id: "xlsx-desp-unimed", desc: "UNIMED PATRICIA/CARLOS/GU", tipo: "despesa", valor: 1660.89, data: "2026-09-30", categoria: "Outros", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-vivo", desc: "VIVO FIBRA E VIVO MOVEL", tipo: "despesa", valor: 336.4, data: "2026-09-30", categoria: "Outros", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-bruno", desc: "Bruno Informática", tipo: "despesa", valor: 600, data: "2026-09-30", categoria: "Despesas com informática", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-patricia", desc: "Patrícia", tipo: "despesa", valor: 1000, data: "2026-09-30", categoria: "Folha de pagamento", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-carlinhos", desc: "Carlinhos", tipo: "despesa", valor: 1000, data: "2026-09-30", categoria: "Folha de pagamento", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-rec-simpl", desc: "Vitrina - Parc Rec Simpl 11/15", tipo: "despesa", valor: 575.91, data: "2026-09-30", categoria: "Outros", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-prefeitura", desc: "Prefeitura Vitrina - Parcela 09/12", tipo: "despesa", valor: 160.6, data: "2026-09-30", categoria: "Outros", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-prev-04", desc: "Carlos PJ - Previdencia 04/2022", tipo: "despesa", valor: 185.36, data: "2026-09-30", categoria: "Outros", banco: "nubank-vitrina", status: "pendente" },
  { id: "xlsx-desp-prev-13", desc: "Carlos PJ - Previdencia 13/2022", tipo: "despesa", valor: 85.71, data: "2026-09-30", categoria: "Outros", banco: "nubank-vitrina", status: "pendente" }
];

function mergeDespEscr() {
  if (!Array.isArray(db.transacoes)) db.transacoes = [];
  const ids = new Set(db.transacoes.map((t) => t.id));
  let added = 0;
  DESP_ESCR_SETEMBRO.forEach((tx) => {
    if (ids.has(tx.id)) return;
    db.transacoes.push({ ...tx });
    ids.add(tx.id);
    added += 1;
  });
  if (added) save();
  return added;
}

function cats(tipo) {
  if (!db.categorias) db.categorias = structuredClone(SEED.categorias);
  if (!db.categorias[tipo]) db.categorias[tipo] = [];
  return db.categorias[tipo];
}

function t(desc, tipo, valor, data, categoria, banco, status) {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    desc, tipo, valor, data, categoria, banco, status
  };
}

function loadLocal() {
  const raw = localStorage.getItem(KEY);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(KEY, JSON.stringify(SEED));
  return structuredClone(SEED);
}

let cloudTimer = null;
let cloudBusy = false;
let lastCloudAt = null;
let lastCloudError = null;

function saveLocal() {
  localStorage.setItem(KEY, JSON.stringify(db));
}

async function saveCloud(force = false) {
  if (!window.VitrinaCloud?.ready) {
    lastCloudError = "Supabase não configurado";
    return false;
  }
  if (cloudBusy && !force) return false;
  cloudBusy = true;
  try {
    const result = await window.VitrinaCloud.save(db);
    if (result.ok) {
      lastCloudAt = new Date();
      lastCloudError = null;
      return true;
    }
    lastCloudError = result.error?.message || "Falha ao salvar na nuvem";
    return false;
  } finally {
    cloudBusy = false;
  }
}

function queueCloudSave() {
  clearTimeout(cloudTimer);
  cloudTimer = setTimeout(() => { saveCloud(); }, 900);
}

function save() {
  saveLocal();
  queueCloudSave();
}

function normalizeDb(data) {
  let next = migrateBancos(migrateCategorias(data));
  if (!next.acessoUsuario) next.acessoUsuario = next.usuario || "Carlos";
  if (next.authCredVersion !== 2) {
    next.acessoUsuario = "Carlos";
    next.senha = "Carlos27";
    next.authCredVersion = 2;
  }
  if (!next.senha) next.senha = "Carlos27";
  return next;
}

function migrateCategorias(data) {
  if (data.catVersion === CAT_VERSION) return data;
  if (!data.categorias) data.categorias = {};
  data.categorias.receita = structuredClone(SEED.categorias.receita);
  data.categorias.despesa = structuredClone(SEED.categorias.despesa);
  if (!data.categorias.funcionario) data.categorias.funcionario = structuredClone(SEED.categorias.funcionario);
  const despesas = new Set(data.categorias.despesa);
  if (Array.isArray(data.orcamentos)) {
    data.orcamentos = data.orcamentos.map((o, i) => ({
      ...o,
      categoria: despesas.has(o.categoria) ? o.categoria : (SEED.orcamentos[i]?.categoria || SEED.categorias.despesa[0])
    }));
  }
  data.catVersion = CAT_VERSION;
  return data;
}

function migrateBancos(data) {
  if (data.bankVersion === BANK_VERSION) return data;
  const prev = Array.isArray(data.bancos) ? data.bancos : [];
  const saldoById = Object.fromEntries(prev.map((b) => [b.id, Number(b.saldoInicial) || 0]));
  data.bancos = SEED.bancos.map((b) => ({
    ...structuredClone(b),
    saldoInicial: saldoById[b.id] ?? 0
  }));
  const valid = new Set(data.bancos.map((b) => b.id));
  const fallback = data.bancos[0]?.id || "nubank-vitrina";
  if (Array.isArray(data.transacoes)) {
    data.transacoes = data.transacoes.map((tx) => ({
      ...tx,
      banco: valid.has(tx.banco) ? tx.banco : fallback
    }));
  }
  data.bankVersion = BANK_VERSION;
  return data;
}

let db = normalizeDb(loadLocal());
saveLocal();
let view = "painel";
const AUTH_KEY = "vitrina-auth-session";
let autenticado = false;

const $ = (id) => document.getElementById(id);
const money = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
function isoLocal(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
const todayISO = () => isoLocal();

function parseISO(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function inPeriod(dateStr, periodo, de, ate) {
  const d = parseISO(dateStr);
  const now = new Date();
  if (periodo === "tudo") return true;
  if (periodo === "custom") {
    if (de && d < parseISO(de)) return false;
    if (ate && d > parseISO(ate)) return false;
    return true;
  }
  if (periodo === "semana") {
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    start.setHours(0, 0, 0, 0);
    return d >= start && d <= now;
  }
  if (periodo === "ano") return d.getFullYear() === now.getFullYear();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

function filtered(extra = {}) {
  const tipo = extra.tipo ?? $("filtro-tipo").value;
  const cat = extra.categoria ?? $("filtro-categoria").value;
  const periodo = extra.periodo ?? $("filtro-periodo").value;
  const busca = (extra.busca ?? $("filtro-busca").value).trim().toLowerCase();
  const de = $("filtro-de").value;
  const ate = $("filtro-ate").value;

  return db.transacoes.filter((tx) => {
    if (tipo !== "todos" && tx.tipo !== tipo) return false;
    if (cat !== "todas" && tx.categoria !== cat) return false;
    if (!inPeriod(tx.data, periodo, de, ate)) return false;
    if (busca) {
      const blob = `${tx.desc} ${tx.categoria} ${tx.valor}`.toLowerCase();
      if (!blob.includes(busca)) return false;
    }
    return true;
  }).sort((a, b) => b.data.localeCompare(a.data));
}

function bancoNome(id) {
  return db.bancos.find((b) => b.id === id)?.nome || "—";
}

function fillSelect(el, items, allLabel, allValue) {
  const current = el.value;
  el.innerHTML = `<option value="${allValue}">${allLabel}</option>` + items.map((i) => {
    const v = typeof i === "string" ? i : i.id;
    const l = typeof i === "string" ? i : i.nome;
    return `<option value="${v}">${l}</option>`;
  }).join("");
  if ([...el.options].some((o) => o.value === current)) el.value = current;
}

function categoriesForTipo(tipo) {
  if (tipo === "receita") return cats("receita");
  if (tipo === "despesa") return cats("despesa");
  return [...cats("receita"), ...cats("despesa")];
}

function populateFilters() {
  const painelTipo = $("filtro-tipo")?.value || "todos";
  const txTipo = $("tx-tipo")?.value || "todos";
  fillSelect($("filtro-categoria"), categoriesForTipo(painelTipo), "Todas as categorias", "todas");
  fillSelect($("tx-categoria"), categoriesForTipo(txTipo), "Todas as categorias", "todas");
  fillSelect($("tx-banco"), db.bancos, "Todos os bancos", "todos");
  if ($("rec-categoria")) fillSelect($("rec-categoria"), cats("receita"), "Todas as categorias", "todas");
  if ($("des-categoria")) fillSelect($("des-categoria"), cats("despesa"), "Todas as categorias", "todas");
}

function greeting() {
  const h = new Date().getHours();
  const txt = h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite";
  $("greeting").textContent = `${txt}, ${db.usuario}`;
  const data = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  $("subtitle").textContent = `${data.charAt(0).toUpperCase()}${data.slice(1)} — ${db.empresa}`;
}

function toast(msg) {
  const el = $("toast");
  el.textContent = msg;
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("hidden"), 2600);
}

function sum(list, tipo) {
  return list.filter((x) => !tipo || x.tipo === tipo).reduce((a, x) => a + Number(x.valor), 0);
}

function renderPainel() {
  const list = filtered();
  const receitas = sum(list, "receita");
  const despesas = sum(list, "despesa");
  const saldoBancos = db.bancos.reduce((a, b) => a + b.saldoInicial, 0);
  const saldo = saldoBancos + sum(db.transacoes.filter((x) => x.status === "pago"), "receita") - sum(db.transacoes.filter((x) => x.status === "pago"), "despesa");
  const hoje = todayISO();
  const novasHoje = db.transacoes.filter((x) => x.tipo === "despesa" && x.data === hoje).length;

  $("kpi-saldo").textContent = money(saldo);
  $("kpi-saldo-sub").textContent = list.length ? `${list.length} ${list.length === 1 ? "lançamento" : "lançamentos"} no filtro` : "Sem histórico ainda";
  $("kpi-receitas").textContent = money(receitas);
  $("kpi-receitas-sub").textContent = receitas ? `${list.filter((x) => x.tipo === "receita").length} receitas no período` : "Nenhuma receita este mês";
  $("kpi-despesas").textContent = money(despesas);
  $("kpi-despesas-sub").textContent = `${novasHoje} novas hoje`;
  $("kpi-resultado").textContent = money(receitas - despesas);
  $("kpi-resultado-sub").textContent = receitas - despesas >= 0 ? "Mês positivo até agora" : "Atenção: resultado negativo";
  $("kpi-resultado").className = receitas - despesas >= 0 ? "gold" : "rose";

  $("filtro-resumo").textContent = `${list.length} ${list.length === 1 ? "resultado" : "resultados"} na consulta`;

  const grupos = {};
  list.forEach((tx) => {
    if (!grupos[tx.categoria]) grupos[tx.categoria] = { receita: 0, despesa: 0 };
    grupos[tx.categoria][tx.tipo] += Number(tx.valor);
  });
  const cards = Object.entries(grupos).slice(0, 6).map(([nome, v]) => {
    const saldo = v.receita - v.despesa;
    return `<article class="card obra-card">
      <span class="status">${v.receita && v.despesa ? "Misto" : v.receita ? "Receita" : "Despesa"}</span>
      <h4>${nome}</h4>
      <strong>${money(saldo)}</strong>
      <p>Entradas ${money(v.receita)} · Saídas ${money(v.despesa)}</p>
    </article>`;
  }).join("");
  $("categorias-resumo").innerHTML = cards || `<article class="card"><p class="empty">Nenhuma categoria no filtro atual.</p></article>`;

  $("tabela-recentes").innerHTML = list.slice(0, 8).map(rowHTML).join("") || `<tr><td colspan="5" class="empty">Nenhum lançamento para este filtro.</td></tr>`;

  drawWeekChart(list);
  drawPieChart({
    canvasId: "chart-mix",
    totalId: "mix-total",
    legendId: "mix-legend",
    items: list.filter((x) => x.tipo === "despesa"),
    emptyLabel: "Sem despesas no filtro"
  });
}

function rowHTML(tx) {
  return `<tr>
    <td>${parseISO(tx.data).toLocaleDateString("pt-BR")}</td>
    <td>${tx.desc}</td>
    <td>${tx.categoria}</td>
    <td><span class="tag ${tx.tipo}">${tx.tipo}</span></td>
    <td class="num ${tx.tipo === "receita" ? "gold" : "rose"}">${tx.tipo === "receita" ? "+" : "−"} ${money(tx.valor)}</td>
  </tr>`;
}

function drawWeekChart(list) {
  const canvas = $("chart-semana");
  const ctx = canvas.getContext("2d");
  const w = canvas.width = canvas.parentElement.clientWidth - 20;
  const h = canvas.height = 180;
  ctx.clearRect(0, 0, w, h);
  const days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
  const rec = days.map((d) => sum(list.filter((x) => x.tipo === "receita" && x.data === isoLocal(d))));
  const des = days.map((d) => sum(list.filter((x) => x.tipo === "despesa" && x.data === isoLocal(d))));
  const max = Math.max(1, ...rec, ...des);
  const gap = w / 7;
  days.forEach((d, i) => {
    const x = 30 + i * gap;
    const rh = (rec[i] / max) * 110;
    const dh = (des[i] / max) * 110;
    ctx.fillStyle = "#c9a227";
    roundRect(ctx, x, 130 - rh, 14, rh, 4);
    ctx.fillStyle = "#b85c38";
    roundRect(ctx, x + 18, 130 - dh, 14, dh, 4);
    ctx.fillStyle = "#8a6d55";
    ctx.font = "11px Outfit";
    ctx.fillText(d.toLocaleDateString("pt-BR", { weekday: "short" }), x, 155);
  });
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
}

function drawPieChart({ canvasId, totalId, legendId, items, emptyLabel, colors }) {
  const canvas = $(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const size = 220;
  canvas.width = size;
  canvas.height = size;
  ctx.clearRect(0, 0, size, size);
  const groups = {};
  items.forEach((x) => { groups[x.categoria] = (groups[x.categoria] || 0) + Number(x.valor); });
  const entries = Object.entries(groups).sort((a, b) => b[1] - a[1]);
  if (totalId && $(totalId)) $(totalId).textContent = String(items.length);
  const palette = colors || ["#c9a227", "#6b3d22", "#b85c38", "#d4af37", "#8b5a2b", "#e8c56a", "#4a2c18", "#a67c52", "#cf9f5a"];
  const total = entries.reduce((a, [, v]) => a + v, 0) || 1;
  let angle = -Math.PI / 2;
  const cx = 110, cy = 110, r = 78, ir = 52;
  if (!entries.length) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "#efe6d6";
    ctx.lineWidth = 26;
    ctx.stroke();
    if (legendId && $(legendId)) $(legendId).innerHTML = `<li class="muted">${emptyLabel || "Sem dados no filtro"}</li>`;
    return entries;
  }
  entries.forEach(([, val], i) => {
    const slice = (val / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, angle, angle + slice);
    ctx.arc(cx, cy, ir, angle + slice, angle, true);
    ctx.closePath();
    ctx.fillStyle = palette[i % palette.length];
    ctx.fill();
    angle += slice;
  });
  if (legendId && $(legendId)) {
    $(legendId).innerHTML = entries.map(([label, val], i) =>
      `<li><span><i class="dot" style="background:${palette[i % palette.length]}"></i>${label}</span><span>${money(val)}</span></li>`
    ).join("");
  }
  return entries;
}

function filteredTipo(tipo, prefix) {
  const cat = $(`${prefix}-categoria`).value;
  const periodo = $(`${prefix}-periodo`).value;
  const busca = ($(`${prefix}-busca`).value || "").trim().toLowerCase();
  const de = $(`${prefix}-de`).value;
  const ate = $(`${prefix}-ate`).value;
  return db.transacoes.filter((tx) => {
    if (tx.tipo !== tipo) return false;
    if (cat !== "todas" && tx.categoria !== cat) return false;
    if (!inPeriod(tx.data, periodo, de, ate)) return false;
    if (busca) {
      const blob = `${tx.desc} ${tx.categoria} ${tx.valor}`.toLowerCase();
      if (!blob.includes(busca)) return false;
    }
    return true;
  }).sort((a, b) => b.data.localeCompare(a.data));
}

function tipoRowHTML(tx) {
  return `<tr>
    <td>${parseISO(tx.data).toLocaleDateString("pt-BR")}</td>
    <td>${tx.desc}</td>
    <td>${tx.categoria}</td>
    <td><span class="tag ${tx.tipo}">${tx.tipo}</span></td>
    <td class="num ${tx.tipo === "receita" ? "gold" : "rose"}">${tx.tipo === "receita" ? "+" : "−"} ${money(tx.valor)}</td>
    <td class="row-actions">
      <button type="button" class="link" data-edit="${tx.id}">Editar</button>
      <button type="button" class="link link-danger" data-del="${tx.id}">Excluir</button>
    </td>
  </tr>`;
}

function renderTipoView(tipo) {
  const prefix = tipo === "receita" ? "rec" : "des";
  const list = filteredTipo(tipo, prefix);
  const total = sum(list);
  const groups = {};
  list.forEach((tx) => { groups[tx.categoria] = (groups[tx.categoria] || 0) + Number(tx.valor); });
  const ranked = Object.entries(groups).sort((a, b) => b[1] - a[1]);
  const top = ranked[0];
  const tone = tipo === "receita" ? "gold" : "rose";
  const label = tipo === "receita" ? "receita" : "despesa";

  $(`${prefix}-total`).textContent = money(total);
  $(`${prefix}-total-sub`).textContent = list.length
    ? `${list.length} ${list.length === 1 ? label : label + "s"} no filtro`
    : `Nenhuma ${label} no filtro`;
  $(`${prefix}-qtd`).textContent = String(list.length);
  $(`${prefix}-qtd-sub`).textContent = "No período selecionado";
  $(`${prefix}-top`).textContent = top ? top[0] : "—";
  $(`${prefix}-top-sub`).textContent = top ? money(top[1]) : "Sem dados ainda";
  $(`${prefix}-filtro-resumo`).textContent = `${list.length} ${list.length === 1 ? "resultado" : "resultados"} na consulta`;

  const known = cats(tipo);
  const catCards = known.map((nome) => {
    const valor = groups[nome] || 0;
    return `<div class="tipo-cat-row">
      <span>${nome}</span>
      <div class="tipo-cat-actions">
        <strong class="${tone}">${money(valor)}</strong>
        <button type="button" class="btn btn-chip btn-add-cat" data-add-tipo="${tipo}" data-add-cat="${nome}" title="Adicionar em ${nome}">+</button>
      </div>
    </div>`;
  }).join("");
  $(`${prefix}-cats`).innerHTML = catCards || `<p class="empty">Nenhuma categoria cadastrada.</p>`;

  drawPieChart({
    canvasId: `chart-${prefix}`,
    totalId: `${prefix}-mix-total`,
    legendId: `${prefix}-legend`,
    items: list,
    emptyLabel: tipo === "receita" ? "Sem receitas no filtro" : "Sem despesas no filtro",
    colors: tipo === "receita"
      ? ["#c9a227", "#d4af37", "#e8c56a", "#a67c52", "#6b3d22"]
      : ["#b85c38", "#6b3d22", "#8b5a2b", "#cf9f5a", "#4a2c18", "#a0522d", "#c9a227", "#d4af37", "#8a6d55"]
  });

  const tabela = $(`tabela-${prefix === "rec" ? "receitas" : "despesas"}`);
  tabela.innerHTML = list.map(tipoRowHTML).join("")
    || `<tr><td colspan="6" class="empty">Nenhum lançamento ainda. Use o botão acima para adicionar.</td></tr>`;
}

function drawMix(despesas) {
  drawPieChart({
    canvasId: "chart-mix",
    totalId: "mix-total",
    legendId: "mix-legend",
    items: despesas,
    emptyLabel: "Sem despesas no filtro"
  });
}

function renderTransacoes() {
  const tipo = $("tx-tipo").value;
  const cat = $("tx-categoria").value;
  const banco = $("tx-banco").value;
  const status = $("tx-status").value;
  const busca = $("tx-busca").value.trim().toLowerCase();
  const list = db.transacoes.filter((tx) => {
    if (tipo !== "todos" && tx.tipo !== tipo) return false;
    if (cat !== "todas" && tx.categoria !== cat) return false;
    if (banco !== "todos" && tx.banco !== banco) return false;
    if (status !== "todos" && tx.status !== status) return false;
    if (busca && !`${tx.desc} ${tx.categoria}`.toLowerCase().includes(busca)) return false;
    return true;
  }).sort((a, b) => b.data.localeCompare(a.data));

  $("tabela-transacoes").innerHTML = list.map((tx) => `<tr>
    <td>${parseISO(tx.data).toLocaleDateString("pt-BR")}</td>
    <td>${tx.desc}</td>
    <td>${tx.categoria}</td>
    <td>${bancoNome(tx.banco)}</td>
    <td><span class="tag ${tx.status === "pendente" ? "pendente" : tx.tipo}">${tx.status}</span></td>
    <td class="num ${tx.tipo === "receita" ? "gold" : "rose"}">${money(tx.valor)}</td>
    <td class="row-actions">
      <button class="link" data-edit="${tx.id}">Editar</button>
      <button class="link" data-del="${tx.id}">Excluir</button>
    </td>
  </tr>`).join("") || `<tr><td colspan="7" class="empty">Nenhuma transação encontrada.</td></tr>`;
}

function page(title, desc, body) {
  return `<div class="page-head"><h2>${title}</h2><p class="muted">${desc}</p></div>${body}`;
}

function renderBancos() {
  const cards = db.bancos.map((b) => {
    const mov = db.transacoes.filter((x) => x.banco === b.id && x.status === "pago");
    const saldo = b.saldoInicial + sum(mov, "receita") - sum(mov, "despesa");
    return `<article class="card"><h3>${b.nome}</h3><strong class="gold" style="font-size:28px;display:block;margin:12px 0">${money(saldo)}</strong><p class="muted">Saldo inicial ${money(b.saldoInicial)}</p></article>`;
  }).join("");
  $("view-bancos").innerHTML = page("Bancos", "Saldos ao vivo por conta.", `<div class="grid-cards">${cards}</div>`);
}

function renderMetas() {
  const mes = db.transacoes.filter((x) => inPeriod(x.data, "mes"));
  const rec = sum(mes, "receita");
  const des = sum(mes, "despesa");
  const cards = db.metas.map((m) => {
    const atual = m.tipo === "receita" ? rec : des;
    const pct = m.alvo ? Math.min(100, Math.round((atual / m.alvo) * 100)) : 0;
    return `<article class="card"><h3>${m.nome}</h3><p class="muted">${money(atual)} de ${money(m.alvo)}</p><div class="progress"><span style="width:${pct}%"></span></div></article>`;
  }).join("");
  $("view-metas").innerHTML = page("Metas", "Acompanhe os objetivos do mês.", `<div class="grid-cards">${cards}</div>`);
}

const SITUACOES = ["Presente", "Folga", "Falta", "Atestado", "Home office"];
const LOCAIS = ["Escritório", "Cliente externo", "Home office", "Folga"];

function ensureFunc(f) {
  if (!f.registros) f.registros = [];
  if (!f.telefone) f.telefone = "";
  if (!f.status) f.status = "ativo";
  return f;
}

function registrosOrdenados(f) {
  return [...(f.registros || [])].sort((a, b) => b.data.localeCompare(a.data));
}

function registroHoje(f) {
  return registrosOrdenados(f).find((r) => r.data === todayISO());
}

function openFuncModal(func) {
  $("modal-func").classList.remove("hidden");
  $("modal-func-title").textContent = func ? "Editar funcionário" : "Novo funcionário";
  $("ff-id").value = func?.id || "";
  $("ff-nome").value = func?.nome || "";
  $("ff-telefone").value = func?.telefone || "";
  $("ff-salario").value = func?.salario ?? "";
  $("ff-status").value = func?.status || "ativo";
  const cargos = cats("funcionario");
  $("ff-cargo").innerHTML = cargos.map((c) => `<option>${c}</option>`).join("") || `<option value="">Cadastre um cargo em Configurações</option>`;
  if (func?.cargo) $("ff-cargo").value = func.cargo;
}

function closeFuncModal() { $("modal-func").classList.add("hidden"); }

function renderFuncionarios() {
  db.funcionarios.forEach(ensureFunc);
  const filtro = $("filtro-cargo")?.value || "todos";
  const lista = db.funcionarios.filter((f) => filtro === "todos" || f.cargo === filtro);
  const cargoOpts = [`<option value="todos">Todos os cargos</option>`]
    .concat(cats("funcionario").map((c) => `<option value="${c}" ${filtro === c ? "selected" : ""}>${c}</option>`))
    .join("");

  const cards = lista.map((f) => {
    const regs = registrosOrdenados(f);
    const hoje = registroHoje(f);
    const faltas = regs.filter((r) => r.situacao === "Falta").length;
    const ultimos = regs.slice(0, 3);
    const situacaoOpts = SITUACOES.map((s) => `<option>${s}</option>`).join("");
    const localOpts = LOCAIS.map((s) => `<option>${s}</option>`).join("");
    const hist = ultimos.map((r) =>
      `<li>${parseISO(r.data).toLocaleDateString("pt-BR")} — ${r.situacao}${r.local ? ` · ${r.local}` : ""}</li>`
    ).join("") || `<li class="muted">Sem registros ainda</li>`;

    return `<article class="card func-card" data-func-id="${f.id}">
      <div class="func-top">
        <div>
          <h3>${f.nome}</h3>
          <p class="muted">${f.cargo || "Sem cargo"}</p>
        </div>
        <span class="tag ${f.status === "ativo" ? "receita" : "pendente"}">${f.status === "ativo" ? "Ativo" : "Inativo"}</span>
      </div>

      <div class="func-meta">
        <div>
          <span class="meta-label">Telefone</span>
          <strong>${f.telefone || "—"}</strong>
        </div>
        <div>
          <span class="meta-label">Salário / diária</span>
          <strong class="gold">${money(Number(f.salario) || 0)}</strong>
        </div>
      </div>

      <div class="func-hoje">
        <span class="meta-label">Hoje</span>
        <p><strong>${hoje?.situacao || "Sem registro"}</strong></p>
        <p class="muted">${regs.length} registro(s) · ${faltas} falta(s)</p>
      </div>

      <div class="func-hist-head">
        <span class="meta-label">Últimos 3 dias</span>
        <button type="button" class="link" data-func-hist="${f.id}">Ver histórico</button>
      </div>

      <div class="func-form">
        <label>Data
          <input type="date" class="ff-data" value="${todayISO()}" />
        </label>
        <label>Situação
          <select class="ff-situacao">${situacaoOpts}</select>
        </label>
        <label>Local do dia
          <select class="ff-local">${localOpts}</select>
        </label>
      </div>
      <button type="button" class="btn btn-gold btn-block" data-func-reg="${f.id}">Registrar dia</button>
      <ul class="func-log">${hist}</ul>
      <div class="func-actions">
        <button type="button" class="btn btn-ghost btn-sm" data-func-edit="${f.id}">Editar</button>
        <button type="button" class="btn btn-danger-text btn-sm" data-func-del="${f.id}">Excluir</button>
      </div>
    </article>`;
  }).join("");

  $("view-funcionarios").innerHTML = `
    <div class="page-head page-head-row">
      <div>
        <h2>Funcionários</h2>
        <p class="muted">Cadastre e acompanhe a equipe da Vitrina Contabilidade.</p>
      </div>
      <button type="button" class="btn btn-gold" id="btn-novo-func">Novo funcionário</button>
    </div>
    <div class="filters filters-func">
      <label>
        <span>Filtrar por cargo / função</span>
        <select id="filtro-cargo">${cargoOpts}</select>
      </label>
    </div>
    <div class="func-grid">${cards || `<article class="card"><p class="empty">Nenhum funcionário cadastrado. Clique em Novo funcionário.</p></article>`}</div>`;

  $("btn-novo-func").onclick = () => openFuncModal(null);
  $("filtro-cargo").onchange = () => renderFuncionarios();
}

function renderPonto() {
  const agora = new Date();
  const y = agora.getFullYear();
  const m = agora.getMonth();

  const cards = db.funcionarios.map((f) => {
    ensureFunc(f);
    const regsMes = (f.registros || []).filter((r) => {
      const d = parseISO(r.data);
      return d.getFullYear() === y && d.getMonth() === m;
    });
    const dias = regsMes.filter((r) => r.situacao === "Presente" || r.situacao === "Home office").length;
    const faltas = regsMes.filter((r) => r.situacao === "Falta").length;
    const hoje = registroHoje(f);
    const inicial = (f.nome || "?").trim().charAt(0).toUpperCase();
    return `<article class="card ponto-card">
      <div class="ponto-avatar">${inicial}</div>
      <h3 class="ponto-nome">${f.nome}</h3>
      <p class="muted ponto-cargo">${f.cargo || "Sem cargo"}</p>
      <p class="ponto-stats">${dias} dia(s) · ${faltas} falta(s)</p>
      <span class="tag ponto-hoje-tag">${hoje ? `Hoje: ${hoje.situacao}` : "Hoje: —"}</span>
      <button type="button" class="btn btn-gold btn-block" data-presenca="${f.id}">Presença</button>
    </article>`;
  }).join("");

  $("view-ponto").innerHTML = `
    <div class="page-head">
      <h2>Ponto</h2>
      <p class="muted">Funcionários lado a lado — abra a presença de cada um no calendário do mês</p>
    </div>
    <div class="ponto-rail">
      ${cards || `<article class="card"><p class="empty">Nenhum funcionário cadastrado. Cadastre na aba Funcionários.</p></article>`}
    </div>`;
}

let pontoCal = { funcId: null, year: new Date().getFullYear(), month: new Date().getMonth() };

function situacaoClass(sit) {
  if (sit === "Presente" || sit === "Home office") return "presente";
  if (sit === "Falta") return "falta";
  if (sit === "Folga") return "folga";
  if (sit) return "outro";
  return "";
}

function nextSituacao(atual) {
  const cycle = [null, "Presente", "Folga", "Falta"];
  const i = cycle.indexOf(atual || null);
  return cycle[(i + 1) % cycle.length];
}

function openPresencaCal(funcId) {
  const f = db.funcionarios.find((x) => x.id === funcId);
  if (!f) return;
  ensureFunc(f);
  const now = new Date();
  pontoCal = { funcId, year: now.getFullYear(), month: now.getMonth() };
  $("ponto-cal-title").textContent = f.nome;
  $("ponto-cal-sub").textContent = `${f.cargo || "Sem cargo"} · marque presenças e faltas`;
  renderPresencaCal();
  $("modal-ponto").classList.remove("hidden");
}

function closePresencaCal() {
  $("modal-ponto").classList.add("hidden");
}

function renderPresencaCal() {
  const f = db.funcionarios.find((x) => x.id === pontoCal.funcId);
  if (!f) return;
  ensureFunc(f);
  const { year, month } = pontoCal;
  const mesNome = new Date(year, month, 1).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  $("ponto-cal-mes").textContent = mesNome.charAt(0).toUpperCase() + mesNome.slice(1);

  const first = new Date(year, month, 1);
  const startPad = (first.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const byDate = Object.fromEntries((f.registros || []).map((r) => [r.data, r]));
  const hoje = todayISO();

  const weekdays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
    .map((d) => `<span class="ponto-cal-dow">${d}</span>`).join("");

  let cells = "";
  for (let i = 0; i < startPad; i++) cells += `<span class="ponto-cal-day empty"></span>`;
  for (let day = 1; day <= daysInMonth; day++) {
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const reg = byDate[iso];
    const cls = situacaoClass(reg?.situacao);
    const isToday = iso === hoje ? " is-today" : "";
    cells += `<button type="button" class="ponto-cal-day ${cls}${isToday}" data-ponto-day="${iso}" title="${reg?.situacao || "Sem registro"}">
      <span class="ponto-cal-num">${day}</span>
      ${reg ? `<span class="ponto-cal-sit">${reg.situacao.slice(0, 1)}</span>` : ""}
    </button>`;
  }

  $("ponto-cal-grid").innerHTML = `${weekdays}${cells}`;
}

function togglePontoDay(iso) {
  const f = db.funcionarios.find((x) => x.id === pontoCal.funcId);
  if (!f) return;
  ensureFunc(f);
  const idx = f.registros.findIndex((r) => r.data === iso);
  const atual = idx >= 0 ? f.registros[idx].situacao : null;
  const prox = nextSituacao(atual);
  if (!prox) {
    if (idx >= 0) f.registros.splice(idx, 1);
  } else {
    const local = prox === "Folga" ? "Folga" : prox === "Home office" ? "Home office" : "Escritório";
    const reg = { data: iso, situacao: prox, local };
    if (idx >= 0) f.registros[idx] = reg;
    else f.registros.push(reg);
  }
  save();
  renderPresencaCal();
  renderPonto();
  badges();
}

function renderRelatorios() {
  const list = filtered({ periodo: "mes" });
  const body = `<div class="kpis">
    <article class="card kpi"><div class="kpi-head">Receitas</div><strong class="gold">${money(sum(list, "receita"))}</strong></article>
    <article class="card kpi"><div class="kpi-head">Despesas</div><strong class="rose">${money(sum(list, "despesa"))}</strong></article>
    <article class="card kpi"><div class="kpi-head">Resultado</div><strong class="gold">${money(sum(list, "receita") - sum(list, "despesa"))}</strong></article>
    <article class="card kpi"><div class="kpi-head">Pendentes</div><strong>${money(sum(db.transacoes.filter((x) => x.status === "pendente")))}</strong></article>
  </div>
  <article class="card"><p class="muted">O relatório usa o mesmo filtro do painel (tipo, categoria, período e consulta).</p></article>`;
  $("view-relatorios").innerHTML = page("Relatórios", "Consolidado do período filtrado.", body);
}

function renderCategorias() {
  const body = `<div class="grid-cards">
    <article class="card"><h3 class="gold">Receitas</h3>${cats("receita").map((c) => `<p class="muted" style="margin-top:8px">${c}</p>`).join("") || `<p class="empty">Nenhuma categoria</p>`}</article>
    <article class="card"><h3 class="rose">Despesas</h3>${cats("despesa").map((c) => `<p class="muted" style="margin-top:8px">${c}</p>`).join("") || `<p class="empty">Nenhuma categoria</p>`}</article>
    <article class="card"><h3>Funcionários</h3>${cats("funcionario").map((c) => `<p class="muted" style="margin-top:8px">${c}</p>`).join("") || `<p class="empty">Nenhuma categoria</p>`}</article>
  </div>
  <article class="card" style="margin-top:14px"><p class="muted">Para adicionar ou excluir categorias, use o menu Configurações.</p></article>`;
  $("view-categorias").innerHTML = page("Categorias", "Plano de contas do escritório.", body);
}

function renderInsights() {
  const mes = db.transacoes.filter((x) => inPeriod(x.data, "mes"));
  const rec = sum(mes, "receita");
  const des = sum(mes, "despesa");
  const maior = [...mes].filter((x) => x.tipo === "despesa").sort((a, b) => b.valor - a.valor)[0];
  const items = !mes.length
    ? ["Sem lançamentos ainda. Os valores aparecem aqui conforme você registrar receitas e despesas."]
    : [
      rec >= des ? "O caixa do mês está positivo. Bom momento para reforçar reserva." : "As saídas superaram as entradas. Revise honorários e despesas fixas.",
      maior ? `Maior despesa: ${maior.desc} (${money(maior.valor)}).` : "Ainda não há despesas no mês.",
      `${db.transacoes.filter((x) => x.status === "pendente").length} lançamento(s) pendente(s) para conciliar.`
    ];
  $("view-insights").innerHTML = page("Insights", "Leitura automática do mês + atalho para o Assistente IA.", `
    <div class="grid-cards">${items.map((t) => `<article class="card"><p>${t}</p></article>`).join("")}</div>
    <article class="card" style="margin-top:14px">
      <h3>Quer uma análise mais profunda?</h3>
      <p class="muted" style="margin:8px 0 14px">O Assistente IA lê seus lançamentos e sugere ações práticas.</p>
      <button type="button" class="btn btn-gold" id="btn-insights-ia">Abrir Assistente IA</button>
    </article>`);
  $("btn-insights-ia").onclick = () => showView("assistente");
}

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clearAiChat() {
  if ((window.VitrinaAI?.loadChat?.() || []).length && !confirm("Limpar todo o histórico do chat da IA?")) return;
  window.VitrinaAI?.clearChat?.();
  renderAssistente();
  toast("Chat da IA limpo");
}

function renderAssistente() {
  const ready = window.VitrinaAI?.hasKey?.() || false;
  const chat = window.VitrinaAI?.loadChat?.() || [];
  $("view-assistente").innerHTML = `
    <div class="page-head page-head-row">
      <div>
        <h2>Assistente IA</h2>
        <p class="muted">Análises, alertas e automação com base nos lançamentos do escritório.</p>
      </div>
      <button type="button" class="btn btn-ghost" id="ai-clear-top" ${chat.length ? "" : "disabled"}>Limpar chat</button>
    </div>
    <div class="ai-layout">
      <article class="card ai-chat-card">
        <div class="ai-chat-toolbar">
          <strong>Conversa</strong>
          <button type="button" class="btn btn-ghost btn-sm" id="ai-clear" ${chat.length ? "" : "disabled"}>Limpar chat</button>
        </div>
        <div class="ai-chat-log" id="ai-chat-log">
          ${chat.length ? chat.map((m) => `<div class="ai-bubble ${m.role}">${escapeHtml(m.text)}</div>`).join("")
            : `<div class="ai-bubble assistant">Olá, ${escapeHtml(db.usuario || "Carlos")}. Posso analisar o mês, apontar riscos e ajudar a organizar o extrato. Faça uma pergunta ou use os atalhos ao lado.</div>`}
        </div>
        <div class="ai-compose">
          <textarea id="ai-input" placeholder="Ex.: Quais despesas mais subiram este mês? O que posso cortar sem afetar a operação?"></textarea>
          <button type="button" class="btn btn-gold" id="ai-send">Enviar</button>
        </div>
        <p class="ai-status ${ready ? "ok" : "warn"}" id="ai-status">
          ${ready ? "IA pronta (chave configurada neste navegador)." : "Configure a chave Gemini em Configurações para ativar a IA."}
        </p>
      </article>
      <aside class="ai-quick">
        <article class="card">
          <h3>Atalhos</h3>
          <p class="muted" style="margin:8px 0 12px">Análises rápidas com os dados atuais.</p>
          <button type="button" class="btn btn-ghost" data-ai-prompt="analise-mes">Analisar o mês</button>
          <button type="button" class="btn btn-ghost" data-ai-prompt="pendentes">Revisar pendências</button>
          <button type="button" class="btn btn-ghost" data-ai-prompt="cortes">Onde posso cortar gastos?</button>
          <button type="button" class="btn btn-ghost" data-ai-prompt="receitas">Como melhorar as receitas?</button>
        </article>
        <article class="card">
          <h3>Automação</h3>
          <p class="muted" style="margin:8px 0 12px">No Extrato, envie o arquivo: a IA classifica e importa sozinha.</p>
          <button type="button" class="btn btn-brown" id="ai-open-extrato">Abrir importação de extrato</button>
          <button type="button" class="btn btn-ghost" id="ai-open-config">Configurar chave da IA</button>
        </article>
      </aside>
    </div>`;

  const log = $("ai-chat-log");
  log.scrollTop = log.scrollHeight;

  const prompts = {
    "analise-mes": "Faça uma análise completa do mês atual com riscos e ações.",
    pendentes: "Liste os lançamentos pendentes e diga o que priorizar para conciliar.",
    cortes: "Com base nas despesas, onde posso cortar gastos sem prejudicar a operação?",
    receitas: "Sugira formas práticas de melhorar as receitas do escritório com base no histórico."
  };

  async function sendAi(text) {
    const prompt = String(text || "").trim();
    if (!prompt) return;
    if (!window.VitrinaAI) return toast("Módulo de IA não carregou");
    if ($("ai-send")?.disabled) return;

    const history = window.VitrinaAI.loadChat();
    history.push({ role: "user", text: prompt });
    window.VitrinaAI.saveChat(history);

    const log = $("ai-chat-log");
    if (log) {
      // remove placeholder inicial se existir só uma bolha de boas-vindas sem histórico prévio
      log.insertAdjacentHTML("beforeend", `<div class="ai-bubble user">${escapeHtml(prompt)}</div>`);
      log.insertAdjacentHTML("beforeend", `<div class="ai-bubble assistant" id="ai-typing">Respondendo…</div>`);
      log.scrollTop = log.scrollHeight;
    }
    $("ai-input").value = "";
    $("ai-send").disabled = true;
    document.querySelectorAll("[data-ai-prompt]").forEach((b) => { b.disabled = true; });
    const status = $("ai-status");
    if (status) {
      status.className = "ai-status";
      status.textContent = "Consultando Gemini…";
    }

    try {
      const answer = prompt === prompts["analise-mes"]
        ? await window.VitrinaAI.analyzeMonth(db)
        : await window.VitrinaAI.ask({ prompt, db, mode: "chat" });
      const next = window.VitrinaAI.loadChat();
      next.push({ role: "assistant", text: answer });
      window.VitrinaAI.saveChat(next);
      const typing = $("ai-typing");
      if (typing) typing.outerHTML = `<div class="ai-bubble assistant">${escapeHtml(answer)}</div>`;
      if (status) {
        status.className = "ai-status ok";
        status.textContent = "Resposta pronta.";
      }
      if (log) log.scrollTop = log.scrollHeight;
    } catch (err) {
      console.error(err);
      const msg = err?.message || "Falha ao consultar a IA";
      toast(msg);
      const typing = $("ai-typing");
      if (typing) typing.outerHTML = `<div class="ai-bubble assistant">⚠️ ${escapeHtml(msg)}</div>`;
      // remove última msg do usuário do histórico se falhou sem resposta útil? keep it for context
      if (status) {
        status.className = "ai-status warn";
        status.textContent = msg;
      }
    } finally {
      $("ai-send").disabled = false;
      document.querySelectorAll("[data-ai-prompt]").forEach((b) => { b.disabled = false; });
      $("ai-clear") && ($("ai-clear").disabled = !(window.VitrinaAI.loadChat() || []).length);
      $("ai-clear-top") && ($("ai-clear-top").disabled = !(window.VitrinaAI.loadChat() || []).length);
    }
  }

  $("ai-send").onclick = () => sendAi($("ai-input").value);
  $("ai-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendAi($("ai-input").value);
    }
  });
  document.querySelectorAll("[data-ai-prompt]").forEach((btn) => {
    btn.onclick = () => sendAi(prompts[btn.dataset.aiPrompt]);
  });
  $("ai-clear").onclick = clearAiChat;
  $("ai-clear-top").onclick = clearAiChat;
  $("ai-open-extrato").onclick = () => openExtratoModal();
  $("ai-open-config").onclick = () => showView("configuracoes");
}

function renderOrcamentos() {
  const mes = db.transacoes.filter((x) => inPeriod(x.data, "mes") && x.tipo === "despesa");
  const cards = db.orcamentos.map((o) => {
    const usado = sum(mes.filter((x) => x.categoria === o.categoria));
    const pct = o.limite ? Math.min(100, Math.round((usado / o.limite) * 100)) : 0;
    return `<article class="card"><h3>${o.categoria}</h3><p class="muted">${money(usado)} de ${money(o.limite)}</p><div class="progress"><span style="width:${pct}%"></span></div></article>`;
  }).join("");
  $("view-orcamentos").innerHTML = page("Orçamentos", "Teto de gastos por categoria no mês.", `<div class="grid-cards">${cards}</div>`);
}

function renderRecorrentes() {
  const rows = db.recorrentes.map((r) => `<tr><td>Dia ${r.dia}</td><td>${r.desc}</td><td>${r.categoria}</td><td class="num ${r.tipo === "receita" ? "gold" : "rose"}">${money(r.valor)}</td></tr>`).join("")
    || `<tr><td colspan="4" class="empty">Nenhum lançamento recorrente.</td></tr>`;
  $("view-recorrentes").innerHTML = page("Recorrentes", "Lançamentos que se repetem todo mês.", `<article class="card table-card"><table><thead><tr><th>Dia</th><th>Descrição</th><th>Categoria</th><th class="num">Valor</th></tr></thead><tbody>${rows}</tbody></table></article>`);
}

function catBlock(tipo, titulo, desc, placeholder, dotClass) {
  const list = cats(tipo);
  const items = list.map((c, i) => `
    <li class="cat-item">
      <span><i class="dot ${dotClass}"></i>${c}</span>
      <button type="button" class="cat-del" data-cat-tipo="${tipo}" data-cat-idx="${i}" aria-label="Excluir">×</button>
    </li>`).join("") || `<li class="empty">Nenhuma categoria cadastrada.</li>`;
  return `
    <article class="card cat-panel">
      <h3>${titulo}</h3>
      <p class="muted">${desc}</p>
      <div class="cat-add">
        <input id="cfg-cat-${tipo}" type="text" maxlength="40" placeholder="${placeholder}" />
        <button type="button" class="btn btn-gold" data-cat-add="${tipo}">Adicionar</button>
      </div>
      <ul class="cat-list">${items}</ul>
    </article>`;
}

function renderConfig() {
  const moeda = db.moeda || "BRL";
  const ai = window.VitrinaAI?.loadSettings?.() || {};
  $("view-configuracoes").innerHTML = page("Configurações", "Conta, acesso, IA e categorias do sistema.", `
    <div class="config-layout">
      <article class="card config-form">
        <label>Nome de exibição
          <input id="cfg-nome" value="${db.usuario || ""}" />
        </label>
        <label>Usuário de acesso
          <input id="cfg-acesso" value="${db.acessoUsuario || db.usuario || ""}" />
        </label>
        <label>Senha de acesso
          <input id="cfg-senha" type="password" value="${db.senha || ""}" placeholder="••••••••" autocomplete="new-password" />
        </label>
        <label>Moeda
          <select id="cfg-moeda">
            <option value="BRL" ${moeda === "BRL" ? "selected" : ""}>Real (BRL)</option>
            <option value="USD" ${moeda === "USD" ? "selected" : ""}>Dólar (USD)</option>
            <option value="EUR" ${moeda === "EUR" ? "selected" : ""}>Euro (EUR)</option>
          </select>
        </label>
        <div class="config-actions">
          <button type="button" class="btn btn-gold" id="cfg-save">Salvar</button>
          <button type="button" class="btn btn-ghost" id="cfg-cloud">Salvar na nuvem</button>
          <button type="button" class="btn btn-ghost" id="cfg-sair">Sair</button>
          <button type="button" class="btn btn-danger-text" id="cfg-reset">Zerar todos os lançamentos</button>
        </div>
        <p class="muted config-status" id="cfg-cloud-status">${cloudStatusText()}</p>
      </article>

      <article class="card config-form">
        <h3>Assistente IA (Gemini)</h3>
        <p class="muted" style="margin:6px 0 12px">A chave fica só neste navegador (não vai para o Supabase). Crie grátis em Google AI Studio.</p>
        <label>Gemini API Key
          <input id="cfg-ai-key" type="password" value="${ai.apiKey ? "••••••••••••••••" : ""}" placeholder="Cole sua API key aqui" autocomplete="off" />
        </label>
        <label>Modelo
          <select id="cfg-ai-model">
            <option value="gemini-3.8-flash" ${!ai.model || ai.model === "gemini-3.8-flash" || ai.model === "gemini-2.0-flash" ? "selected" : ""}>gemini-3.8-flash (recomendado)</option>
            <option value="gemini-1.5-flash" ${ai.model === "gemini-1.5-flash" ? "selected" : ""}>gemini-1.5-flash</option>
            <option value="gemini-1.5-pro" ${ai.model === "gemini-1.5-pro" ? "selected" : ""}>gemini-1.5-pro</option>
          </select>
        </label>
        <div class="config-actions">
          <button type="button" class="btn btn-gold" id="cfg-ai-save">Salvar IA</button>
          <button type="button" class="btn btn-ghost" id="cfg-ai-clear">Remover chave</button>
          <a class="btn btn-ghost" href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Obter chave grátis</a>
        </div>
        <p class="muted config-status">${window.VitrinaAI?.hasKey?.() ? "IA ativa neste navegador" : "IA desativada — falta a API key"}</p>
      </article>

      <div class="config-cats">
        ${catBlock("receita", "Categorias de receita", "Adicione ou remova categorias usadas nos lançamentos de entrada.", "Ex.: Honorários mensais", "dot-gold")}
        ${catBlock("despesa", "Categorias de despesa", "Adicione ou remova categorias usadas nos lançamentos de saída.", "Ex.: Material de escritório", "dot-blue")}
        ${catBlock("funcionario", "Categorias de funcionário", "Adicione ou remova cargos usados no cadastro da equipe.", "Ex.: Contador", "dot-brown")}
      </div>
    </div>`);

  $("cfg-save").onclick = () => {
    const novaSenha = $("cfg-senha").value;
    if (!novaSenha) return toast("Defina uma senha de acesso");
    db.usuario = $("cfg-nome").value.trim() || "Carlos";
    db.acessoUsuario = $("cfg-acesso").value.trim() || db.usuario;
    db.senha = novaSenha;
    db.moeda = $("cfg-moeda").value;
    save(); greeting(); toast("Configurações salvas");
  };
  $("cfg-ai-save").onclick = () => {
    if (!window.VitrinaAI) return toast("Módulo de IA não carregou");
    const typed = $("cfg-ai-key").value.trim();
    const model = $("cfg-ai-model").value;
    const current = window.VitrinaAI.getApiKey();
    const apiKey = (!typed || typed.includes("••")) ? current : typed;
    if (!apiKey) return toast("Cole a Gemini API Key");
    window.VitrinaAI.saveSettings({ apiKey, provider: "gemini", model });
    renderConfig();
    toast("Assistente IA configurado");
  };
  $("cfg-ai-clear").onclick = () => {
    window.VitrinaAI?.saveSettings?.({ apiKey: "", provider: "gemini", model: "gemini-3.8-flash" });
    renderConfig();
    toast("Chave da IA removida deste navegador");
  };
  $("cfg-cloud").onclick = async () => {
    const btn = $("cfg-cloud");
    btn.disabled = true;
    btn.textContent = "Salvando…";
    const ok = await saveCloud(true);
    btn.disabled = false;
    btn.textContent = "Salvar na nuvem";
    const status = $("cfg-cloud-status");
    if (status) status.textContent = cloudStatusText();
    toast(ok ? "Dados salvos na nuvem (Supabase)" : `Falha na nuvem: ${lastCloudError || "erro desconhecido"}`);
  };
  $("cfg-sair").onclick = () => logout();
  $("cfg-reset").onclick = async () => {
    if (!confirm("Zerar todos os lançamentos, funcionários e saldos?")) return;
    db = structuredClone(SEED);
    db.usuario = "Carlos";
    db.acessoUsuario = "Carlos";
    db.senha = "Carlos27";
    db.authCredVersion = 2;
    save();
    await saveCloud(true);
    populateFilters(); refresh(); toast("Todos os lançamentos foram zerados");
  };

  document.querySelectorAll("[data-cat-add]").forEach((btn) => {
    btn.onclick = () => {
      const tipo = btn.dataset.catAdd;
      const input = $(`cfg-cat-${tipo}`);
      const nome = input.value.trim();
      if (!nome) return toast("Digite o nome da categoria");
      if (cats(tipo).some((c) => c.toLowerCase() === nome.toLowerCase())) return toast("Essa categoria já existe");
      cats(tipo).push(nome);
      save(); populateFilters(); renderConfig(); toast("Categoria adicionada");
    };
  });

  document.querySelectorAll("[data-cat-idx]").forEach((btn) => {
    btn.onclick = () => {
      const tipo = btn.dataset.catTipo;
      const idx = Number(btn.dataset.catIdx);
      const nome = cats(tipo)[idx];
      if (!confirm(`Excluir a categoria "${nome}"?`)) return;
      cats(tipo).splice(idx, 1);
      save(); populateFilters(); renderConfig(); toast("Categoria excluída");
    };
  });
}

function badges() {
  $("badge-transacoes").textContent = db.transacoes.length;
  $("badge-funcionarios").textContent = db.funcionarios.length;
  $("badge-ponto").textContent = db.funcionarios.filter((f) => !registroHoje(ensureFunc(f))).length;
  $("badge-insights").textContent = db.transacoes.filter((x) => x.status === "pendente").length;
}

function showView(name) {
  view = name;
  document.querySelectorAll(".view").forEach((el) => el.classList.toggle("hidden", el.id !== `view-${name}`));
  document.querySelectorAll(".nav-item").forEach((el) => el.classList.toggle("active", el.dataset.view === name));
  closeMenu();
  refresh();
}

function openMenu() {
  document.body.classList.add("menu-open");
  const btn = $("btn-menu");
  if (btn) btn.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  const btn = $("btn-menu");
  if (btn) btn.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  if (document.body.classList.contains("menu-open")) closeMenu();
  else openMenu();
}

function refresh() {
  badges();
  if (view === "painel") renderPainel();
  if (view === "receitas") renderTipoView("receita");
  if (view === "despesas") renderTipoView("despesa");
  if (view === "transacoes") renderTransacoes();
  if (view === "bancos") renderBancos();
  if (view === "metas") renderMetas();
  if (view === "funcionarios") renderFuncionarios();
  if (view === "ponto") renderPonto();
  if (view === "relatorios") renderRelatorios();
  if (view === "categorias") renderCategorias();
  if (view === "insights") renderInsights();
  if (view === "assistente") renderAssistente();
  if (view === "orcamentos") renderOrcamentos();
  if (view === "recorrentes") renderRecorrentes();
  if (view === "configuracoes") renderConfig();
}

let extratoRows = [];

function parseMoneyBR(raw) {
  if (raw == null) return null;
  let s = String(raw).trim();
  if (!s) return null;
  s = s.replace(/\s/g, "").replace(/R\$/gi, "");
  const neg = /^\(.*\)$/.test(s) || s.includes("-") || /D$/i.test(s) || /DB$/i.test(s);
  s = s.replace(/[()]/g, "").replace(/^[+-]/, "").replace(/(CR|DB|C|D)$/i, "");
  if (!s) return null;
  if (s.includes(",") && s.includes(".")) s = s.replace(/\./g, "").replace(",", ".");
  else if (s.includes(",")) s = s.replace(",", ".");
  const n = Number(s);
  if (!Number.isFinite(n) || n === 0) return null;
  return neg ? -Math.abs(n) : n;
}

function parseDateBR(raw) {
  if (!raw) return null;
  const s = String(raw).trim();
  let m = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
  if (!m) {
    m = s.match(/^(\d{1,2})[\/\-.](\d{1,2})$/);
    if (!m) return null;
    const now = new Date();
    m = [m[0], m[1], m[2], String(now.getFullYear())];
  }
  let d = Number(m[1]);
  let mo = Number(m[2]);
  let y = Number(m[3]);
  if (y < 100) y += 2000;
  if (d < 1 || d > 31 || mo < 1 || mo > 12) return null;
  return `${y}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function lineHasMoney(line) {
  return /([+-]?\s*R\$\s*)?-?\(?\d{1,3}(?:\.\d{3})*,\d{2}\)?/.test(line)
    || /-?\d+[.,]\d{2}\b/.test(line);
}

function lineHasDate(line) {
  return /\d{1,2}[\/\-.]\d{1,2}(?:[\/\-.]\d{2,4})?/.test(line);
}

function guessCategoria(desc, tipo) {
  const t = String(desc || "").toLowerCase();
  const regras = tipo === "receita"
    ? [
      [/honor|cliente|servi[cç]o|recibo|pix\s*receb|ted\s*receb|dep[oó]sito|transfer[eê]ncia\s*receb/, "Honorários Fixos Mensais"],
      [/imposto\s*de\s*renda|irrf/, "Imposto de Renda"],
      [/certificado/, "Certificado Digital"],
      [/legaliza/, "Legalização de Empresas"]
    ]
    : [
      [/folha|sal[aá]rio|priscila|jeniffer|emily|maria\s*rita|carlos\s*augusto|patr[ií]cia|carlinhos|rescis|f[eé]rias|13[oº°]/, "Folha de pagamento"],
      [/agua|águas|aguas/, "Água"],
      [/enel|luz|energia|cemig|light/, "Luz"],
      [/iptu/, "IPTU"],
      [/alterdata|bruno|inform[aá]tica|software|host|nuvem|microsoft|google/, "Despesas com informática"],
      [/papelaria|material/, "Materiais de papelaria"],
      [/manuten/, "Despesas com manutenção"],
      [/crc|oab|conselho/, "Conselho de classe"],
      [/das|fgts|inss|previd|iss|imposto/, "Outros"]
    ];
  for (const [re, cat] of regras) {
    if (re.test(t) && cats(tipo).includes(cat)) return cat;
  }
  return cats(tipo)[0] || "Outros";
}

const DESC_MAX = 180;

function splitExtratoLine(line) {
  if (line.includes(";") || line.includes("\t")) {
    return line.split(/[;\t]/).map((x) => x.trim()).filter((x, i, arr) => x || arr.length <= 3);
  }
  if ((line.match(/,/g) || []).length >= 2 && /\d{1,2}[\/\-.]\d{1,2}/.test(line)) {
    return line.split(",").map((x) => x.trim());
  }
  return null;
}

function formatCnpj(digits) {
  const d = String(digits).replace(/\D/g, "");
  if (d.length !== 14) return digits;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

function formatCpf(digits) {
  const d = String(digits).replace(/\D/g, "");
  if (d.length !== 11) return digits;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

function onlyDigits(s) {
  return String(s || "").replace(/\D/g, "");
}

function extractDocsFromText(text) {
  const s = String(text || "");
  const docs = [];
  const seen = new Set();
  const pushDoc = (fmt) => {
    const key = onlyDigits(fmt);
    if ((key.length === 11 || key.length === 14) && !seen.has(key)) {
      seen.add(key);
      docs.push(key.length === 14 ? formatCnpj(key) : formatCpf(key));
    }
  };
  for (const m of s.matchAll(/\b(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})\b/g)) pushDoc(m[1]);
  for (const m of s.matchAll(/\b(\d{3}\.?\d{3}\.?\d{3}-?\d{2})\b/g)) pushDoc(m[1]);
  for (const m of s.matchAll(/\b(\d{14})\b/g)) pushDoc(m[1]);
  for (const m of s.matchAll(/\b(\d{11})\b/g)) pushDoc(m[1]);
  return docs;
}

function buildDocDescIndex() {
  const map = new Map();
  (db.transacoes || []).forEach((tx) => {
    const docs = extractDocsFromText(tx.desc || "");
    docs.forEach((doc) => {
      const key = onlyDigits(doc);
      if (!key) return;
      const list = map.get(key) || [];
      list.push(tx);
      map.set(key, list);
    });
  });
  return map;
}

function lookupKnownByDocs(docs, tipo) {
  if (!docs?.length) return null;
  const map = buildDocDescIndex();
  for (const doc of docs) {
    const list = map.get(onlyDigits(doc)) || [];
    if (!list.length) continue;
    const sameTipo = tipo ? list.filter((t) => t.tipo === tipo) : list;
    const pool = sameTipo.length ? sameTipo : list;
    pool.sort((a, b) => String(b.data || "").localeCompare(String(a.data || "")));
    const hit = pool[0];
    if (hit?.desc) {
      return {
        desc: hit.desc,
        categoria: hit.categoria,
        tipo: hit.tipo
      };
    }
  }
  return null;
}

function extractCounterpartyName(text, docs = []) {
  let s = String(text || "").replace(/\s+/g, " ").trim();
  docs.forEach((doc) => {
    s = s.replace(doc, " ");
    s = s.replace(doc.replace(/\D/g, ""), " ");
  });
  s = s
    .replace(/\b\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4}\b/g, " ")
    .replace(/([+-]?\s*R\$\s*)?-?\(?\d{1,3}(?:\.\d{3})*,\d{2}\)?|-?\d+[.,]\d{2}/gi, " ")
    .replace(/\b(pix|ted|doc|tef|pagto|pagamento|recebido|recebimento|enviado|transfer[eê]ncia|dep[oó]sito|compra|d[eé]bito|cr[eé]dito|sa[ií]da|entrada|banco|ag[eê]ncia|conta|corrente|poupan[cç]a|nubank|c6|itau|itaú|bradesco|santander|sicoob|caixa)\b/gi, " ")
    .replace(/\b(cnpj|cpf|de|da|do|dos|das|para|pra|em|no|na|q\/r|qr)\b/gi, " ")
    .replace(/[|:]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const named = s.match(/\b([A-ZÀ-Ú][A-ZÀ-Ú0-9 .,&/\-]{4,90})\b/);
  if (named) return named[1].replace(/\s+/g, " ").trim();

  const mixed = s.match(/\b([A-Za-zÀ-ú][A-Za-zÀ-ú0-9 .,&/\-]{4,90})\b/);
  if (mixed) return mixed[1].replace(/\s+/g, " ").trim();
  return "";
}

function formatExtratoDesc(rawDesc, rawLine = "", tipo = null) {
  const blob = `${rawDesc || ""} ${rawLine || ""}`.replace(/\s+/g, " ").trim();
  const docs = extractDocsFromText(blob);
  const known = lookupKnownByDocs(docs, tipo);
  if (known?.desc) {
    let desc = known.desc;
    if (desc.length > DESC_MAX) desc = `${desc.slice(0, DESC_MAX - 1).trim()}…`;
    return { desc, categoria: known.categoria || null, fromKnown: true, docs };
  }

  const nome = extractCounterpartyName(blob, docs);
  let operacao = String(rawDesc || "").replace(/\s+/g, " ").trim();
  docs.forEach((doc) => { operacao = operacao.replace(doc, " "); });
  if (nome) {
    const reNome = new RegExp(nome.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    operacao = operacao.replace(reNome, " ");
  }
  operacao = operacao
    .replace(/\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/g, " ")
    .replace(/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g, " ")
    .replace(/\b\d{11,14}\b/g, " ")
    .replace(/^[\s\-–—|:·]+|[\s\-–—|:·]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const parts = [];
  if (nome) parts.push(nome);
  docs.forEach((d) => parts.push(d));
  if (operacao && (!nome || !operacao.toLowerCase().includes(nome.toLowerCase().slice(0, Math.min(8, nome.length))))) {
    parts.push(operacao);
  }

  let desc = parts.filter(Boolean).join(" · ").replace(/\s+/g, " ").trim();
  if (!desc) desc = String(rawDesc || "Lançamento do extrato").replace(/\s+/g, " ").trim();
  if (desc.length > DESC_MAX) desc = `${desc.slice(0, DESC_MAX - 1).trim()}…`;
  return { desc, categoria: null, fromKnown: false, docs };
}

function isCounterpartyContinuation(line) {
  const s = String(line || "").trim();
  if (!s) return false;
  if (/^(data|vencimento|histórico|historico|descri|valor|saldo|subtotal|total|extrato|ag[eê]ncia|conta)/i.test(s)) return false;
  if (lineHasDate(s) && lineHasMoney(s)) return false;
  if (/^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/.test(s)) return true;
  if (/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(s)) return true;
  if (/^\d{11,14}$/.test(s)) return true;
  if (extractDocsFromText(s).length && !lineHasMoney(s)) return true;
  if (/^[A-Za-zÀ-ú0-9 .,&/\-]{3,120}$/.test(s) && !lineHasMoney(s) && !lineHasDate(s)) return true;
  return false;
}

function preprocessExtratoLines(text) {
  const lines = String(text || "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const merged = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let guard = 0;
    while (i + 1 < lines.length && guard < 5) {
      const next = lines[i + 1];
      const incomplete = lineHasDate(line) && !lineHasMoney(line);
      const nextContinues = isCounterpartyContinuation(next)
        || (incomplete && lineHasMoney(next) && !lineHasDate(next))
        || (incomplete && extractDocsFromText(next).length && !lineHasDate(next));
      if (!nextContinues) break;
      i += 1;
      guard += 1;
      line = `${line} ${next}`;
    }
    merged.push(line);
  }
  return merged;
}

function parseExtratoLine(line) {
  const raw = String(line || "").trim();
  if (!raw) return null;
  if (/^(data|vencimento|histórico|historico|descri|valor|lançamento|lancamento)/i.test(raw)) return null;
  if (/subtotal|saldo|total|extrato/i.test(raw) && !/\d{1,2}[\/\-.]\d{1,2}/.test(raw)) return null;

  const parts = splitExtratoLine(raw);
  if (parts && parts.length >= 3) {
    let data = null;
    let valor = null;
    let descParts = [];
    parts.forEach((p) => {
      if (!data && parseDateBR(p)) data = parseDateBR(p);
      else if (valor == null && parseMoneyBR(p) != null && /[\d.,]/.test(p) && !/[a-zA-ZÀ-ú]{3,}/.test(p.replace(/R\$/gi, ""))) {
        valor = parseMoneyBR(p);
      } else if (p) descParts.push(p);
    });
    if (!data) {
      const dm = raw.match(/(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})/);
      if (dm) data = parseDateBR(dm[1]);
    }
    if (valor == null) {
      const vm = raw.match(/([+-]?\s*R\$\s*)?-?\(?\d{1,3}(?:\.\d{3})*,\d{2}\)?|-?\d+[.,]\d{2}/i);
      if (vm) valor = parseMoneyBR(vm[0]);
    }
    const rawDesc = descParts.join(" ").replace(/\s+/g, " ").trim();
    if (data && (rawDesc || extractDocsFromText(raw).length) && valor != null) {
      const tipo = valor < 0 ? "despesa" : "receita";
      const formatted = formatExtratoDesc(rawDesc || "Lançamento do extrato", raw, tipo);
      return {
        data,
        desc: formatted.desc,
        valor: Math.abs(valor),
        tipo,
        categoria: formatted.categoria || guessCategoria(formatted.desc, tipo),
        include: true
      };
    }
  }

  const dateMatch = raw.match(/(\d{1,2}[\/\-.]\d{1,2}[\/\-.](?:\d{2,4}))/);
  if (!dateMatch) return null;
  const data = parseDateBR(dateMatch[1]);
  if (!data) return null;

  const moneyMatches = [...raw.matchAll(/([+-]?\s*R\$\s*)?-?\(?\d{1,3}(?:\.\d{3})*,\d{2}\)?\s*[CD]?|-?\d+[.,]\d{2}\s*[CD]?/gi)];
  if (!moneyMatches.length) return null;
  const last = moneyMatches[moneyMatches.length - 1];
  let valor = parseMoneyBR(last[0]);
  if (valor == null) return null;

  const afterDate = raw.slice(dateMatch.index + dateMatch[0].length);
  let rawDesc = afterDate.slice(0, Math.max(0, last.index - (dateMatch.index + dateMatch[0].length))).trim();
  rawDesc = rawDesc.replace(/^[\s\-–—|:]+/, "").replace(/[\s\-–—|:]+$/, "").replace(/\s+/g, " ");
  if (!rawDesc) rawDesc = "Lançamento do extrato";

  const lower = raw.toLowerCase();
  const moneyTail = String(last[0]).toUpperCase();
  if (/\bD\b/.test(moneyTail) || (/\b(d|db|d[eé]bito|sa[ií]da)\b/i.test(lower) && !/\b(c|cr|cr[eé]dito|entrada)\b/i.test(lower))) {
    valor = -Math.abs(valor);
  } else if (/\bC\b/.test(moneyTail) || (/\b(c|cr|cr[eé]dito|entrada|recebido)\b/i.test(lower) && !/\b(d|db|d[eé]bito)\b/i.test(lower))) {
    valor = Math.abs(valor);
  }

  const tipo = valor < 0 ? "despesa" : "receita";
  const formatted = formatExtratoDesc(rawDesc, raw, tipo);
  return {
    data,
    desc: formatted.desc,
    valor: Math.abs(valor),
    tipo,
    categoria: formatted.categoria || guessCategoria(formatted.desc, tipo),
    include: true
  };
}

function normalizeExtratoText(text) {
  let s = String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\r/g, "");
  // Quebra blocos longos do PDF em linhas por data de lançamento.
  s = s.replace(/(?<=\S)\s+(?=(\d{1,2}\/\d{1,2}\/\d{2,4})\b)/g, "\n");
  s = s.replace(/(?<=\S)\s+(?=(\d{1,2}-\d{1,2}-\d{2,4})\b)/g, "\n");
  return s;
}

function parseExtratoText(text) {
  return preprocessExtratoLines(normalizeExtratoText(text))
    .map((l) => parseExtratoLine(l))
    .filter(Boolean);
}

function openExtratoModal() {
  $("ex-banco").innerHTML = db.bancos.map((b) => `<option value="${b.id}">${b.nome}</option>`).join("");
  $("ex-texto").value = "";
  $("ex-file").value = "";
  extratoRows = [];
  renderExtratoPreview();
  $("modal-extrato").classList.remove("hidden");
}

function closeExtratoModal() {
  $("modal-extrato").classList.add("hidden");
}

function renderExtratoPreview() {
  const tbody = $("ex-preview");
  const btn = $("ex-importar");
  const resumo = $("ex-resumo");
  if (!extratoRows.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="extrato-empty">Cole o extrato e clique em Analisar para ver a prévia.</td></tr>`;
    btn.disabled = true;
    resumo.textContent = "Nenhuma linha analisada ainda.";
    $("ex-check-all").checked = false;
    return;
  }
  const rec = extratoRows.filter((r) => r.include && r.tipo === "receita");
  const des = extratoRows.filter((r) => r.include && r.tipo === "despesa");
  resumo.textContent = `${extratoRows.filter((r) => r.include).length} selecionado(s) · ${rec.length} receita(s) ${money(sum(rec))} · ${des.length} despesa(s) ${money(sum(des))}`;
  btn.disabled = !extratoRows.some((r) => r.include);
  $("ex-check-all").checked = extratoRows.every((r) => r.include);

  tbody.innerHTML = extratoRows.map((r, i) => {
    const catOpts = cats(r.tipo).map((c) => `<option value="${c}" ${c === r.categoria ? "selected" : ""}>${c}</option>`).join("");
    return `<tr data-ex-i="${i}">
      <td><input type="checkbox" class="ex-inc" ${r.include ? "checked" : ""} /></td>
      <td><input type="date" class="ex-data" value="${r.data}" /></td>
      <td><input type="text" class="ex-desc" maxlength="${DESC_MAX}" value="${r.desc.replace(/"/g, "&quot;")}" /></td>
      <td>
        <select class="ex-tipo">
          <option value="receita" ${r.tipo === "receita" ? "selected" : ""}>Receita</option>
          <option value="despesa" ${r.tipo === "despesa" ? "selected" : ""}>Despesa</option>
        </select>
      </td>
      <td><select class="ex-cat">${catOpts}</select></td>
      <td class="num ${r.tipo === "receita" ? "gold" : "rose"}">${money(r.valor)}</td>
    </tr>`;
  }).join("");
}

function syncExtratoRowFromDom(tr) {
  const i = Number(tr.dataset.exI);
  const row = extratoRows[i];
  if (!row) return;
  row.include = tr.querySelector(".ex-inc").checked;
  row.data = tr.querySelector(".ex-data").value || row.data;
  row.desc = tr.querySelector(".ex-desc").value.trim() || row.desc;
  const tipo = tr.querySelector(".ex-tipo").value;
  if (tipo !== row.tipo) {
    row.tipo = tipo;
    row.categoria = guessCategoria(row.desc, tipo);
  } else {
    row.categoria = tr.querySelector(".ex-cat").value;
  }
}

function analisarExtrato() {
  extratoRows = parseExtratoText($("ex-texto").value);
  renderExtratoPreview();
  if (!extratoRows.length) {
    toast("Não encontrei lançamentos. No PDF, confira se o texto é selecionável (não escaneado).");
    return;
  }
  const reused = extratoRows.filter((r) => lookupKnownByDocs(extractDocsFromText(r.desc), r.tipo)).length;
  toast(reused
    ? `${extratoRows.length} lançamento(s) · ${reused} com descrição já cadastrada (CPF/CNPJ)`
    : `${extratoRows.length} lançamento(s) encontrados no extrato`);
}

function pdfItemsToText(items) {
  const usable = (items || [])
    .map((it) => ({
      str: String(it.str || "").replace(/\s+/g, " ").trim(),
      x: Number(it.transform?.[4] ?? 0),
      y: Number(it.transform?.[5] ?? 0),
      w: Number(it.width || 0)
    }))
    .filter((it) => it.str);

  if (!usable.length) return "";

  usable.sort((a, b) => {
    const dy = b.y - a.y;
    if (Math.abs(dy) > 2.5) return dy;
    return a.x - b.x;
  });

  const lines = [];
  let current = [];
  let currentY = null;
  usable.forEach((it) => {
    if (currentY == null || Math.abs(it.y - currentY) <= 3.5) {
      current.push(it);
      currentY = currentY == null ? it.y : (currentY * 0.7 + it.y * 0.3);
      return;
    }
    lines.push(joinPdfLineItems(current));
    current = [it];
    currentY = it.y;
  });
  if (current.length) lines.push(joinPdfLineItems(current));
  return lines.filter(Boolean).join("\n");
}

function joinPdfLineItems(items) {
  const sorted = [...items].sort((a, b) => a.x - b.x);
  let out = "";
  let prev = null;
  sorted.forEach((it) => {
    if (!prev) {
      out = it.str;
      prev = it;
      return;
    }
    const gap = it.x - (prev.x + (prev.w || 0));
    out += gap > 8 ? ` ${it.str}` : `${gap < -1 ? " " : ""}${it.str}`;
    prev = it;
  });
  return out.replace(/\s+/g, " ").trim();
}

function scoreExtratoText(text) {
  const s = String(text || "");
  if (!s.trim()) return 0;
  const dates = (s.match(/\d{1,2}[\/\-.]\d{1,2}(?:[\/\-.]\d{2,4})?/g) || []).length;
  const money = (s.match(/\d{1,3}(?:\.\d{3})*,\d{2}|\d+[.,]\d{2}/g) || []).length;
  const docs = extractDocsFromText(s).length;
  const rows = parseExtratoText(s).length;
  return dates * 2 + money * 2 + docs * 3 + rows * 8 + Math.min(40, Math.floor(s.length / 80));
}

async function ensurePdfJs() {
  if (!window.pdfjsLib) throw new Error("PDF.js não carregou");
  if (!window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  }
  return window.pdfjsLib;
}

async function loadPdfDocument(file) {
  const pdfjsLib = await ensurePdfJs();
  const data = new Uint8Array(await file.arrayBuffer());
  return pdfjsLib.getDocument({ data }).promise;
}

async function extractTextFromPdfDoc(pdf) {
  const pages = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent({ normalizeWhitespace: true, disableCombineTextItems: false });
    pages.push(pdfItemsToText(content.items || []));
  }
  return pages.filter(Boolean).join("\n");
}

async function renderPdfPageToCanvas(page, scale = 2.2) {
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport }).promise;
  return canvas;
}

async function ensureTesseract() {
  if (!window.Tesseract?.recognize) throw new Error("OCR (Tesseract) não carregou. Verifique a internet.");
  return window.Tesseract;
}

async function ocrPdfDocument(pdf, onProgress) {
  const Tesseract = await ensureTesseract();
  const maxPages = Math.min(pdf.numPages, 12);
  const pages = [];
  for (let i = 1; i <= maxPages; i++) {
    if (onProgress) onProgress(`OCR página ${i}/${maxPages}…`);
    const page = await pdf.getPage(i);
    const canvas = await renderPdfPageToCanvas(page, 2.3);
    const result = await Tesseract.recognize(canvas, "por", {
      logger: (m) => {
        if (m.status === "recognizing text" && onProgress) {
          const pct = Math.round((m.progress || 0) * 100);
          onProgress(`OCR página ${i}/${maxPages} · ${pct}%`);
        }
      }
    });
    pages.push(String(result?.data?.text || "").trim());
    canvas.width = 0;
    canvas.height = 0;
  }
  if (pdf.numPages > maxPages && onProgress) {
    onProgress(`OCR limitado às primeiras ${maxPages} páginas`);
  }
  return pages.filter(Boolean).join("\n");
}

function isPdfFile(file) {
  const name = String(file?.name || "").toLowerCase();
  return file?.type === "application/pdf" || name.endsWith(".pdf");
}

function setExtratoProgress(msg, notify = false) {
  const el = $("ex-resumo");
  if (el && msg) el.textContent = msg;
  if (notify && msg) toast(msg);
}

async function readPdfSmart(file) {
  setExtratoProgress("Lendo PDF…", true);
  const pdf = await loadPdfDocument(file);
  const nativeText = await extractTextFromPdfDoc(pdf);
  const nativeScore = scoreExtratoText(nativeText);
  const nativeRows = parseExtratoText(nativeText).length;

  // Texto nativo bom o suficiente: usa direto.
  if (nativeRows >= 1 && nativeScore >= 18) {
    setExtratoProgress(`PDF com texto nativo · ${nativeRows} lançamento(s) detectado(s)`);
    return nativeText;
  }

  // Sem texto útil: OCR em português.
  setExtratoProgress("Texto fraco no PDF. Iniciando OCR…", true);
  try {
    const ocrText = await ocrPdfDocument(pdf, (msg) => setExtratoProgress(msg, false));
    const ocrScore = scoreExtratoText(ocrText);
    const ocrRows = parseExtratoText(ocrText).length;

    if (ocrScore > nativeScore || ocrRows > nativeRows) {
      setExtratoProgress(`PDF lido com OCR · ${ocrRows} lançamento(s) detectado(s)`, true);
      return ocrText || nativeText;
    }
    if (nativeText.trim()) {
      setExtratoProgress("Mantendo texto nativo do PDF");
      return nativeText;
    }
    if (ocrText.trim()) return ocrText;
  } catch (err) {
    console.error(err);
    if (nativeText.trim()) {
      setExtratoProgress("OCR indisponível — usei o texto nativo do PDF", true);
      return nativeText;
    }
    throw err;
  }

  throw new Error("Não consegui ler o PDF. Tente CSV/TXT ou um PDF com texto mais nítido.");
}

async function readExtratoFile(file) {
  if (isPdfFile(file)) return readPdfSmart(file);
  return file.text();
}

function extratoFingerprint(r) {
  return `${r.data}|${r.tipo}|${Number(r.valor).toFixed(2)}|${String(r.desc || "").toLowerCase().replace(/\s+/g, " ").trim().slice(0, 60)}`;
}

function dedupeExtratoRows(rows) {
  const existing = new Set((db.transacoes || []).map(extratoFingerprint));
  const seen = new Set();
  return (rows || []).filter((r) => {
    const fp = extratoFingerprint(r);
    if (existing.has(fp) || seen.has(fp)) return false;
    seen.add(fp);
    return true;
  });
}

function commitExtratoRows(rows, banco) {
  const prepared = dedupeExtratoRows(rows.map((r) => ({
    ...r,
    categoria: cats(r.tipo).includes(r.categoria) ? r.categoria : guessCategoria(r.desc, r.tipo),
    status: r.status || "pago",
    include: true
  })));
  if (!prepared.length) return { added: 0, skipped: (rows || []).length };

  prepared.forEach((r) => {
    db.transacoes.push({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
      desc: r.desc,
      tipo: r.tipo,
      valor: Number(r.valor),
      data: r.data,
      categoria: r.categoria || guessCategoria(r.desc, r.tipo),
      banco,
      status: "pago"
    });
  });
  save();
  return { added: prepared.length, skipped: Math.max(0, (rows || []).length - prepared.length) };
}

function importarExtrato() {
  const banco = $("ex-banco").value || db.bancos[0]?.id;
  if (!banco) return toast("Cadastre um banco antes de importar");
  document.querySelectorAll("#ex-preview tr[data-ex-i]").forEach(syncExtratoRowFromDom);
  const selected = extratoRows.filter((r) => r.include && r.desc && r.data && r.valor > 0);
  if (!selected.length) return toast("Selecione ao menos um lançamento");

  const { added, skipped } = commitExtratoRows(selected, banco);
  closeExtratoModal();
  refresh();
  toast(skipped
    ? `${added} importado(s), ${skipped} repetido(s) ignorado(s)`
    : `${added} lançamento(s) do extrato adicionados`);
}

async function importarExtratoComIA(autoClose = true) {
  if (!window.VitrinaAI?.hasKey?.()) {
    toast("Configure a chave da IA em Configurações");
    return false;
  }
  const texto = $("ex-texto")?.value?.trim();
  if (!texto) {
    toast("Cole ou envie o extrato antes");
    return false;
  }
  const banco = $("ex-banco").value || db.bancos[0]?.id;
  if (!banco) {
    toast("Cadastre um banco antes de importar");
    return false;
  }

  setExtratoProgress("IA classificando extrato…", true);
  let rows = [];
  try {
    rows = await window.VitrinaAI.organizeExtrato({
      texto,
      categoriasReceita: cats("receita"),
      categoriasDespesa: cats("despesa"),
      db
    });
  } catch (err) {
    console.warn("[extrato IA]", err);
    // Fallback local se a IA falhar
    rows = parseExtratoText(texto);
    if (!rows.length) throw err;
    toast("IA falhou — importei com o analisador local");
  }

  if (!rows.length) {
    toast("Nenhum lançamento encontrado no extrato");
    return false;
  }

  extratoRows = rows.map((r) => ({
    ...r,
    categoria: cats(r.tipo).includes(r.categoria) ? r.categoria : guessCategoria(r.desc, r.tipo),
    include: true
  }));
  renderExtratoPreview();

  const { added, skipped } = commitExtratoRows(extratoRows, banco);
  if (autoClose) closeExtratoModal();
  refresh();
  setExtratoProgress(
    skipped
      ? `Importação automática: ${added} novo(s), ${skipped} já existiam`
      : `Importação automática: ${added} lançamento(s)`,
    false
  );
  toast(skipped
    ? `${added} lançamento(s) importados · ${skipped} duplicado(s) ignorado(s)`
    : `${added} lançamento(s) importados automaticamente`);
  return added > 0;
}

function openModal(tipo, tx, opts = {}) {
  $("modal").classList.remove("hidden");
  $("modal-title").textContent = tx ? "Editar lançamento" : tipo === "receita" ? "Nova receita" : "Nova despesa";
  $("f-id").value = tx?.id || "";
  $("f-tipo").value = tx?.tipo || tipo;
  $("f-desc").value = tx?.desc || "";
  $("f-valor").value = tx?.valor || "";
  $("f-data").value = tx?.data || todayISO();
  $("f-status").value = tx?.status || "pago";
  const list = cats(tx?.tipo || tipo);
  $("f-categoria").innerHTML = list.map((c) => `<option>${c}</option>`).join("") || `<option value="">Sem categorias</option>`;
  $("f-banco").innerHTML = db.bancos.map((b) => `<option value="${b.id}">${b.nome}</option>`).join("");
  if (tx) {
    $("f-categoria").value = tx.categoria;
    $("f-banco").value = tx.banco;
  } else if (opts.categoria && list.includes(opts.categoria)) {
    $("f-categoria").value = opts.categoria;
  }
  $("modal-save").className = `btn ${ (tx?.tipo || tipo) === "receita" ? "btn-gold" : "btn-brown"}`;
  setTimeout(() => $("f-desc").focus(), 30);
}

function closeModal() { $("modal").classList.add("hidden"); }

function handleLancamentoClick(e) {
  const edit = e.target.dataset.edit;
  const del = e.target.dataset.del;
  const addTipo = e.target.dataset.addTipo;
  const addCat = e.target.dataset.addCat;
  if (addTipo) {
    openModal(addTipo, null, { categoria: addCat });
    return;
  }
  if (edit) {
    const tx = db.transacoes.find((x) => x.id === edit);
    if (tx) openModal(tx.tipo, tx);
    return;
  }
  if (del) {
    const tx = db.transacoes.find((x) => x.id === del);
    if (!tx) return;
    if (!confirm(`Excluir "${tx.desc}" (${money(tx.valor)})?`)) return;
    db.transacoes = db.transacoes.filter((x) => x.id !== del);
    save();
    refresh();
    toast("Lançamento excluído");
  }
}

function bind() {
  document.querySelectorAll("[data-view]").forEach((el) => el.addEventListener("click", () => showView(el.dataset.view)));
  $("btn-menu")?.addEventListener("click", toggleMenu);
  $("btn-menu-close")?.addEventListener("click", closeMenu);
  $("sidebar-backdrop")?.addEventListener("click", closeMenu);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) closeMenu();
  });
  ["filtro-tipo", "filtro-categoria", "filtro-periodo", "filtro-de", "filtro-ate"].forEach((id) => {
    $(id).addEventListener("change", () => {
      if (id === "filtro-tipo") populateFilters();
      $("custom-range").classList.toggle("hidden", $("filtro-periodo").value !== "custom");
      renderPainel();
    });
  });
  $("filtro-busca").addEventListener("input", renderPainel);
  ["tx-tipo", "tx-categoria", "tx-banco", "tx-status"].forEach((id) => $(id).addEventListener("change", () => {
    if (id === "tx-tipo") populateFilters();
    renderTransacoes();
  }));
  $("tx-busca").addEventListener("input", renderTransacoes);

  ["rec-categoria", "rec-periodo", "rec-de", "rec-ate"].forEach((id) => {
    $(id).addEventListener("change", () => {
      $("rec-range").classList.toggle("hidden", $("rec-periodo").value !== "custom");
      renderTipoView("receita");
    });
  });
  $("rec-busca").addEventListener("input", () => renderTipoView("receita"));

  ["des-categoria", "des-periodo", "des-de", "des-ate"].forEach((id) => {
    $(id).addEventListener("change", () => {
      $("des-range").classList.toggle("hidden", $("des-periodo").value !== "custom");
      renderTipoView("despesa");
    });
  });
  $("des-busca").addEventListener("input", () => renderTipoView("despesa"));

  $("btn-receita").onclick = () => openModal("receita");
  $("btn-despesa").onclick = () => openModal("despesa");
  $("btn-nova-receita").onclick = () => openModal("receita");
  $("btn-nova-despesa").onclick = () => openModal("despesa");
  $("btn-extrato").onclick = () => openExtratoModal();
  $("view-receitas").addEventListener("click", handleLancamentoClick);
  $("view-despesas").addEventListener("click", handleLancamentoClick);
  $("btn-saldo-vivo").onclick = () => { showView("bancos"); toast("Saldos atualizados com os lançamentos pagos"); };
  $("modal-close").onclick = $("modal-cancel").onclick = closeModal;
  $("modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });
  $("modal-extrato-close").onclick = $("modal-extrato-cancel").onclick = closeExtratoModal;
  $("modal-extrato").addEventListener("click", (e) => { if (e.target.id === "modal-extrato") closeExtratoModal(); });
  $("ex-analisar").onclick = analisarExtrato;
  $("ex-analisar-ia").onclick = async () => {
    const btn = $("ex-analisar-ia");
    btn.disabled = true;
    btn.textContent = "Importando…";
    try {
      await importarExtratoComIA(true);
    } catch (err) {
      console.error(err);
      toast(err?.message || "Falha na importação com IA");
    } finally {
      btn.disabled = false;
      btn.textContent = "Importar com IA";
    }
  };
  $("ex-importar").onclick = importarExtrato;
  $("ex-check-all").onchange = () => {
    const on = $("ex-check-all").checked;
    extratoRows.forEach((r) => { r.include = on; });
    renderExtratoPreview();
  };
  $("ex-file").onchange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const btnIa = $("ex-analisar-ia");
    const btnLocal = $("ex-analisar");
    btnIa.disabled = true;
    btnLocal.disabled = true;
    btnIa.textContent = "Lendo arquivo…";
    try {
      const text = await readExtratoFile(file);
      $("ex-texto").value = text;
      if (window.VitrinaAI?.hasKey?.()) {
        btnIa.textContent = "Importando…";
        await importarExtratoComIA(true);
      } else {
        analisarExtrato();
        toast("Arquivo lido. Configure a IA para importar automaticamente.");
      }
    } catch (err) {
      console.error(err);
      toast(err?.message || "Não foi possível ler/importar o arquivo");
      // ainda tenta análise local na tela
      try { analisarExtrato(); } catch { /* ignore */ }
    } finally {
      btnIa.disabled = false;
      btnLocal.disabled = false;
      btnIa.textContent = "Importar com IA";
    }
  };
  $("ex-preview").addEventListener("change", (e) => {
    const tr = e.target.closest("tr[data-ex-i]");
    if (!tr) return;
    const tipoChanged = e.target.classList.contains("ex-tipo");
    syncExtratoRowFromDom(tr);
    if (tipoChanged) renderExtratoPreview();
    else {
      const selected = extratoRows.filter((r) => r.include);
      $("ex-importar").disabled = !selected.length;
      $("ex-resumo").textContent = `${selected.length} selecionado(s) · ${selected.filter((r) => r.tipo === "receita").length} receita(s) ${money(sum(selected.filter((r) => r.tipo === "receita")))} · ${selected.filter((r) => r.tipo === "despesa").length} despesa(s) ${money(sum(selected.filter((r) => r.tipo === "despesa")))}`;
      $("ex-check-all").checked = extratoRows.length > 0 && extratoRows.every((r) => r.include);
    }
  });
  $("modal-func-close").onclick = $("modal-func-cancel").onclick = closeFuncModal;
  $("modal-func").addEventListener("click", (e) => { if (e.target.id === "modal-func") closeFuncModal(); });
  $("modal-ponto-close").onclick = $("modal-ponto-cancel").onclick = closePresencaCal;
  $("modal-ponto").addEventListener("click", (e) => { if (e.target.id === "modal-ponto") closePresencaCal(); });
  $("ponto-cal-prev").onclick = () => {
    pontoCal.month -= 1;
    if (pontoCal.month < 0) { pontoCal.month = 11; pontoCal.year -= 1; }
    renderPresencaCal();
  };
  $("ponto-cal-next").onclick = () => {
    pontoCal.month += 1;
    if (pontoCal.month > 11) { pontoCal.month = 0; pontoCal.year += 1; }
    renderPresencaCal();
  };
  $("ponto-cal-grid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-ponto-day]");
    if (btn) togglePontoDay(btn.dataset.pontoDay);
  });
  $("view-ponto").addEventListener("click", (e) => {
    const id = e.target.dataset.presenca;
    if (id) openPresencaCal(id);
  });
  $("form-lancamento").addEventListener("submit", (e) => {
    e.preventDefault();
    const item = {
      id: $("f-id").value || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
      desc: $("f-desc").value.trim(),
      tipo: $("f-tipo").value,
      valor: Number($("f-valor").value),
      data: $("f-data").value,
      categoria: $("f-categoria").value,
      banco: $("f-banco").value,
      status: $("f-status").value
    };
    const idx = db.transacoes.findIndex((x) => x.id === item.id);
    if (idx >= 0) db.transacoes[idx] = item;
    else db.transacoes.push(item);
    save(); closeModal(); refresh(); toast("Lançamento salvo");
  });
  $("form-funcionario").addEventListener("submit", (e) => {
    e.preventDefault();
    const item = {
      id: $("ff-id").value || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
      nome: $("ff-nome").value.trim(),
      cargo: $("ff-cargo").value,
      telefone: $("ff-telefone").value.trim(),
      salario: Number($("ff-salario").value) || 0,
      status: $("ff-status").value,
      registros: []
    };
    const idx = db.funcionarios.findIndex((x) => x.id === item.id);
    if (idx >= 0) {
      item.registros = db.funcionarios[idx].registros || [];
      db.funcionarios[idx] = item;
    } else {
      db.funcionarios.push(item);
    }
    save(); closeFuncModal(); refresh(); toast("Funcionário salvo");
  });
  $("view-transacoes").addEventListener("click", handleLancamentoClick);
  $("view-funcionarios").addEventListener("click", (e) => {
    if (e.target.dataset.funcEdit) {
      openFuncModal(db.funcionarios.find((x) => x.id === e.target.dataset.funcEdit));
      return;
    }
    if (e.target.dataset.funcDel) {
      const f = db.funcionarios.find((x) => x.id === e.target.dataset.funcDel);
      if (!f || !confirm(`Excluir ${f.nome}?`)) return;
      db.funcionarios = db.funcionarios.filter((x) => x.id !== f.id);
      save(); refresh(); toast("Funcionário excluído");
      return;
    }
    if (e.target.dataset.funcHist) {
      const f = db.funcionarios.find((x) => x.id === e.target.dataset.funcHist);
      if (!f) return;
      const regs = registrosOrdenados(ensureFunc(f));
      alert(regs.length
        ? regs.map((r) => `${parseISO(r.data).toLocaleDateString("pt-BR")} — ${r.situacao}${r.local ? ` · ${r.local}` : ""}`).join("\n")
        : "Nenhum histórico registrado.");
      return;
    }
    if (e.target.dataset.funcReg) {
      const card = e.target.closest(".func-card");
      const f = db.funcionarios.find((x) => x.id === e.target.dataset.funcReg);
      if (!f || !card) return;
      ensureFunc(f);
      const data = card.querySelector(".ff-data").value;
      const situacao = card.querySelector(".ff-situacao").value;
      const local = card.querySelector(".ff-local").value;
      if (!data) return toast("Informe a data");
      const idx = f.registros.findIndex((r) => r.data === data);
      const reg = { data, situacao, local };
      if (idx >= 0) f.registros[idx] = reg;
      else f.registros.push(reg);
      save(); refresh(); toast("Dia registrado");
    }
  });
  window.addEventListener("resize", () => {
    if (view === "painel") renderPainel();
    if (view === "receitas") renderTipoView("receita");
    if (view === "despesas") renderTipoView("despesa");
  });
}

function cloudStatusText() {
  if (!window.VitrinaCloud?.ready) return "Nuvem offline · dados só neste navegador";
  if (lastCloudError) return `Nuvem com erro: ${lastCloudError}`;
  if (lastCloudAt) {
    return `Sincronizado com Supabase · ${lastCloudAt.toLocaleString("pt-BR")} · Vitrina Contabilidade`;
  }
  return "Pronto para sincronizar com Supabase · Vitrina Contabilidade";
}

function showLogin() {
  autenticado = false;
  closeMenu();
  $("login-screen").classList.remove("hidden");
  $("app").classList.add("hidden");
  $("login-error").classList.add("hidden");
  $("login-user").value = "";
  $("login-pass").value = "";
  setTimeout(() => $("login-user").focus(), 50);
}

function enterApp() {
  autenticado = true;
  sessionStorage.setItem(AUTH_KEY, "1");
  $("login-screen").classList.add("hidden");
  $("app").classList.remove("hidden");
  greeting();
  refresh();
  window.dispatchEvent(new Event("resize"));
}

function logout() {
  sessionStorage.removeItem(AUTH_KEY);
  showLogin();
  toast("Você saiu do sistema");
}

function setLoginLoading(loading, msg) {
  const form = $("form-login");
  const btn = form?.querySelector('button[type="submit"]');
  const hint = $("login-sync-hint");
  if (btn) {
    btn.disabled = loading;
    btn.textContent = loading ? "Sincronizando…" : "Acessar";
  }
  if (hint) {
    hint.textContent = msg || "";
    hint.classList.toggle("hidden", !msg);
  }
}

async function syncFromCloudOnBoot() {
  if (!window.VitrinaCloud?.ready) return;
  setLoginLoading(true, "Carregando dados da nuvem…");
  try {
    const remote = await window.VitrinaCloud.load();
    if (remote.error) {
      lastCloudError = remote.error.message || "Erro ao ler a nuvem";
      setLoginLoading(false, "Nuvem indisponível — usando dados locais. Confira se o SQL do schema foi executado.");
      return;
    }
    if (remote.data && typeof remote.data === "object") {
      db = normalizeDb(remote.data);
      saveLocal();
      lastCloudAt = remote.updatedAt ? new Date(remote.updatedAt) : new Date();
      lastCloudError = null;
      setLoginLoading(false, "Dados sincronizados da nuvem.");
      return;
    }
    const ok = await saveCloud(true);
    setLoginLoading(false, ok
      ? "Workspace criado na nuvem com os dados locais."
      : "Não foi possível criar o workspace na nuvem. Rode o SQL em supabase/schema.sql.");
  } catch (err) {
    lastCloudError = err?.message || String(err);
    setLoginLoading(false, "Falha ao sincronizar — usando dados locais.");
  }
}

$("form-login").addEventListener("submit", (e) => {
  e.preventDefault();
  const user = $("login-user").value.trim();
  const pass = $("login-pass").value;
  const okUser = user.toLowerCase() === String(db.acessoUsuario || db.usuario || "").trim().toLowerCase();
  const okPass = pass === String(db.senha || "");
  if (!okUser || !okPass) {
    $("login-error").classList.remove("hidden");
    $("login-pass").value = "";
    $("login-pass").focus();
    return;
  }
  $("login-error").classList.add("hidden");
  enterApp();
  toast(`Bem-vindo, ${db.usuario}`);
});

async function boot() {
  populateFilters();
  greeting();
  bind();
  const loggedIn = sessionStorage.getItem(AUTH_KEY) === "1";
  if (loggedIn) {
    $("login-screen").classList.add("hidden");
  } else {
    showLogin();
  }
  await syncFromCloudOnBoot();
  const imported = mergeDespEscr();
  if (imported) toast(`${imported} despesas de setembro importadas da planilha`);
  if (sessionStorage.getItem(AUTH_KEY) === "1") enterApp();
  else showLogin();
}

boot();
