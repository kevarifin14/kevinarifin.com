import { createTool } from "@/tools/shared";
import { authRefreshSchema } from "./schema";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { clientEnv } from "@/lib/env/client";

export const authRefresh = createTool(authRefreshSchema, async (params) => {
  // Create a Supabase client for token refresh
  const supabase = createSupabaseClient(
    clientEnv.SUPABASE_URL,
    clientEnv.SUPABASE_PUBLISHABLE_KEY
  );

  // Use refreshSession to get new tokens
  const { data, error } = await supabase.auth.refreshSession({
    refresh_token: params.refreshToken,
  });

  if (error) throw Error(error.message);

  // Ensure we always return both tokens if session exists
  // Supabase rotates refresh tokens, so the new refresh token must be saved
  const accessToken = data.session?.access_token;
  const refreshToken = data.session?.refresh_token;

  if (!accessToken) {
    throw Error("No access token returned from refresh");
  }

  // Log warning if refresh token is missing (unusual but might happen)
  if (!refreshToken) {
    console.warn("Refresh token not returned from Supabase - token rotation may be disabled");
  }

  return {
    accessToken,
    refreshToken: refreshToken || undefined,
  };
});

