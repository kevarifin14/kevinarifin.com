import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

export function TokenFormField({ form }: { form: UseFormReturn<any> }) {
  return (
    <FormField
      control={form.control}
      name="token"
      render={({ field }) => (
        <FormItem>
          <FormLabel>OTP</FormLabel>

          <FormControl>
            <InputOTP
              maxLength={8}
              value={field.value}
              onChange={(value) => field.onChange(value)}
            >
              <InputOTPGroup>
                {Array.from({ length: 8 }).map((_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
