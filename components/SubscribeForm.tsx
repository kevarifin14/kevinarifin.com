import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from 'components/Button';
import Input from 'components/Input';
import useNotifications from 'hooks/useNotifications';
import { post } from 'utils/http';

type SubscribeFormProps = {
  className?: string,
}

export default function SubscribeForm({ className }: SubscribeFormProps) {
  const { register, handleSubmit } = useForm();
  const { addSuccessNotification } = useNotifications();

  const handleSubscribe = async ({ email }) => {
    await post('/api/sendgrid/marketing/contacts', { email });

    addSuccessNotification({
      title: 'Thanks for subscribing!',
      description: email,
    });
  };

  return (
    <form
      className={[
        'grid', 'grid-cols-1fr-auto', 'sm:mx-auto', 'gap-2',
        className,
      ].join(' ')}
      onSubmit={handleSubmit(handleSubscribe)}
    >

      <div>
        <Input
          {...register('email')}
          placeholder="Your email"
        />
      </div>

      <Button type="primary" htmlType="submit">
        Subscribe
      </Button>

    </form>
  );
}