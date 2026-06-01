import { buildSupabaseError, fetchSupabaseRows } from "./supabaseRest";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://cfdyavdfnwkrhxopdmut.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_K7aRut6hWjbTjcK-xOEgwA_xhOaOno7";
const signupEndpoint = supabaseUrl ? `${supabaseUrl}/rest/v1/email_signups` : "";

export const isSignupConfigured = () => Boolean(supabaseUrl && supabaseAnonKey);

export const submitEmailSignup = async ({ email, name }) => {
  if (!isSignupConfigured()) {
    throw new Error("Signup backend not configured yet.");
  }

  const payload = {
    email,
    name: name?.trim() || null,
  };

  const response = await fetch(signupEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await buildSupabaseError(response);
  }
};

export const fetchEmailSignups = async () => {
  if (!isSignupConfigured()) {
    throw new Error("Signup backend not configured yet.");
  }

  return fetchSupabaseRows({
    endpoint: signupEndpoint,
    supabaseAnonKey,
    select: "id,email,name,created_at",
    order: "created_at.asc",
  });
};
