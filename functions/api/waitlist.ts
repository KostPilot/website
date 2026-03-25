import { isValidWaitlistEmail, normalizeEmail } from "../../src/lib/waitlist";

type WaitlistEnv = {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  SUPABASE_WAITLIST_TABLE?: string;
  SUPABASE_WAITLIST_EMAIL_COLUMN?: string;
  SUPABASE_WAITLIST_SOURCE_COLUMN?: string;
  SUPABASE_WAITLIST_SOURCE_VALUE?: string;
  SUPABASE_SCHEMA?: string;
};

type PagesFunctionContext = {
  request: Request;
  env: WaitlistEnv;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(body: Record<string, string>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });
}

function getSupabaseConfig(env: WaitlistEnv) {
  return {
    url: env.SUPABASE_URL,
    serviceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY,
    table: env.SUPABASE_WAITLIST_TABLE ?? "waitlist",
    emailColumn: env.SUPABASE_WAITLIST_EMAIL_COLUMN ?? "email",
    sourceColumn: env.SUPABASE_WAITLIST_SOURCE_COLUMN,
    sourceValue: env.SUPABASE_WAITLIST_SOURCE_VALUE ?? "website",
    schema: env.SUPABASE_SCHEMA ?? "public",
  };
}

function createSupabaseHeaders(
  serviceRoleKey: string,
  schema: string,
  includeContentProfile = false,
) {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    Accept: "application/json",
    "Accept-Profile": schema,
    ...(includeContentProfile ? { "Content-Profile": schema } : {}),
  };
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function onRequestPost({ request, env }: PagesFunctionContext) {
  const config = getSupabaseConfig(env);

  if (!config.url || !config.serviceRoleKey) {
    return jsonResponse({ message: "Ventelisten er ikke konfigureret endnu." }, 500);
  }

  let email = "";

  try {
    const payload = (await request.json()) as { email?: string };
    email = normalizeEmail(payload.email ?? "");
  } catch {
    return jsonResponse({ message: "Ugyldig forespørgsel." }, 400);
  }

  if (!isValidWaitlistEmail(email)) {
    return jsonResponse({ message: "Indtast en gyldig e-mailadresse." }, 400);
  }

  const query = new URLSearchParams({
    select: config.emailColumn,
    limit: "1",
    [config.emailColumn]: `eq.${email}`,
  });

  const duplicateResponse = await fetch(
    `${config.url}/rest/v1/${config.table}?${query.toString()}`,
    {
      headers: createSupabaseHeaders(config.serviceRoleKey, config.schema),
    },
  );

  if (!duplicateResponse.ok) {
    return jsonResponse({ message: "Ventelisten kunne ikke tjekkes lige nu." }, 502);
  }

  const existingRows = (await duplicateResponse.json()) as Array<Record<string, string>>;

  if (existingRows.length > 0) {
    return jsonResponse(
      { message: "Den e-mail er allerede skrevet op til ventelisten." },
      409,
    );
  }

  const insertPayload: Record<string, string> = {
    [config.emailColumn]: email,
  };

  if (config.sourceColumn) {
    insertPayload[config.sourceColumn] = config.sourceValue;
  }

  const insertResponse = await fetch(`${config.url}/rest/v1/${config.table}`, {
    method: "POST",
    headers: {
      ...createSupabaseHeaders(config.serviceRoleKey, config.schema, true),
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(insertPayload),
  });

  if (insertResponse.ok) {
    return jsonResponse(
      { message: "Du er skrevet op. Vi sender din invite code ved lancering." },
      200,
    );
  }

  const errorPayload = (await insertResponse.json().catch(() => null)) as
    | { code?: string; message?: string }
    | null;

  if (errorPayload?.code === "23505") {
    return jsonResponse(
      { message: "Den e-mail er allerede skrevet op til ventelisten." },
      409,
    );
  }

  return jsonResponse(
    { message: errorPayload?.message ?? "Kunne ikke skrive dig op lige nu." },
    502,
  );
}
