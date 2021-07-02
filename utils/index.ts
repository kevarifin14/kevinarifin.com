import moment from 'moment';

import { PostsDocument } from 'generated/graphql';

import { listContentMetadata } from './content-manager';
import { client } from './notion';

export function formatDateString(dateString) {
  const date = moment(dateString);
  return date.format('MMMM Do, YYYY');
}

export const getAllNewsletters = async () => {
  const markdownNewsletters = listContentMetadata('newsletters');
  const {
    data: {
      posts: {
        results: notionNewsletters,
      },
    },
  } = await client.query({ query: PostsDocument });

  const newsletters = [
    ...markdownNewsletters,
    ...notionNewsletters
      .map(({ slug, date: { start: date }, name: title }) => ({ title, date, slug })),
  ].sort(({ date: d1 }, { date: d2 }) => -1 * (moment(d1).unix() - moment(d2).unix()));

  return newsletters;
};

export default {};
