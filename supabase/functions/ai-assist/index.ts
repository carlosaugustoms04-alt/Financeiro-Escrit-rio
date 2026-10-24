// Supabase Edge Function — Assistente IA da Vitrina
// Deploy: supabase functions deploy ai-assist
// Secret: supabase secrets set GEMINI_API_KEY=sua_chave

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  try {
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return Response.json(
        { error: "GEMINI_API_KEY não configurada no Supabase Secrets." },
        { status: 500, headers: cors }
      );
    }

    const body = await req.json();
    const prompt = String(body?.prompt || "");
    const context = String(body?.context || "");
    const mode = String(body?.mode || "chat");
    if (!prompt.trim()) {
      return Response.json({ error: "Prompt vazio" }, { status: 400, headers: cors });
    }

    const system = `Você é o Assistente Financeiro da Vitrina Contabilidade.
Responda em português do Brasil, objetivo e acionável.
Use o contexto financeiro. Não invente valores.
Modo atual: ${mode}.
${mode === "extrato" ? "Se o pedido pedir JSON, responda apenas JSON válido." : ""}`;

    const model = Deno.env.get("GEMINI_MODEL") || "gemini-3.8-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{
          role: "user",
          parts: [{ text: `CONTEXTO FINANCEIRO:\n${context}\n\nPEDIDO:\n${prompt}` }],
        }],
        generationConfig: { temperature: 0.35, maxOutputTokens: 2048 },
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return Response.json(
        { error: data?.error?.message || `Gemini HTTP ${res.status}` },
        { status: 502, headers: cors }
      );
    }

    const text = data?.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text)
      .filter(Boolean)
      .join("\n") || "";

    return Response.json({ text }, { headers: cors });
  } catch (err) {
    return Response.json(
      { error: err?.message || String(err) },
      { status: 500, headers: cors }
    );
  }
});
