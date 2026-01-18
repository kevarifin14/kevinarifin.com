import { ToolMutationProps, useToolMutation } from "@/tools/client";
import { authLoginSchema } from "@/tools/auth/login/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToolInput } from "@/tools/shared";
import { Form, FormControl, FormItem, FormLabel, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";

export function LoginForm({ params, className, onSuccess }: ToolMutationProps<typeof authLoginSchema>) {
  const form = useForm<ToolInput<typeof authLoginSchema>>({
    resolver: zodResolver(authLoginSchema.input),
    defaultValues: params
  });

  const authLoginMutation = useToolMutation(authLoginSchema, {
    onSuccess,
  });

  const onSubmit = (data: ToolInput<typeof authLoginSchema>) => {
    authLoginMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={authLoginMutation.isPending}>{authLoginMutation.isPending ? <Spinner /> : "Login"}</Button>
      </form>
    </Form>
  );
}