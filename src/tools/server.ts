import { createToolkit } from "@winstain/toolkit/server";

import { User } from "./user/models";

export interface ToolContext {
  user: User | null;
}

export const toolkit = createToolkit<ToolContext>();

export function requireUser(context?: ToolContext): User {
  if (!context?.user) {
    throw new Error("Unauthorized: Authentication required");
  }

  return context.user;
}