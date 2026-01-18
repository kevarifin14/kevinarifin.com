import { FormField } from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";

export function EmailFormField({ form }: { form: UseFormReturn<any> }) {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => <Input {...field} />}
    />
  );
}