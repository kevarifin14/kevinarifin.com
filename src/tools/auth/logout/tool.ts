import { toolkit } from "@/tools/server";
import { authLogoutSchema } from "./schema";
import { createClient } from "../server";

export const authLogout = toolkit.createTool(authLogoutSchema, async () => {
  const supabase = await createClient();
  
  await supabase.auth.signOut();
  
  return { success: true };
});
