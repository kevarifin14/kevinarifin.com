import ReactMarkdown from 'react-markdown';

import Layout from 'components/Layout';
import PostFooter from 'components/PostFooter';
import RelatedFooter from 'components/RelatedFooter';
import { CodeBlock, LinkRenderer } from 'utils';
import { getContent, listContent } from 'utils/content-manager';

export default function Post({ content, frontmatter, relatedFrontmatters }) {
  const maxWidth = '708px';
  const { title, type, slug } = frontmatter;

  return (
    <>
      <Layout title={title} showLogo>

        <div className="markdown-body" style={{ maxWidth }}>

          {type == 'reading-notes'
            ? <img src={`/books/${slug}.jpg`} />
            : <h1 className="title">{title}</h1>}

          <ReactMarkdown
            escapeHtml={false}
            source={content}
            renderers={{ code: CodeBlock, link: LinkRenderer }}
          />
        </div>

        <PostFooter maxWidth={maxWidth} />
        <RelatedFooter related={relatedFrontmatters} maxWidth={maxWidth} />

      </Layout>

      <style jsx>
        {`
        .title {
          font-size: 2.5em;
          margin-block-start: 0;
          margin-block-end: 0;
        }
      `}
      </style>
    </>
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
