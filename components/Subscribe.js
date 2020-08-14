import { useState } from 'react';

import Button from 'components/Button';

export default function Subscribe({ className }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState();

  const handleSubscribe = (e) => {
    e.preventDefault();

    fetch('/api/subscribe', {
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
      .then((response) => {
        if (response.status == 201) {
          setMessage('Thanks for subscribing!');
          setEmail('');
        }
      });
  };

  return (
    <form
      className={[
        'grid sm:grid-cols-1fr-auto grid-cols-1 mx-auto',
        className,
      ].join(' ')}
      onSubmit={handleSubscribe}
    >

      <input
        className="outline-none text-xl col-span-1 sm:mr-2 mb-2 sm:mb-0 rounded-none border-b border-solid bg-transparent border-black"
        required
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <Button className="col-span-1 " type="submit">
        Subscribe
      </Button>

      <div className="flex flex-center">
        {message && <p>{message}</p>}
      </div>

    </form>

  );
}
