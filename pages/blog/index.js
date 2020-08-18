import moment from 'moment';
import { useState } from 'react';

import Layout from 'components/Layout';
import PostPreview from 'components/PostPreview';
import BlogFilter from 'components/BlogFilter';
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
    <>
      <Layout title="Blog" showLogo>
        <div className="max-w-screen-md mx-auto px-4">

          <div className="flex flex-wrap">
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

          {posts
            .filter(({ type }) => (filter == 'all' ? true : type == filter))
            .map(({
              title, slug, date, excerpt,
            }) => (
              <PostPreview
                title={title}
                type="blog"
                date={date}
                excerpt={excerpt}
                slug={slug}
              />
            ))}

          <p className="my-4">
            Moving previous posts soon...
          </p>

        </div>
      </Layout>
    </>
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
