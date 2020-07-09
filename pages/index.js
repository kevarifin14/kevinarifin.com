import Link from 'next/link';
import { useState } from 'react';

import Button from 'components/Button';
import Layout from 'components/Layout';

export default function Home({ newsletters }) {
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
        if (response.status == 201) {
          setMessage('Thanks for subscribing!');
        } else{
          setMessage(error);
        }
        setEmail('');
      });

  }

  return (
    <>
      <Layout title="Home">
        <main>
          <img src="/blue.svg" height={200} width={200} />
          <h1 className="title">
            Thought Bytes by Kevin Arifin
          </h1>

          <p className="description">
            I send out a weekly newsletter on becoming a technical co-founder
          </p>

          <form style={{ display: 'flex' }} onSubmit={handleSubscribe}>
            <input
              required={true}
              type="email"
              placeholder="Enter your email..."
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Button type="submit">
              Subscribe
            </Button>
          </form>
          {message && <p>{message}</p>}

          <span style={{ marginTop: '3em' }}>
            <Link href="/tb/[slug]" as={`/tb/${newsletters[0].slug}`}>
              <a>
                View the latest newsletter &rarr;
              </a>
            </Link>
          </span>

        </main>
      </Layout>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        input {
          font-size: 150%;
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

        input:focus {
          outline: none;
        }

        a {
          color: inherit;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 3rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.25rem;
        }

        .title,
        .description {
          text-align: center;
        }
      `}</style>
    </>
  )
}

export async function getStaticProps() {
  const fs = require("fs");
  const matter = require("gray-matter");
  const { v4: uuid } = require("uuid");

  const files = fs.readdirSync(`${process.cwd()}/content/newsletters`, "utf-8");

  const newsletters = files
    .filter((fn) => fn.endsWith(".md"))
    .map((fn) => {
      const path = `${process.cwd()}/content/newsletters/${fn}`;
      const rawContent = fs.readFileSync(path, {
        encoding: "utf-8",
      });
      const { data } = matter(rawContent);

      return { ...data, id: uuid() };
    })
    .sort((a, b) => b.slug - a.slug);

  return {
    props: { newsletters },
  };
}

