import { ToolMutationProps, useToolMutation } from "@/tools/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToolInput } from "@/tools/shared";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { authVerifySchema } from "@/tools/auth/verify/schema";
import { TokenFormField } from "./token-form-field";
import { userRetrieveSchema } from "@/tools/user/retrieve/schema";
import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";

export function VerifyForm({ params, className, onSuccess }: ToolMutationProps<typeof authVerifySchema>) {
  const form = useForm<ToolInput<typeof authVerifySchema>>({
    resolver: zodResolver(authVerifySchema.input),
    defaultValues: params
  });

  const verifyMutation = useToolMutation(authVerifySchema, {
    onSuccess,
    invalidateQueries: [userRetrieveSchema],
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data);
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