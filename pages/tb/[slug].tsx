import { getLayout } from 'components/Layout';
import NewsletterSection from 'components/NewsletterSection';
import PostSection from 'components/PostSection';
import { getContent, listContent } from 'utils/content-manager';

export default function NewsletterPage({ content, frontmatter }) {
  const { slug } = frontmatter;

  return (
    <main>
      <PostSection title={`Thought Bytes #${slug}`} content={content} />
      <NewsletterSection className="border-t-2 border-gray-100" />
    </main>
  );
}

NewsletterPage.getLayout = getLayout;

export async function getStaticProps({ params: { slug } }) {
  const { content, data: frontmatter } = getContent('newsletters', `${slug}.md`);
  const filenames = listContent('newsletters');
  const latestNewsletterSlug = Math.max(...filenames.map((filename) => parseInt(filename, 10)));

  return { props: { content, frontmatter, latestNewsletterSlug } };
}

export async function getStaticPaths() {
  const markdownFilenames = listContent('newsletters');
  return {
    paths: markdownFilenames.map((filename) => ({ params: { slug: filename } })),
    fallback: false,
  };
}
