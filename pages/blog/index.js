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
    { label: 'Reading Notes', value: 'reading-notes' },
  ];

  return (
    <>
      <Layout title="Blog" showLogo>
        <div className="column">
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {filters.map(({ label, value }) => (
              <BlogFilter
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

          <p>
            Moving previous posts soon...
          </p>

        </div>
      </Layout>

      <style jsx>
        {`
        .column {
          max-width: 750px;
          margin: 0 auto;
          padding: 1em;
        }
      `}
      </style>
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
