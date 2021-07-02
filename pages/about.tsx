import { getLayout } from 'components/Layout';
import Markdown from 'components/Markdown';
import NewsletterSection from 'components/NewsletterSection';
import Section from 'components/Section';
import { AboutPageDocument, NewsletterPageDocument } from 'generated/graphql';
import { client } from 'utils/notion';

export default function AboutPage({ content, newsletterSectionContent }) {
  return (
    <main>
      <Section className="py-16">
        <div className="flex justify-center">
          <img alt="kevin" src="/kevin.jpg" className="rounded-full h-48 w-48" />
        </div>

        <Markdown>{content}</Markdown>
      </Section>

      <NewsletterSection content={newsletterSectionContent} />
    </main>
  );
}

AboutPage.getLayout = getLayout;

export async function getStaticProps() {
  const { data: { pages } } = await client.query({ query: NewsletterPageDocument });
  const newsletterSectionContent = pages.results[0].blocks.results.map(({ markdown }) => markdown).join('\n');

  const { data } = await client.query({ query: AboutPageDocument });
  const content = data.pages.results[0].blocks.results.map(({ markdown }) => markdown).join('\n');

  return { props: { content, newsletterSectionContent } };
}
