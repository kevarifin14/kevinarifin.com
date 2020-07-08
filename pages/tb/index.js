import Link from 'next/link';

import Layout from 'components/Layout';

export default function Newsletters({ newsletters }) {
  return (
    <>
      <Layout title="Thought Bytes" showLogo>
        <main>
          {newsletters.map(({ title, slug }) => (
            <Link href={`/tb/${slug}`}>{title}</Link>
          ))}
        </main>
      </Layout>
      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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
    });

  return {
    props: { newsletters },
  };
}
