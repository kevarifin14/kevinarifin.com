import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

import Layout from 'components/Layout';
import { CodeBlock, LinkRenderer } from 'utils';
import Subscribe from 'components/Subscribe';

export default function About({ content }) {
  return (
    <Layout title="About" showLogo>
      <div className="markdown-body" style={{ maxWidth: '700px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="/kevin.jpg" className="circle-img" />
        </div>

        <ReactMarkdown
          escapeHtml={false}
          source={content}
          renderers={{ code: CodeBlock, link: LinkRenderer }}
        />

        <div style={{
          display: 'flex', justifyContent: 'center', maxWidth: '400px', textAlign: 'center', margin: 'auto',
        }}
        >
          <h3>
            Get my newsletter on becoming a technical co-founder
            <span role="img" aria-label="point-down">👇</span>
          </h3>
        </div>
        <Subscribe />
        <br />

      </div>
      <style jsx>
        {`
        .circle-img {
          border-radius: 50%;
          height: 200px;
          width: 200px;
        }
      `}
      </style>
    </Layout>
  );
}

export async function getStaticProps() {
  const markdownWithMetadata = fs
    .readFileSync(path.join('content', 'about.md'))
    .toString();
  const { content } = matter(markdownWithMetadata);

  return { props: { content } };
}
