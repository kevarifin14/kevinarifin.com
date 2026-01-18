import { defineToolSchema } from "@/tools/shared";
import z from "zod";

export const authRefreshSchema = defineToolSchema({
  name: "auth_refresh",
  description: "Refresh access token using refresh token",
  input: z.object({
    refreshToken: z.string(),
  }),
  output: z.object({
    accessToken: z.string().optional(),
    refreshToken: z.string().optional(),
  }),
});

