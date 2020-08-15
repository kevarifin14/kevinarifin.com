import moment from 'moment';

import Layout from 'components/Layout';
import PostPreview from 'components/PostPreview';
import { listContentMetadata } from 'utils/content-manager';

export default function Newsletters({ newsletters }) {
  return (
    <>
      <Layout title="Thought Bytes" showLogo>
        <div className="max-w-screen-md mx-auto px-4">
          {newsletters.map(({ slug, date, excerpt }) => (
            <PostPreview
              title={`Thought Bytes #${slug}`}
              type="tb"
              date={date}
              excerpt={excerpt}
              slug={slug}
            />
          ))}

          <p className="my-4">
            Previous newsletters coming soon...
          </p>

        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const newsletters = listContentMetadata('newsletters');
  const newslettersByDate = newsletters.sort(({ date: date1 }, { date: date2 }) => (
    -1 * (moment(date1) - moment(date2))
  ));

  return { props: { newsletters: newslettersByDate } };
}
