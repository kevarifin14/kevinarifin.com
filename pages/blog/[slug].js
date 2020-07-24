import ReactMarkdown from 'react-markdown';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import Layout from 'components/Layout';
import { CodeBlock, LinkRenderer } from 'utils';
import PostFooter from 'components/PostFooter';

export default function Blog({ content, frontmatter }) {
  const { title, type, slug } = frontmatter;

  return (
    <>
      <Layout title={title} showLogo>

        <div className="markdown-body" style={{ maxWidth: '708px' }}>

          {type == 'reading-notes'
            ? <img src={`/books/${slug}.jpg`} />
            : <h1 className="title">{title}</h1>}

          <ReactMarkdown
            escapeHtml={false}
            source={content}
            renderers={{ code: CodeBlock, link: LinkRenderer }}
          />
        </div>

        <PostFooter />

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
  const markdownWithMetadata = fs
    .readFileSync(path.join('content/blog/', `${slug}.md`))
    .toString();
  const { data, content } = matter(markdownWithMetadata);
  const frontmatter = { ...data };

  return { props: { content, frontmatter } };
}

export async function getStaticPaths() {
  const blogPath = `${process.cwd()}/content/blog`;
  const files = fs.readdirSync(blogPath, 'utf-8');

  const markdownFileNames = files
    .filter((fn) => fn.endsWith('.md'))
    .map((fn) => fn.replace('.md', ''));

  return {
    paths: markdownFileNames.map((fileName) => ({
      params: {
        slug: fileName,
      },
    })),
    fallback: false,
  };
}
