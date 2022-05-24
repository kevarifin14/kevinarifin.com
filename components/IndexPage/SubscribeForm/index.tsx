import { useAddUserMutation } from "generated";
import { useToggle } from "hooks/useToggle";
import { useForm } from "react-hook-form";

import { Button } from "components/Button";
import { Input } from "components/Input";
import { renderNotification } from "components/Notification";

import { classNames, TailwindSize } from "lib/tailwind";

type SubscribeFormProps = {
  size?: TailwindSize;
  className?: string;
  onSuccess?: () => void;
  cta?: string;
};

type SubscribeFormFields = {
  email: string;
};

export function SubscribeForm({
  cta = "Subscribe",
  size,
  className,
  onSuccess,
}: SubscribeFormProps) {
  const [loading, toggleLoading] = useToggle();

  const [addUser] = useAddUserMutation({
    onCompleted: () => {
      renderNotification({
        title: "Successfully subscribed",
        description: "Gr8 Success",
      });
      onSuccess && onSuccess();
    },
    onError: () => {
      renderNotification({
        title: "There was a problem",
        description: "You may have already subscribed",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscribeFormFields>();

  const subscribeFormClassName = classNames(
    "flex space-y-2 sm:space-y-0 sm:space-x-4 sm:flex-row flex-col items-start",
    className
  );

  const handleSubscribe = async ({ email }: SubscribeFormFields) => {
    toggleLoading();
    try {
      await addUser({ variables: { email } });
    } catch (e) {
      console.log(e);
    }
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
        {cta}
      </Button>
    </form>
  );
}
