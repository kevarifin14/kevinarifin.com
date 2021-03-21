import moment from 'moment';

import NewsletterSection from 'components/NewsletterSection';
import Page from 'components/Page';
import PostCard from 'components/PostCard';
import { listContentMetadata } from 'utils/content-manager';

export default function Newsletters({ newsletters }) {
  return (
    <Page title="Thought Bytes">

      <NewsletterSection className="border-b-2 border-gray-100" />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-x-4 lg:gap-y-8 py-8">
        {newsletters.map((post) => <PostCard post={post} contentType="tb" />)}
      </div>
    </Page>
  );
}

export async function getStaticProps() {
  const newsletters = listContentMetadata('newsletters');
  const newslettersByDate = newsletters.sort(({ date: date1 }, { date: date2 }) => (
    -1 * (moment(date1) - moment(date2))
  ));

  return { props: { newsletters: newslettersByDate } };
}
