import BookPost from 'components/BookPost';
import NewsletterSection from 'components/NewsletterSection';
import Page from 'components/Page';
import Post from 'components/Post';
import RelatedSection from 'components/RelatedSection';
import { getContent, listContent } from 'utils/content-manager';

export default function PostPage({ content, frontmatter, relatedPosts }) {
  const { title, type, slug } = frontmatter;

  return (
    <Page title={title}>

      {type == 'books'
        ? <BookPost slug={slug} content={content} />
        : <Post title={title} content={content} />}

      {relatedPosts?.length > 0
        && <RelatedSection className="border-t-2 border-gray-100" posts={relatedPosts} />}

      <NewsletterSection className="border-t-2 border-gray-100" />

    </Page>
  );
}

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
