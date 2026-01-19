import { createTool } from "@/tools/shared";
import { authLoginSchema } from "./schema";
import { createClient } from "../server";

export const authLogin = createTool(authLoginSchema, async (params) => {
  const supabase = await createClient();

  await supabase.auth.signInWithOtp({
    email: params.email,
    options: { shouldCreateUser: true },
  });

  return { email: params.email };
});