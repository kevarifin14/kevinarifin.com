import { createTool } from "@/tools/shared";
import { authLogoutSchema } from "./schema";
import { createClient } from "../server";

export const authLogout = createTool(authLogoutSchema, async () => {
  const supabase = await createClient();
  
  await supabase.auth.signOut();
  
  return { success: true };
});
