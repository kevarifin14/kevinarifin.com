import { useState } from 'react';

import Button from 'components/Button';
import Input from 'components/Input';
import useNotifications from 'hooks/useNotifications';

export default function SubscribeForm({ className }) {
  const { addSuccessNotification } = useNotifications();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();

    global.analytics?.identify(email, { email });

    addSuccessNotification({
      title: 'Thanks for subscribing!',
      description: email,
    });
  };

  return (
    <form
      className={[
        'grid', 'grid-cols-1fr-auto', 'sm:mx-auto',
        className,
      ].join(' ')}
      onSubmit={handleSubscribe}
    >

      <Input
        required
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <Button type="submit">
        Subscribe
      </Button>

    </form>
  );
}
