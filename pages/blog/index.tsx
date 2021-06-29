import moment from 'moment';
import { useState } from 'react';

import BlogFilter from 'components/BlogFilter';
import { getLayout } from 'components/Layout';
import PostCard from 'components/PostCard';
import Section from 'components/Section';
import { listContentMetadata } from 'utils/content-manager';

export default function BlogPage({ posts }) {
  const [filter, setFilter] = useState('all');

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Essays', value: 'essay' },
    { label: 'Technical', value: 'technical' },
    { label: 'Books', value: 'books' },
  ];

  return (
    <Section>
      <div className="py-8">

        <div className="flex flex-wrap pb-8">
          {filters.map(({ label, value }) => (
            <BlogFilter
              className="mr-2 my-1 sm:my-0"
              active={filter === value}
              label={label}
              onClick={() => setFilter(value)}
            />
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-x-4 lg:gap-y-8">
          {posts
            .filter(({ type }) => (filter === 'all' ? true : type === filter))
            .map((post) => <PostCard post={post} contentType="blog" />)}
        </div>

      </div>
    </Section>
  );
}

BlogPage.getLayout = getLayout;

export async function getStaticProps() {
  const posts = listContentMetadata('blog');
  const postsByDate = posts
    .filter(({ type }) => type !== 'draft');
  return {
    props: { posts: postsByDate },
  };
}
