import { useForm } from 'react-hook-form';

import Button from 'components/Button';
import Input from 'components/Input';
import useNotifications from 'hooks/useNotifications';
import { classNames } from 'utils/tailwind';

type SubscribeFormProps = {
  className?: string,
}

export default function SubscribeForm({ className }: SubscribeFormProps) {
  const { register, handleSubmit } = useForm();
  const { addSuccessNotification } = useNotifications();

  const handleSubscribe = ({ email }) => {
    addSuccessNotification({
      title: 'Thanks for subscribing!',
      description: email,
    });
  };

  return (
    <form
      className={classNames([
        'grid', 'grid-cols-1fr-auto', 'sm:mx-auto', 'gap-4',
        className,
      ])}
      onSubmit={handleSubmit(handleSubscribe)}
    >

      <Input
        {...register('email')}
        placeholder="Your email"
      />

      <Button type="primary" htmlType="submit">
        Subscribe
      </Button>

    </form>
  );
}
