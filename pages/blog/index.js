import Link from 'next/link';
import fs from 'fs';
import matter from 'gray-matter';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

import Layout from 'components/Layout';
import { formatDateString } from 'utils';
import BlogFilter from 'components/BlogFilter';

export default function Blog({ newsletters }) {
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
          {filters.map(({ label, value }) => (
            <BlogFilter
              active={filter}
              value={value}
              label={label}
              onClick={() => setFilter(value)}
            />
          ))}

          {newsletters
            .filter(({ type }) => (filter == 'all' ? true : type == filter))
            .map(({
              title, slug, date, excerpt,
            }) => (
              <Link href="/blog/[slug]" as={`/blog/${slug}`}>
                <div style={{ cursor: 'pointer' }}>
                  <h2>
                    {`${formatDateString(date)} - ${title}`}
                  </h2>

                  <p>{excerpt}</p>

                  <hr />

                </div>
              </Link>
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
  const files = fs.readdirSync(`${process.cwd()}/content/blog`, 'utf-8');

  const newsletters = files
    .filter((fn) => fn.endsWith('.md'))
    .map((fn) => {
      const path = `${process.cwd()}/content/blog/${fn}`;
      const rawContent = fs.readFileSync(path, {
        encoding: 'utf-8',
      });
      const { data } = matter(rawContent);

      return { ...data, id: uuid() };
    })
    .filter(({ type }) => type != 'draft')
    .sort(({ date: date1 }, { date: date2 }) => -1 * (moment(date1) - moment(date2)));

  return {
    props: { newsletters },
  };
}
