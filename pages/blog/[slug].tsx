import { getLayout } from 'components/Layout';
import NewsletterSection from 'components/NewsletterSection';
import PostSection from 'components/PostSection';
import { getContent, listContent } from 'utils/content-manager';

export default function PostPage({ content, frontmatter }) {
  const { title } = frontmatter;

  return (
    <main>
      <PostSection title={title} content={content} />
      <NewsletterSection className="border-t-2 border-gray-100" />
    </main>
  );
}

PostPage.getLayout = getLayout;

export async function getStaticProps({ params: { slug } }) {
  const { data: frontmatter, content } = getContent('blog', `${slug}.md`);
  const { related } = frontmatter;

  let relatedPosts = [];
  if (related) {
    const relatedPaths = related.split(',');

    relatedPosts = relatedPaths.map((relatedPath) => {
      const [contentDir, filename] = relatedPath.split('/');
      const { data: relatedFrontmatter } = getContent(contentDir, `${filename}.md`);
      return { ...relatedFrontmatter, contentType: contentDir };
    });
  }

  return { props: { content, frontmatter, relatedPosts } };
}

export async function getStaticPaths() {
  const markdownFilenames = listContent('blog');
  return {
    paths: markdownFilenames.map((filename) => ({
      params: { slug: filename },
    })),
    fallback: false,
  };
}
