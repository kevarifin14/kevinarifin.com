import ReactMarkdown from 'react-markdown';

import Layout from 'components/Layout';
import PostFooter from 'components/PostFooter';
import RelatedFooter from 'components/RelatedFooter';
import { CodeBlock, LinkRenderer } from 'utils';
import { getContent, listContent } from 'utils/content-manager';

export default function Post({ content, frontmatter, relatedFrontmatters }) {
  const { title, type, slug } = frontmatter;

  return (
    <Layout title={title} showLogo>

      <div className="markdown-body max-w-screen-md md:mx-auto mx-4">

        {type == 'books'
          ? <img src={`/books/${slug}.jpg`} />
          : <h1>{title}</h1>}

        <ReactMarkdown
          escapeHtml={false}
          source={content}
          renderers={{ code: CodeBlock, link: LinkRenderer }}
        />
      </div>

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
