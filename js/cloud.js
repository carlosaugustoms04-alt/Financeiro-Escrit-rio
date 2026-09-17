(function (global) {
  const cfg = global.VITRINA_CONFIG;
  if (!cfg?.supabaseUrl || !cfg?.supabaseKey || !global.supabase?.createClient) {
    global.VitrinaCloud = {
      ready: false,
      async load() { return null; },
      async save() { return { ok: false, error: "Supabase não configurado" }; }
    };
    return;
  }

  const client = global.supabase.createClient(cfg.supabaseUrl, cfg.supabaseKey);
  const workspaceKey = cfg.workspaceKey || "vitrina-financas";

  global.VitrinaCloud = {
    ready: true,
    client,

    async load() {
      const { data, error } = await client
        .from("finance_workspace")
        .select("data, updated_at")
        .eq("workspace_key", workspaceKey)
        .maybeSingle();

      if (error) {
        console.error("[VitrinaCloud] load", error);
        return { data: null, error, updatedAt: null };
      }
      return { data: data?.data ?? null, error: null, updatedAt: data?.updated_at ?? null };
    },

    async save(payload) {
      const { error } = await client
        .from("finance_workspace")
        .upsert({
          workspace_key: workspaceKey,
          data: payload,
          updated_at: new Date().toISOString()
        }, { onConflict: "workspace_key" });

      if (error) {
        console.error("[VitrinaCloud] save", error);
        return { ok: false, error };
      }
      return { ok: true, error: null };
    }
  };
})(window);
