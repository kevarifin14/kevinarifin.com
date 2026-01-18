import { defineToolSchema } from "@/tools/shared";
import z from "zod";

export const authLoginSchema = defineToolSchema({
  name: "auth_login",
  description: "Login to the system",
  input: z.object({
    email: z.string().email(),
  }),
  output: z.object({
    email: z.string().email(),
  }),
});