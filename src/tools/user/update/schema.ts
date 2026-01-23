import { z } from "zod";
import { defineToolSchema } from "@winstain/toolkit/core";
import { userSchema } from "../models";

export const userUpdateSchema = defineToolSchema({
  name: "user_update",
  description: "Update the current authenticated user's first name and last name.",
  input: z.object({
    firstName: z.string().nullable().optional().describe("The user's first name. Set to null to clear the value, or omit to leave unchanged."),
    lastName: z.string().nullable().optional().describe("The user's last name. Set to null to clear the value, or omit to leave unchanged."),
  }),
  output: userSchema,
});
