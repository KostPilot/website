import { isValidWaitlistEmail, normalizeEmail } from "../../src/lib/waitlist";

type WaitlistEnv = {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  SUPABASE_WAITLIST_TABLE?: string;
  SUPABASE_WAITLIST_EMAIL_COLUMN?: string;
  SUPABASE_WAITLIST_SOURCE_COLUMN?: string;
  SUPABASE_WAITLIST_SOURCE_VALUE?: string;
  SUPABASE_SCHEMA?: string;
  RATE_LIMITING_ENABLED?: string;
  RATE_LIMIT_REQUESTS?: string;
  RATE_LIMIT_WINDOW_MS?: string;
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

const ipRateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request) {
  const cfIp = request.headers.get("CF-Connecting-IP");

  if (cfIp) {
    return cfIp;
  }

  const forwarded = request.headers.get("x-forwarded-for");

  if (!forwarded) {
    return "unknown";
  }

  return forwarded.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(
  ip: string,
  limit: number,
  windowMs: number,
) {
  const now = Date.now();
  const current = ipRateLimitStore.get(ip);

  if (!current || now >= current.resetAt) {
    ipRateLimitStore.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  current.count += 1;

  if (current.count > limit) {
    return true;
  }

  return false;
}

function shouldApplyRateLimit(env: WaitlistEnv) {
  return (env.RATE_LIMITING_ENABLED ?? "true").toLowerCase() !== "false";
}

function getRateLimitConfig(env: WaitlistEnv) {
  const parsedLimit = Number.parseInt(env.RATE_LIMIT_REQUESTS ?? "5", 10);
  const parsedWindow = Number.parseInt(env.RATE_LIMIT_WINDOW_MS ?? "60000", 10);

  return {
    limit: Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : 5,
    windowMs: Number.isFinite(parsedWindow) && parsedWindow > 0 ? parsedWindow : 60000,
  };
}

function jsonResponse(body: Record<string, unknown>, status: number) {
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
  try {
    const config = getSupabaseConfig(env);

  // Best-effort in-function throttle. Keep Cloudflare dashboard rate limiting enabled too.
  if (shouldApplyRateLimit(env)) {
    const clientIp = getClientIp(request);
    const { limit, windowMs } = getRateLimitConfig(env);

    if (isRateLimited(clientIp, limit, windowMs)) {
      return jsonResponse(
        { message: "For mange forespørgsler. Prøv igen om lidt." },
        429,
      );
    }
  }

  console.log("WAITLIST CONFIG CHECK", {
    hasUrl: !!config.url,
    hasServiceRoleKey: !!config.serviceRoleKey,
    urlPrefix: config.url ? config.url.slice(0, 30) : null,
  });

  if (!config.url || !config.serviceRoleKey) {
    return new Response(
      JSON.stringify({
        message: "Ventelisten er ikke konfigureret endnu.",
        hasUrl: !!config.url,
        hasServiceRoleKey: !!config.serviceRoleKey,
        urlPrefix: config.url ? config.url.slice(0, 30) : null,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      },
    );
  }

    const supabaseUrl = config.url;
    const serviceRoleKey = config.serviceRoleKey;

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
      `${supabaseUrl}/rest/v1/${config.table}?${query.toString()}`,
      {
        headers: createSupabaseHeaders(serviceRoleKey, config.schema),
      },
    );

    if (!duplicateResponse.ok) {
      const duplicateRawBody = await duplicateResponse.text();

      return jsonResponse(
        {
          message: "Ventelisten kunne ikke tjekkes lige nu.",
          status: duplicateResponse.status,
          statusText: duplicateResponse.statusText,
          supabaseError: duplicateRawBody,
        },
        502,
      );
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

    const sourceColumn = config.sourceColumn;
    if (sourceColumn) {
      insertPayload[sourceColumn as string] = config.sourceValue;
    }

    const insertResponse = await fetch(`${supabaseUrl}/rest/v1/${config.table}`, {
      method: "POST",
      headers: {
        ...createSupabaseHeaders(serviceRoleKey, config.schema, true),
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

    const insertRawBody = await insertResponse.text();
    let errorPayload: { code?: string; message?: string } | null = null;

    if (insertRawBody) {
      try {
        errorPayload = JSON.parse(insertRawBody) as { code?: string; message?: string };
      } catch {
        errorPayload = null;
      }
    }

    if (errorPayload?.code === "23505") {
      return jsonResponse(
        {
          message: "Den e-mail er allerede skrevet op til ventelisten.",
          status: insertResponse.status,
          statusText: insertResponse.statusText,
          supabaseError: insertRawBody,
        },
        409,
      );
    }

    return jsonResponse(
      {
        message: (errorPayload?.message ?? insertRawBody) || "Kunne ikke skrive dig op lige nu.",
        status: insertResponse.status,
        statusText: insertResponse.statusText,
        supabaseError: insertRawBody,
      },
      502,
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    return jsonResponse(
      {
        message: "Uventet fejl i waitlist endpoint.",
        status: 502,
        supabaseError: errorMessage,
      },
      502,
    );
  }
}
