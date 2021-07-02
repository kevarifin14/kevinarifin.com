import _ from 'lodash';
import moment from 'moment';
import Link from 'next/link';

import { getLayout } from 'components/Layout';
import NewsletterSection from 'components/NewsletterSection';
import Section from 'components/Section';
import { NewsletterPageDocument, PostsDocument } from 'generated/graphql';
import { listContentMetadata } from 'utils/content-manager';
import { client } from 'utils/notion';

export default function NewslettersPage({ newsletters, content }) {
  const newslettersByYear = _.groupBy(newsletters, ({ date }) => moment(date).year());

  return (
    <main>
      <NewsletterSection content={content} />

      <Section className="flex flex-col items-center py-16">
        <div className="text-center space-y-2 pb-8">
          <h2>All Newsletters</h2>
          <p>
            Read past issues of my newsletter
          </p>
        </div>

        <div className="grid max-w-3xl w-full mx-auto gap-1 lg:grid-cols-auto-auto-1fr lg:gap-4 lg:items-center">
          {Object.entries(newslettersByYear)
            .sort((a, b) => parseInt(b[0], 10) - parseInt(a[0], 10))
            .map(([year, thisYearsNewsletters]) => (
              <>
                {thisYearsNewsletters.map(({ slug, title, date }, i) => (
                  <>
                    {i === 0 ? <p className="font-bold pt-4">{year}</p> : <span />}

                    <p className={`text-sm text-gray-500 ${i === 0 ? 'lg:pt-4' : ''}`}>
                      {moment(date).format('MMM D')}
                    </p>

                    <div className={`${i === 0 ? 'lg:pt-4' : ''}`}>
                      <Link href={`/newsletter/${slug}`}>
                        <a className="border-transparent font-bold">
                          {title}
                        </a>
                      </Link>
                    </div>
                  </>
                ))}
              </>
            ))}
        </div>

      </Section>

    </main>
  );
}

NewslettersPage.getLayout = getLayout;

export async function getStaticProps() {
  const newslettersMarkdown = listContentMetadata('newsletters');

  const { data } = await client.query({ query: PostsDocument });

  const { data: { pages } } = await client.query({ query: NewsletterPageDocument });
  const content = pages.results[0].blocks.results.map(({ markdown }) => markdown).join('\n');

  const newsletters = [
    ...newslettersMarkdown,
    ...data.posts.results
      .map(({ date: { start }, slug, name }) => ({ date: start, slug, title: name })),
  ];

  return { props: { newsletters, content } };
}
