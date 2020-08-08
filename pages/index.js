import Link from 'next/link';

import Layout from 'components/Layout';
import Subscribe from 'components/Subscribe';
import { listContent } from 'utils/content-manager';

export default function Home({ latestNewsletterSlug }) {
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
            <Link href="/tb/[slug]" as={`/tb/${latestNewsletterSlug}`}>
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
  const filenames = listContent('newsletters');
  const latestNewsletterSlug = Math.max(...filenames.map((filename) => parseInt(filename, 10)));

  return { props: { latestNewsletterSlug } };
}
