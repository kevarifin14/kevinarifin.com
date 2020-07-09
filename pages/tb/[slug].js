import { A, Email, Box, Item, Image } from 'react-html-email'

import Layout from 'components/Layout';
import renderEmail from 'react-html-email/lib/renderEmail';

export default function Newsletter({ newsletter }) {
  const { content } = newsletter;

  const css = `
    html, body {
      font-family: Open Sans,-apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
        Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
        sans-serif;
    }
    table {
      width: 100%;
      padding: 0 0.5em;
    }
    p {
      line-height: 1.4em;
    }
    blockquote {
      border-left: solid black;
      padding: 0.01em 0 0.01em 1em;
      margin: 0;
    }
  `;

  const email = (
    <Email headCSS={css}>
      <Box>
        <Item>
          <Image
            src={'https://www.kevinarifin.com/thought_bytes.png'}
            width="100%"
            style={{ marginBottom: '1em' }}
          />
        </Item>

        <Item>
          <section dangerouslySetInnerHTML={{ __html: content }} />
        </Item>

      </Box>
    </Email>
  );

  return (
    <>
      <Layout title={`Thought Bytes #${newsletter.slug}`} showLogo>
        <div
          style={{ maxWidth: '600px', margin: 'auto' }}
          dangerouslySetInnerHTML={{ __html: renderEmail(email) }}
        />
      </Layout>
    </>
  )
}

export async function getStaticProps(context) {
  const fs = require("fs");
  const html = require("remark-html");
  const highlight = require("remark-highlight.js");
  const unified = require("unified");
  const markdown = require("remark-parse");
  const matter = require("gray-matter");

  const slug = context.params.slug; // get slug from params
  const path = `${process.cwd()}/content/newsletters/${slug}.md`;

  const rawContent = fs.readFileSync(path, { encoding: "utf-8" });

  const { data, content } = matter(rawContent); // pass rawContent to gray-matter to get data and content

  const result = await unified()
    .use(markdown)
    .use(highlight) // highlight code block
    .use(html)
    .process(content); // pass content to process

  return {
    props: {
      newsletter: {
        ...data,
        content: result.toString(),
      }
    },
  };
}

// generate HTML paths at build time
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
