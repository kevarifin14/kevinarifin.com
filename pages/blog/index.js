import moment from 'moment';
import { useState } from 'react';

import BlogFilter from 'components/BlogFilter';
import Page from 'components/Page';
import PostCard from 'components/PostCard';
import { listContentMetadata } from 'utils/content-manager';

export default function Blog({ posts }) {
  const [filter, setFilter] = useState('all');

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Essays', value: 'essay' },
    { label: 'Technical', value: 'technical' },
    { label: 'Books', value: 'books' },
  ];

  return (
    <Page title="Blog">
      <div className="py-8">

        <div className="flex flex-wrap pb-8">
          {filters.map(({ label, value }) => (
            <BlogFilter
              className="mr-2 my-1 sm:my-0"
              active={filter}
              value={value}
              label={label}
              onClick={() => setFilter(value)}
            />
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-x-4 lg:gap-y-8">
          {posts
            .filter(({ type }) => (filter == 'all' ? true : type == filter))
            .map((post) => <PostCard post={post} contentType="blog" />)}
        </div>

      </div>
    </Page>
  );
}

export async function getStaticProps() {
  const posts = listContentMetadata('blog');
  const postsByDate = posts
    .filter(({ type }) => type != 'draft')
    .sort(({ date: date1 }, { date: date2 }) => (
      -1 * (moment(date1) - moment(date2))
    ));

  return {
    props: { posts: postsByDate },
  };
}
