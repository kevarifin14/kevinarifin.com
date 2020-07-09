import Link from 'next/link';

import Layout from 'components/Layout';
import { formatDateString } from 'utils';

export default function Newsletters({ newsletters }) {
  return (
    <>
      <Layout title="Thought Bytes" showLogo>
        <div className="column">
          {newsletters.map(({ title, slug, date, excerpt }, i) => (

            <Link href="/tb/[slug]" as={`/tb/${slug}`}>
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
            Previous newsletters coming soon...
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

  const files = fs.readdirSync(`${process.cwd()}/content/newsletters`, "utf-8");

  const newsletters = files
    .filter((fn) => fn.endsWith(".md"))
    .map((fn) => {
      const path = `${process.cwd()}/content/newsletters/${fn}`;
      const rawContent = fs.readFileSync(path, {
        encoding: "utf-8",
      });
      const { data } = matter(rawContent);

      return { ...data, id: uuid() };
    })
    .sort((a, b) => b.slug - a.slug);

  return {
    props: { newsletters },
  };
}
