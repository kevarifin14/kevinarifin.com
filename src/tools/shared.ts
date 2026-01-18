import { z } from "zod";
import { AxiosError } from "axios";
import { logObject } from "@/lib/utils";
import { clientEnv } from "@/lib/env/client";
import { User } from "./user/models";
import { format } from "date-fns";

export type ToolSchema<
  I extends z.ZodObject<any> = z.ZodObject<any>,
  O extends z.ZodObject<any> = z.ZodObject<any>
> = {
  /**
   * Tool name (underscore_case); used for MCP names and
   * can be used for RPC routing as well.
   *
   * e.g. "user_session_list"
   */
  name: string;

  /** Human-readable description (used for docs, MCP, etc.). */
  description: string;

  /**
   * readOnly:
   * - false → mutating tool
   * - true or undefined → read-only tool (does not change server state)
   *
   * Used by:
   * - MCP: mark whether a tool should be treated as "safe" read-only or not
   */
  readOnly?: boolean;

  /** Zod schema for input payload. */
  input: I;

  /** Zod schema for output payload. */
  output: O;

  /** Optional instructions for LLM usage */
  instructions?: string;
};

export type ToolInput<TSchema extends ToolSchema> = z.infer<TSchema["input"]>;
export type ToolOutput<TSchema extends ToolSchema> = z.infer<TSchema["output"]>;

export const defineToolSchema = <
  TInput extends z.ZodObject<any>,
  TOutput extends z.ZodObject<any>
>(config: {
  name: string;
  description: string;
  readOnly?: boolean;
  input: TInput;
  output: TOutput;
  instructions?: string;
}): ToolSchema<TInput, TOutput> => {
  return {
    name: config.name,
    description: config.description,
    readOnly: config.readOnly,
    input: config.input,
    output: config.output,
    instructions: config.instructions,
  };
};

export interface ToolContext {
  user: User | null;
}

export type ToolHandler<TSchema extends ToolSchema> = (params: z.output<TSchema["input"]>, context?: ToolContext) => Promise<z.input<TSchema["output"]>>;

export const createTool = <TSchema extends ToolSchema>(
  schema: TSchema,
  handler: ToolHandler<TSchema>
): Tool<TSchema> => {
  return {
    schema,
    handler: async (
      params: z.infer<TSchema["input"]>,
      context?: ToolContext
    ): Promise<z.infer<TSchema["output"]>> => {
      try {
        const result = await handler(params, context);
        const parsedResult = schema.output.parse(result) as z.infer<
          TSchema["output"]
        >;

        if (clientEnv.NODE_ENV === "test") logObject(parsedResult);

        return parsedResult;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (clientEnv.NODE_ENV === "test") logObject(error.response?.data);
          throw new Error(
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to execute tool"
          );
        }

        if (error instanceof Error) {
          if (clientEnv.NODE_ENV === "test") logObject(error);
          throw new Error(error.message);
        }

        throw new Error("Failed to execute tool");
      }
    },
  };
};

export type Tool<TSchema extends ToolSchema = ToolSchema> = {
  schema: TSchema;
  handler: ToolHandler<TSchema>;
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