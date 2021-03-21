import Link from 'next/link';

import Page from 'components/Page';
import SubscribeForm from 'components/SubscribeForm';
import { listContent } from 'utils/content-manager';

export default function Home({ latestNewsletterSlug }) {
  return (
    <Page title="Home">

      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center sm:px-6 space-y-8 py-8 sm:py-16">

        <img src="/blue.svg" className="h-40 w-40" />

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl text-center text-gray-800">
            Thought Bytes by Kevin Arifin
          </h1>

          <p className="text-lg sm:text-xl text-center text-gray-600">
            I send out a weekly newsletter on becoming a technical co-founder
          </p>
        </div>

        <SubscribeForm />

        <Link href="/tb/[slug]" as={`/tb/${latestNewsletterSlug}`}>
          <a className="text-gray-900 no-underline hover:underline">
            View the latest newsletter &rarr;
          </a>
        </Link>

      </div>

    </Page>
  );
}

export async function getStaticProps() {
  const filenames = listContent('newsletters');
  const latestNewsletterSlug = Math.max(...filenames.map((filename) => parseInt(filename, 10)));

  return { props: { latestNewsletterSlug } };
}
