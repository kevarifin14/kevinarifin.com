import { Email, Box, Item, Image, renderEmail } from 'react-html-email'
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from 'utils';

import Layout from 'components/Layout';
import Subscribe from 'components/Subscribe';

export default function Newsletter({ content, frontmatter }) {
  const { slug } = frontmatter;
  const css = `
    html, body {
      font-family: Open Sans,-apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
        Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
        sans-serif;
      // max-width: 600px;
      // margin: 0 auto;
    }
    table {
      width: 100%;
      padding: 0 0.5em;
    }
    p {
      line-height: 1.5;
      font-size: 16px;
    }
    blockquote {
      border-left: solid black;
      padding: 0.01em 0 0.01em 1em;
      margin-left: 0;
    }
    img {
      max-width: 100%;
      margin-left: 0;
      margin-right: 0;
      margin-top: 0;
      padding-bottom: 0;
      padding-left: 0;
      padding-right: 0;
      padding-top: 0;
      margin-bottom: 1.45rem;
  }
  `;

  const email = (
    <Email headCSS={css}>
      <Box>
        {/* <Item>
          <a href={`https://www.kevinarifin.com/tb/${slug}`} style={{ color: 'black', textDecoration: 'none' }}>
            Open in browser
          </a>
        </Item> */}
        <Item>
          <a href="https://www.kevinarifin.com">
            <Image
              src={'https://kevinarifin.com/thought_bytes.png'}
              width="100%"
              style={{ marginBottom: '1em', marginTop: '1em' }}
            />
          </a>
        </Item>

        <Item>
          <div class="markdown-body" style={{ maxWidth: '600px', margin: 'auto' }}>
            <ReactMarkdown
              source={content}
              escapeHtml={false}
              renderers={{ code: CodeBlock }}
            />
         </div>
        </Item>

      </Box>
    </Email>
  );

  // console.log(renderEmail(email))

  return (
    <>
      <Layout title={frontmatter.title} showLogo>
        <div
          style={{ maxWidth: '600px', margin: 'auto' }}
          dangerouslySetInnerHTML={{ __html: renderEmail(email) }}
        />
        <div style={{
          width: '100%',
          marginTop: '1em',
          padding: '2em 0.5em',
          paddingBottom: '3em',
          borderTop:  '1px solid #eaeaea' }}>
          <div style={{ maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
            <h2>Aspiring to build your own startup?</h2>
            <p>
              Subscribe to Thought Bytes to get lessons from my journey as Edith's
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
    .readFileSync(path.join("content/newsletters/", slug + ".md"))
    .toString();
  const { data, content } = matter(markdownWithMetadata);
  const frontmatter = { ...data };

  return { props: { content, frontmatter } };
}

export async function getStaticPaths(context) {
  const fs = require("fs");

  const path = `${process.cwd()}/content/newsletters`;
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
