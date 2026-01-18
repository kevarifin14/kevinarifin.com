import { defineToolSchema } from "@/tools/shared";
import z from "zod";

export const authLogoutSchema = defineToolSchema({
  name: "auth_logout",
  description: "Logout from the system",
  input: z.object({}),
  output: z.object({
    success: z.boolean(),
  }),
});
