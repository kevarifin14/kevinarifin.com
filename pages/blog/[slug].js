import ReactMarkdown from 'react-markdown';
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Layout from 'components/Layout';
import Subscribe from 'components/Subscribe';
import { CodeBlock, LinkRenderer } from 'utils';

export default function Blog({ content, frontmatter }) {
  // const { content, title } = blog;
  const { title } = frontmatter;

  return (
    <>
      <Layout title={title} showLogo>

        <div className="markdown-body" style={{ maxWidth: '708px' }}>
          <ReactMarkdown
            escapeHtml={false}
            source={content}
            renderers={{ code: CodeBlock, link: LinkRenderer }}
          />
        </div>

        <div style={{ width: '100%', paddingTop: '2em', paddingBottom: '3em', paddingLeft: '0.5em', paddingRight: '0.5em', marginTop: '1em', borderTop:  '1px solid #eaeaea' }}>
          <div style={{ maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
            <h2>Aspiring to build your own startup?</h2>
            <p>
              Subscribe to Thought Bytes to get lessons from my journey building Edith as the
              technical co-founder delivered straight to your inbox every Thursday.
            </p>
          </div>
          <Subscribe />
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMetadata = fs
    .readFileSync(path.join("content/blog/", slug + ".md"))
    .toString();
  const { data, content } = matter(markdownWithMetadata);
  const frontmatter = { ...data };

  return { props: { content, frontmatter } };
}

export async function getStaticPaths(context) {
  const fs = require("fs");

  const path = `${process.cwd()}/content/blog`;
  const files = fs.readdirSync(path, "utf-8");

  const markdownFileNames = files
    .filter((fn) => fn.endsWith(".md"))
    .map((fn) => fn.replace(".md", ""));

  return {
    paths: markdownFileNames.map((fileName) => {
      return {
        params: {
          slug: fileName,
        },
      };
    }),
    fallback: false,
  };
}
