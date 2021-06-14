import BookPost from 'components/BookPost';
import { getLayout } from 'components/Layout';
import NewsletterSection from 'components/NewsletterSection';
import Post from 'components/Post';
import { getContent, listContent } from 'utils/content-manager';

export default function PostPage({ content, frontmatter, relatedPosts }) {
  const { title, type, slug } = frontmatter;

  return (
    <div>

      {type === 'books'
        ? <BookPost slug={slug} content={content} />
        : <Post title={title} source={content} />}

      <NewsletterSection className="border-t-2 border-gray-100" />

    </div>
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
