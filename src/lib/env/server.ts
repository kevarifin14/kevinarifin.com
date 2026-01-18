import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export const serverEnv = serverEnvSchema.parse(process.env);

