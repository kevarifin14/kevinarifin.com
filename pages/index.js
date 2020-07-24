import Link from 'next/link';
import fs from 'fs';
import matter from 'gray-matter';
import { v4 as uuid } from 'uuid';

import Layout from 'components/Layout';
import Subscribe from 'components/Subscribe';

export default function Home({ newsletters }) {
  return (
    <>
      <Layout title="Home">
        <main>

          <img src="/blue.svg" height={150} width={150} style={{ marginBottom: 0 }} />

          <h1 className="title">
            Thought Bytes by Kevin Arifin
          </h1>

          <p className="description">
            I send out a weekly newsletter on becoming a technical co-founder
          </p>

          <Subscribe />

          <span style={{ marginTop: '3em' }}>
            <Link href="/tb/[slug]" as={`/tb/${newsletters[0].slug}`}>
              <a>
                View the latest newsletter &rarr;
              </a>
            </Link>
          </span>

        </main>
      </Layout>

      <style jsx>
        {`
        main {
          padding: 0rem 0 5em 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        .title {
          font-size: 3rem;
          margin-block-start: 0;
          margin-block-end: 0;
        }

        .description {
          font-size: 1.25rem;
        }

        .title, .description {
          text-align: center;
        }
      `}
      </style>
    </>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(`${process.cwd()}/content/newsletters`, 'utf-8');

  const newsletters = files
    .filter((fn) => fn.endsWith('.md'))
    .map((fn) => {
      const path = `${process.cwd()}/content/newsletters/${fn}`;
      const rawContent = fs.readFileSync(path, {
        encoding: 'utf-8',
      });
      const { data } = matter(rawContent);

      return { ...data, id: uuid() };
    })
    .sort((a, b) => b.slug - a.slug);

  return {
    props: { newsletters },
  };
}
