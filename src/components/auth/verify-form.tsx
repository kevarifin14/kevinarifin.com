import { ToolMutationProps, useToolMutation } from "@/tools/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToolInput } from "@/tools/shared";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { authVerifySchema } from "@/tools/auth/verify/schema";
import { TokenFormField } from "./token-form-field";
import { userRetrieveSchema } from "@/tools/user/retrieve/schema";

export function VerifyForm({ params, onSuccess }: ToolMutationProps<typeof authVerifySchema>) {
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
      <form onSubmit={handleSubmit}>
        <TokenFormField form={form} />
        <Button type="submit">Verify</Button>
      </form>
    </Form>
  );
}