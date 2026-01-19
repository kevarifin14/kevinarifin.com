import z from "zod";

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  verified: z.boolean(),
});

export type User = z.infer<typeof userSchema>;