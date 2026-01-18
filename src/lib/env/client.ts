import { z } from "zod";

const clientEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  SUPABASE_URL: z.string().url(),
  SUPABASE_PUBLISHABLE_KEY: z.string(),
});

export const clientEnv = clientEnvSchema.parse({
  NODE_ENV: (process.env.NODE_ENV as "development" | "production" | "test") || "development",

  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
});

