import Link from 'next/link';

import { getLayout } from 'components/Layout';
import Markdown from 'components/Markdown';
import Section from 'components/Section';
import SubscribeForm from 'components/SubscribeForm';
import { HomePageDocument } from 'generated/graphql';
import { listContentMetadata } from 'utils/content-manager';
import { client } from 'utils/notion';

export default function HomePage({ page, posts, newsletters }) {
  return (
    <main>

      <Section className="grid lg:grid-cols-2 py-16 gap-32">
        <div>
          <Markdown source={page.blocks.results.map(({ markdown }) => markdown).join('\n')} />
        </div>

        <div className="space-y-16 w-full mx-auto">

          <div className="space-y-8 text-lg">
            <h3>Read the latest article</h3>

            {posts.slice(0, 3).map(({ title, slug }) => <p><Link href={`/blog/${slug}`}><a>{title}</a></Link></p>)}
          </div>

          <div className="space-y-8 text-lg">
            <h3>Check out the latest newsletter</h3>

            {newsletters.slice(0, 3).map(({ title, slug }) => <p><Link href={`/tb/${slug}`}><a>{title}</a></Link></p>)}
          </div>
        </div>

      </Section>

      <Section color="bg-gray-100" className="py-16">
        <div className="max-w-lg bg-white p-12 mx-auto space-y-8">
          <h3 className="text-center">Get my latest posts straight in your inbox</h3>
          <SubscribeForm />
        </div>
      </Section>

    </main>
  );
}

HomePage.getLayout = getLayout;

export async function getStaticProps() {
  const { data } = await client.query({ query: HomePageDocument });
  const posts = listContentMetadata('blog').filter(({ type }) => type !== 'draft');
  const newsletters = listContentMetadata('newsletters').filter(({ type }) => type !== 'draft');

  return { props: { page: data.pages.results[0], posts, newsletters } };
}
