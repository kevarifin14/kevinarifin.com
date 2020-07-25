import fs from 'fs';
import matter from 'gray-matter';
import { v4 as uuid } from 'uuid';

import Layout from 'components/Layout';
import PostPreview from 'components/PostPreview';

export default function Newsletters({ newsletters }) {
  return (
    <>
      <Layout title="Thought Bytes" showLogo>
        <div className="column">
          {newsletters.map(({ slug, date, excerpt }) => (
            <PostPreview
              title={`Thought Bytes #${slug}`}
              type="tb"
              date={date}
              excerpt={excerpt}
              slug={slug}
            />
          ))}

          <p>
            Previous newsletters coming soon...
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
  const files = fs.readdirSync(`${process.cwd()}/content/newsletters`, 'utf-8');

  const newsletters = files
    .filter((fn) => fn.endsWith('.md'))
    .map((fn) => {
      const path = `${process.cwd()}/content/newsletters/${fn}`;
      const rawContent = fs.readFileSync(path, {
        encoding: 'utf-8',
      });
      const { data } = matter(rawContent);

      return { ...data, id: uuid() };
    })
    .sort((a, b) => b.slug - a.slug);

  return {
    props: { newsletters },
  };
}
