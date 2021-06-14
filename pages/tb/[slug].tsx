import Link from 'next/link';

import { getLayout } from 'components/Layout';
import Markdown from 'components/Markdown';
import { getContent, listContent } from 'utils/content-manager';

export default function NewsletterPage({ content, frontmatter, latestNewsletterSlug }) {
  const { slug, type } = frontmatter;

  return (
    <div>

      <div className="max-w-prose flex flex-col mx-auto py-8 space-y-4">

        <img
          alt="newsletter-logo"
          src={type === 'original' ? '/thought_bytes_original.png' : '/thought_bytes.png'}
        />

        <Markdown source={content} />

        <div className="flex justify-between py-4">

          {slug - 1 >= 35
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

    </div>
  );
}

NewsletterPage.getLayout = getLayout;

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
