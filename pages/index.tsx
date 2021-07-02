import Link from 'next/link';

import { getLayout } from 'components/Layout';
import Markdown from 'components/Markdown';
import NewsletterSection from 'components/NewsletterSection';
import Section from 'components/Section';
import SubscribeForm from 'components/SubscribeForm';
import { HomePageDocument, NewsletterPageDocument } from 'generated/graphql';
import { getAllNewsletters } from 'utils';
import { listContentMetadata } from 'utils/content-manager';
import { client } from 'utils/notion';

export default function HomePage({
  page, posts, newsletters, newsletterSectionContent,
}) {
  return (
    <main>

      <Section className="grid lg:grid-cols-2 py-16 gap-32">

        <Markdown>
          {page.blocks.results.map(({ markdown }) => markdown).join('\n')}
        </Markdown>

        <div className="space-y-16 w-full mx-auto">

          <div className="space-y-8 text-lg">
            <h3>Read the latest article</h3>

            {posts.slice(0, 3).map(({ title, slug }) => <p><Link href={`/blog/${slug}`}><a>{title}</a></Link></p>)}
          </div>

          <div className="space-y-8 text-lg">
            <h3>Check out the latest newsletter</h3>

            {newsletters.slice(0, 3).map(({ title, slug }) => <p><Link href={`/newsletter/${slug}`}><a>{title}</a></Link></p>)}
          </div>
        </div>

      </Section>

      <NewsletterSection content={newsletterSectionContent} />

    </main>
  );
}

HomePage.getLayout = getLayout;

export async function getStaticProps() {
  const { data: { pages } } = await client.query({ query: NewsletterPageDocument });
  const newsletterSectionContent = pages.results[0].blocks.results.map(({ markdown }) => markdown).join('\n');

  const { data } = await client.query({ query: HomePageDocument });
  const posts = listContentMetadata('blog').filter(({ type }) => type !== 'draft');
  const newsletters = await getAllNewsletters();

  return {
    props: {
      page: data.pages.results[0], posts, newsletters, newsletterSectionContent,
    },
  };
}
