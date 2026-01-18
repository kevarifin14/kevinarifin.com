import { createTool } from "@/tools/shared";
import { authVerifySchema } from "./schema";
import { createClient } from "../server";

export const authVerify = createTool(authVerifySchema, async (params) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.verifyOtp({
    email: params.email,
    token: params.token,
    type: "email",
  });

  if (error) throw Error(error.message);

  return {
    accessToken: data.session?.access_token,
    refreshToken: data.session?.refresh_token,
  };
});