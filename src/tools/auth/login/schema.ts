import { defineToolSchema } from "@winstain/toolkit/core";
import z from "zod";

export const authLoginSchema = defineToolSchema({
  name: "auth_login",
  description: "Login to the system",
  input: z.object({
    email: z.string(),
  }),
  output: z.object({
    email: z.string(),
  }),
});