import { z } from "zod";
import { defineToolSchema } from "@/tools/shared";
import { userSchema } from "../models";

export const userRetrieveSchema = defineToolSchema({
  name: "user_retrieve",
  description: "Retrieve the current authenticated user's profile information including their group.",
  input: z.object({}),
  output: userSchema,
  readOnly: true,
});

