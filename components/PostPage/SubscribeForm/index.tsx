import { useAddUserMutation } from "generated";
import { useToggle } from "hooks/useToggle";
import { useForm } from "react-hook-form";

import { Button } from "components/Button";
import { Input } from "components/Input";
import { renderNotification } from "components/Notification";

import { classNames, TailwindSize } from "lib/tailwind";

type SubscribeFormProps = {
  className?: string;
  size: TailwindSize;
};

type SubscribeFormFields = {
  email: string;
};

export function SubscribeForm({ className, size }: SubscribeFormProps) {
  const [loading, toggleLoading] = useToggle();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscribeFormFields>();
  const [addUser] = useAddUserMutation({
    onCompleted: (data) =>
      renderNotification({
        title: "Successfully subscribed",
        description: `Your email ${data?.user?.email} has been added to the mailing list`,
      }),
    onError: () =>
      renderNotification({
        title: "There was a problem",
        description:
          "There was a problem adding your email. You may have already subscribed.",
      }),
  });

  const subscribeFormClassName = classNames(
    "flex space-y-2 sm:space-y-0 sm:space-x-4 sm:flex-row flex-col items-start",
    className
  );

  const handleSubscribe = async ({ email }: SubscribeFormFields) => {
    toggleLoading();
    await addUser({ variables: { email } });
    toggleLoading();
  };

  return (
    <form
      className={subscribeFormClassName}
      onSubmit={handleSubmit(handleSubscribe)}
    >
      <Input
        error={errors.email}
        placeholder="Enter your email"
        type="email"
        {...register("email", { required: true })}
        size={size}
      />
      <Button
        loading={loading}
        type="primary"
        htmlType="submit"
        className="flex-shrink-0 w-full sm:w-fit"
        size={size}
      >
        Subscribe
      </Button>
    </form>
  );
}
