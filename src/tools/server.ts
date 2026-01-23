import { createToolkit } from "@winstain/toolkit/server";
import { User } from "./user/models";

/**
 * Server-only toolkit instance for creating tools.
 * This is separated from tools.ts to avoid circular dependencies during build.
 */
export const toolkit = createToolkit<{ user: User | null }>();
