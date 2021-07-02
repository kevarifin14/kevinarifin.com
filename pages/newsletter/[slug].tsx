import { getLayout } from 'components/Layout';
import NewsletterSection from 'components/NewsletterSection';
import PostSection from 'components/PostSection';
import { NewsletterPageDocument, PostBySlugDocument, PostsDocument } from 'generated/graphql';
import { getAllNewsletters } from 'utils';
import { getContent, listContent, listContentMetadata } from 'utils/content-manager';
import { client } from 'utils/notion';

export default function NewsletterPage({
  title, date, content, newsletterSectionContent,
}) {
  return (
    <main>
      <PostSection title={title} date={date} content={content} />
      <NewsletterSection
        content={newsletterSectionContent}
        className="border-t-2 border-gray-100"
      />
    </main>
  );
}

NewsletterPage.getLayout = getLayout;

export async function getStaticProps({ params: { slug } }) {
  const { data: { pages } } = await client.query({ query: NewsletterPageDocument });
  const newsletterSectionContent = pages.results[0].blocks.results.map(({ markdown }) => markdown).join('\n');

  try {
    const { content, data: frontmatter } = getContent('newsletters', `${slug}.md`);
    const { title, date } = frontmatter;

    return {
      props: {
        title, date, content, newsletterSectionContent,
      },
    };
  } catch (e) {
    const { data } = await client.query({ query: PostBySlugDocument, variables: { slug } });
    const [post] = data.posts.results;

    const { name: title, date: { start: date } } = post;
    const content = post.blocks.results.map(({ markdown }) => markdown).join('\n');

    return {
      props: {
        title, date, content, newsletterSectionContent,
      },
    };
  }
}

export async function getStaticPaths() {
  const newsletters = await getAllNewsletters();
  return {
    paths: newsletters.map(({ slug }) => ({ params: { slug: `${slug}` } })),
    fallback: false,
  };
}
