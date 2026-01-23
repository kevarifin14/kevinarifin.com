import { defineToolSchema } from "@winstain/toolkit/core";
import z from "zod";

export const authVerifySchema = defineToolSchema({
  name: "auth_verify",
  description: "Verify OTP",
  input: z.object({
    email: z.string().email(),
    token: z.string(),
  }),
  output: z.object({
    accessToken: z.string().optional(),
    refreshToken: z.string().optional(),
  }),
});