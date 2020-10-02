import BookPost from 'components/BookPost';
import Layout from 'components/Layout';
import Post from 'components/Post';
import PostFooter from 'components/PostFooter';
import RelatedFooter from 'components/RelatedFooter';
import { getContent, listContent } from 'utils/content-manager';

export default function PostPage({ content, frontmatter, relatedFrontmatters }) {
  const { title, type, slug } = frontmatter;

  return (
    <Layout title={title} showLogo>

      {type == 'books'
        ? <BookPost slug={slug} content={content} />
        : <Post title={title} content={content} />}

      <PostFooter className="max-w-screen-md" />
      <RelatedFooter className="max-w-screen-md" related={relatedFrontmatters} />

    </Layout>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const { data: frontmatter, content } = getContent('blog', `${slug}.md`);
  const { related } = frontmatter;

  let relatedFrontmatters = [];
  if (related) {
    const relatedPaths = related.split(',');

    relatedFrontmatters = relatedPaths.map((relatedPath) => {
      const [contentDir, filename] = relatedPath.split('/');
      const { data: relatedFrontmatter } = getContent(contentDir, `${filename}.md`);
      return { ...relatedFrontmatter, contentType: contentDir };
    });
  }

  return { props: { content, frontmatter, relatedFrontmatters } };
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
