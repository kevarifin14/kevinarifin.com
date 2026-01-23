import { User } from "./user/models";
import { format } from "date-fns";

export interface ToolContext {
  user: User | null;
}

/**
 * Require an authenticated Prisma user from the tool context.
 * Throws an error if the user is not authenticated.
 * 
 * @param context - The tool context (may be undefined)
 * @returns The authenticated Prisma user
 * @throws {Error} If context or user is missing
 * 
 * @example
 * ```ts
 * const user = requireUser(context);
 * const userId = user.id; // Prisma user ID
 * ```
 */
export function requireUser(context?: ToolContext): User {
  if (!context?.user) {
    throw new Error("Unauthorized: Authentication required");
  }

  return context.user;
}

export const displayDate = (date: Date) => {
  return format(date, "yyyy-MM-dd");
}

export const displayDateTime = (date: Date) => {
  return format(date, "yyyy-MM-dd HH:mm:ss");
}