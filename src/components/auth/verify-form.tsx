import { ToolMutationProps, useToolMutation } from "@/tools/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { authVerifySchema } from "@/tools/auth/verify/schema";
import { TokenFormField } from "./token-form-field";
import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";
import { ToolInput } from "@winstain/toolkit/core";

export function VerifyForm({ params, className, onSuccess }: ToolMutationProps<"auth_verify">) {
  const form = useForm<ToolInput<typeof authVerifySchema>>({
    resolver: zodResolver(authVerifySchema.input),
    defaultValues: params
  });

  const verifyMutation = useToolMutation("auth_verify", {
    onSuccess,
    invalidate: ["user_retrieve"],
  });

  const handleSubmit = form.handleSubmit((data) => {
    verifyMutation.mutate(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
        <TokenFormField form={form} />
        <Button type="submit" className="w-full" disabled={verifyMutation.isPending}>{verifyMutation.isPending ? <Spinner /> : "Verify"}</Button>
      </form>
    </Form>
  );
}