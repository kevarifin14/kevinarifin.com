// src/tools/client.ts
import { createHttpToolClient } from "@winstain/toolkit/client";
import { createToolHooks } from "@winstain/toolkit-react-query";
import type { ToolInput, ToolOutput } from "@winstain/toolkit/core";
import { schemas } from "@/tools/schemas"; // your generated/assembled schemas record

export const client = createHttpToolClient(schemas, { url: "/api/tools" });

export const { useToolQuery, useToolMutation } = createToolHooks(client);

export type ToolMethod = keyof typeof schemas & string;

export type ToolMutationProps<Name extends ToolMethod> = {
  params: ToolInput<(typeof schemas)[Name]>;
  className?: string;

  onSuccess?: (data: ToolOutput<(typeof schemas)[Name]>) => void;
  onError?: (error: Error) => void;

  invalidate?: ToolMethod[];
};

export type ToolQueryProps<Name extends ToolMethod> = {
  params: ToolInput<(typeof schemas)[Name]>;
  data?: ToolOutput<(typeof schemas)[Name]>;
  className?: string;
};