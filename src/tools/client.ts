import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ToolSchema, ToolInput, ToolOutput, parseToolOutput } from "@winstain/toolkit/core";

export type ToolProps<TSchema extends ToolSchema = ToolSchema> = {
  params: ToolInput<TSchema>;
  data?: ToolOutput<TSchema>;
  className?: string;
};

export type ToolMutationProps<TSchema extends ToolSchema = ToolSchema> = ToolProps<TSchema> & {
  onSuccess?: (data: ToolOutput<TSchema>) => void;
  onError?: (error: Error) => void;
  invalidateQueries?: TSchema[];
};

/**
 * Helper function to call a tool via the API.
 * React Query handles in-memory caching automatically.
 * Server supports ETag/304 responses for read-only tools to reduce egress.
 * 
 * @param schema - The tool schema
 * @param params - The input parameters for the tool
 * @returns The tool output (parsed)
 */
export async function callTool<TSchema extends ToolSchema = ToolSchema>(
  schema: TSchema,
  params: ToolInput<TSchema>,
): Promise<ToolOutput<TSchema>> {
  try {
    const response = await axios.post(`/api/tools`, {
      method: schema.name,
      params,
    });

    return parseToolOutput(response.data, schema.output);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
    }
    throw error;
  }
}

export const useToolQuery = <TSchema extends ToolSchema>(
  schema: TSchema,
  params: ToolInput<TSchema>,
  options?: {
    enabled?: boolean;
    initialData?: ToolOutput<TSchema>;
    refetchInterval?: number | false;
  }
) => {
  return useQuery<ToolOutput<TSchema>>({
    queryKey: [schema.name, params],
    queryFn: () => callTool(schema, params),
    enabled: options?.enabled ?? true,
    initialData: options?.initialData,
    refetchInterval: options?.refetchInterval,
    staleTime: options?.initialData ? Infinity : undefined,
    refetchOnMount: options?.initialData ? false : undefined,
    refetchOnWindowFocus: options?.initialData ? false : undefined,
    retry: false
  });
};

export const useToolMutation = <TSchema extends ToolSchema>(
  schema: TSchema,
  options?: {
    onSuccess?: (data: ToolOutput<TSchema>) => void;
    onError?: (error: Error) => void;
    invalidateQueries?: ToolSchema[];
  }
) => {
  const queryClient = useQueryClient();

  return useMutation<ToolOutput<TSchema>, Error, ToolInput<TSchema>>({
    mutationFn: (params: ToolInput<TSchema>) => callTool(schema, params),
    onSuccess: (data) => {
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach((query) => {
          queryClient.invalidateQueries({ queryKey: [query.name] });
        });
      }

      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
