import {
  Email, Box, Item, Image, renderEmail,
} from 'react-html-email';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import Layout from 'components/Layout';
import PostFooter from 'components/PostFooter';
import { CodeBlock } from 'utils';
import { getContent, listContent } from 'utils/content-manager';

export default function Newsletter({ content, frontmatter, latestNewsletterSlug }) {
  const { title, slug, type } = frontmatter;

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
    p, li, i {
      line-height: 1.5;
      font-size: 16px;
    }
    blockquote {
      border-left: solid black;
      padding-left: 1em;
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
      margin-bottom: 1rem;
  }
  `;

  const reflect = 'Reflect editions of Thought Bytes feature a deep-dive into lessons from building Edith as the technical co-founder.';
  const build = 'Build editions of Thought Bytes feature a technical post that will help you build the skills to quickly get a product off the ground and in the hands of customers.';
  const learn = 'Learn editions of Thought Bytes feature books, articles, podcasts, and ideas that make you a well-rounded founder.';

  let intro;
  if (type == 'reflect') {
    intro = reflect;
  } else if (type == 'build') {
    intro = build;
  } else if (type == 'learn') {
    intro = learn;
  } else {
    intro = 'This is an original edition of Thought Bytes. The first 55 newsletters were the first iteration covering thought-provoking articles, podcasts, and books as well as updates on my journey to start Edith.';
  }

  const email = (
    <Email headCSS={css} title={title}>
      <Box>

        <Item>
          <a href={`https://kevinarifin.com/tb/${slug}`}>
            <Image
              src={type == 'original' ? '/thought_bytes_original.png' : 'https://kevinarifin.com/thought_bytes.png'}
              width="100%"
              style={{ marginBottom: '1em', marginTop: '1em' }}
            />
          </a>
        </Item>

        <Item>
          <i>
            {intro}
            {' '}
            You can find all past newsletters
            {' '}
            <a href="https://kevinarifin.com/tb">here</a>
            .
          </i>
        </Item>

        <Item>
          <div className="markdown-body">
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

  return (
    <>
      <Layout title={`Thought Bytes #${slug}`} showLogo>
        <div className="max-w-screen-sm flex flex-col sm:mx-auto mx-4">

          <div dangerouslySetInnerHTML={{ __html: renderEmail(email) }} />

          <div className="flex justify-between py-4">

            {slug - 1 > 43
              ? (
                <Link href={`/tb/${slug - 1}`}>
                  <a>
                    &larr; TB #
                    {slug - 1}
                  </a>
                </Link>
              ) : <span />}

            {slug + 1 <= latestNewsletterSlug
            && (
            <Link href={`/tb/${slug + 1}`}>
              <a>
                TB #
                {slug + 1}
                {' '}
                &rarr;
              </a>
            </Link>
            )}

          </div>

        </div>

        <PostFooter className="max-w-screen-sm" />
      </Layout>
    </>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const { content, data: frontmatter } = getContent('newsletters', `${slug}.md`);
  const filenames = listContent('newsletters');
  const latestNewsletterSlug = Math.max(...filenames.map((filename) => parseInt(filename, 10)));

  return { props: { content, frontmatter, latestNewsletterSlug } };
}

export async function getStaticPaths() {
  const markdownFilenames = listContent('newsletters');
  return {
    paths: markdownFilenames.map((filename) => ({ params: { slug: filename } })),
    fallback: false,
  };
}
