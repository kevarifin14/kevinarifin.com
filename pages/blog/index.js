import Link from 'next/link';

import Layout from 'components/Layout';
import { formatDateString } from 'utils';

export default function Newsletters({ newsletters }) {
  return (
    <>
      <Layout title="Blog" showLogo>
        <div className="column">
          {newsletters.map(({ title, slug, date, excerpt }, i) => (

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

      <style jsx>{`
        .column {
          max-width: 750px;
          margin: 0 auto;
          padding: 1em;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const fs = require("fs");
  const matter = require("gray-matter");
  const { v4: uuid } = require("uuid");

  const files = fs.readdirSync(`${process.cwd()}/content/blog`, "utf-8");

  const newsletters = files
    .filter((fn) => fn.endsWith(".md"))
    .map((fn) => {
      const path = `${process.cwd()}/content/blog/${fn}`;
      const rawContent = fs.readFileSync(path, {
        encoding: "utf-8",
      });
      const { data } = matter(rawContent);

      return { ...data, id: uuid() };
    })
    .filter(({ type }) => type != 'draft');

  return {
    props: { newsletters },
  };
}
