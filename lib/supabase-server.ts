import "server-only";

import { createClient } from "@supabase/supabase-js";

function getSupabaseUrl() {
  const variableName = "NEXT_PUBLIC_SUPABASE_URL";
  const value = process.env[variableName]?.trim();

  if (!value) {
    throw new Error(
      `${variableName} is not configured. Set it to your Supabase project URL.`
    );
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(
      `${variableName} must be a valid absolute URL (for example, https://project-ref.supabase.co).`
    );
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`${variableName} must use the http or https protocol.`);
  }

  return value;
}

export function getSupabaseAdmin() {
  const url = getSupabaseUrl();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured. Set it to the server-only service role key."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function getSupabasePublic() {
  const url = getSupabaseUrl();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!anonKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured. Set it to the project anon key."
    );
  }
  return createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
