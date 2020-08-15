import Link from 'next/link';

import Layout from 'components/Layout';
import Subscribe from 'components/Subscribe';
import { listContent } from 'utils/content-manager';
import { fadeIn } from 'utils/sal-props';
import useSal from 'hooks/useSal';

export default function Home({ latestNewsletterSlug }) {
  useSal();
  return (
    <>
      <Layout title="Home">
        <div className="pb-20 flex flex-grow flex-col items-center justify-center" {...fadeIn}>

          <img src="/blue.svg" className="h-40 w-40" />

          <h1 className="text-5xl text-center sm:m-0 mx-4">
            Thought Bytes by Kevin Arifin
          </h1>

          <p className="text-xl mb-8 text-center sm:mx-0 mx-4">
            I send out a weekly newsletter on becoming a technical co-founder
          </p>

          <Subscribe />

          <span className="mt-12">
            <Link href="/tb/[slug]" as={`/tb/${latestNewsletterSlug}`}>
              <a className="hover:underline text-black no-underline">
                View the latest newsletter &rarr;
              </a>
            </Link>
          </span>

        </div>

      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const filenames = listContent('newsletters');
  const latestNewsletterSlug = Math.max(...filenames.map((filename) => parseInt(filename, 10)));

  return { props: { latestNewsletterSlug } };
}
