import { useState } from 'react';

import Button from 'components/Button';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState();

  const handleSubscribe = (e) => {
    e.preventDefault();

    fetch('/api/subscribe', {
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    })
      .then((response) => {
        const { error } = await response.json();
        if (response.status == 201) {
          setMessage('Thanks for subscribing!');
        }
        if (error) {
          setMessage(error);
        }
        setEmail('');
      });
  }

  return (
    <>
      <form style={{ display: 'flex', justifyContent: 'center' }} onSubmit={handleSubscribe}>
        <input
          required={true}
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Button type="submit">
          Subscribe
        </Button>
      </form>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {message && <p>{message}</p>}
      </div>

      <style jsx>{`
        input:focus {
          outline: none;
        }

        input {
          font-size: 120%;
          background: transparent;
          border: none;
          border-bottom: 1px solid;
          border-radius: 0;
          margin-right: 0.5em;
        }

        @media only screen and (max-width: 600px) {
          input {
            font-size: 120%;
            width: 80%;
          }
        }
      `}</style>
    </>
  );
}
