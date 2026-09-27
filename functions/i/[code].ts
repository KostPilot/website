// Invitationslink fra "Giv en ven en pilot" i appen: kost-pilot.dk/i/KP-XXXXX
// Registrerer at linket blev åbnet (referral_events) og viser en lille side i sidens mørke stil.

type InviteEnv = {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
};

type PagesFunctionContext = {
  request: Request;
  env: InviteEnv;
  params: { code?: string | string[] };
  waitUntil: (p: Promise<unknown>) => void;
};

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function logOpen(env: InviteEnv, code: string) {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return;
  const headers = {
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
  };
  const found = await fetch(`${env.SUPABASE_URL}/rest/v1/referral_codes?select=code&code=eq.${encodeURIComponent(code)}`, { headers });
  const rows = found.ok ? ((await found.json()) as unknown[]) : [];
  if (!rows.length) return;
  await fetch(`${env.SUPABASE_URL}/rest/v1/referral_events`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify({ code, kind: "open" }),
  });
}

const LOGO = `<svg width="84" height="84" viewBox="0 0 200 200" aria-hidden="true"><g fill="#D4704C"><path d="M32,168 L66,168 L170,30 L136,30 Z"/><path d="M32,30 L72,30 L105,60 L95,74 L78,98 L46,98 L32,84 Z"/><path d="M168,170 L128,170 L95,140 L105,126 L122,102 L154,102 L168,116 Z"/></g><g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M74,80 C66,82 62,74 68,69 C74,64 84,68 88,76 C96,90 108,98 122,102" stroke="#0f0d0c" stroke-width="16"/><path d="M74,80 C66,82 62,74 68,69 C74,64 84,68 88,76 C96,90 108,98 122,102" stroke="#D4704C" stroke-width="8"/><path d="M126,120 C134,118 138,126 132,131 C126,136 116,132 112,124 C104,110 92,102 78,98" stroke="#0f0d0c" stroke-width="16"/><path d="M126,120 C134,118 138,126 132,131 C126,136 116,132 112,124 C104,110 92,102 78,98" stroke="#D4704C" stroke-width="8"/></g></svg>`;

export async function onRequestGet(context: PagesFunctionContext) {
  const raw = Array.isArray(context.params.code) ? context.params.code[0] : context.params.code ?? "";
  const code = raw.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 12);
  const valid = /^KP-[A-Z0-9]{5}$/.test(code);
  if (valid) context.waitUntil(logOpen(context.env, code).catch(() => {}));

  const html = `<!doctype html><html lang="da"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Du har fået en KostPilot</title>
<meta name="description" content="En ven har givet dig en pilot: madplanen, der betaler sig selv.">
<meta property="og:title" content="En ven har givet dig en pilot.">
<meta property="og:description" content="KostPilot finder ugens tilbud og laver en madplan, du har lyst til.">
<style>
*{box-sizing:border-box}
body{margin:0;min-height:100vh;background:radial-gradient(90% 55% at 50% 0%,rgba(212,112,76,.38),rgba(212,112,76,0) 70%),#0f0d0c;color:#fff;
font:16px/1.55 -apple-system,BlinkMacSystemFont,"Inter",system-ui,sans-serif;-webkit-font-smoothing:antialiased;display:flex;align-items:center;justify-content:center;padding:24px}
.card{max-width:440px;width:100%;text-align:center}
.eyebrow{margin:26px 0 0;font-size:12px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#a1a1a6}
h1{font-family:"Source Serif 4",Georgia,serif;font-weight:600;letter-spacing:-.02em;font-size:38px;line-height:1.08;margin:14px 0 14px}
p{color:rgba(255,255,255,.72);margin:0 0 26px}
.code{display:inline-block;background:#fff;color:#1c1c1e;border-radius:14px;padding:10px 18px;font-weight:700;letter-spacing:.14em;margin-bottom:26px}
.btn{display:block;background:#D4704C;color:#fff;text-decoration:none;font-weight:600;border-radius:100px;padding:15px}
.btn:hover{background:#BD5E3C}
.link{display:inline-block;margin-top:16px;color:rgba(255,255,255,.6);text-decoration:none;font-size:14px}
</style></head><body><main class="card">
${LOGO}
<p class="eyebrow">Giv en ven en pilot</p>
<h1>En ven har givet dig en pilot.</h1>
<p>KostPilot finder ugens tilbud, laver en madplan du har lyst til, og holder styr på budget og indkøb. Appen er i lukket beta lige nu. Skriv dig op, så får du besked, når du kan hente den.</p>
${valid ? `<div class="code">${esc(code)}</div>` : ""}
<a class="btn" href="/#venteliste">Skriv dig på ventelisten</a>
<a class="link" href="/">Se hvad KostPilot kan</a>
</main></body></html>`;

  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}
