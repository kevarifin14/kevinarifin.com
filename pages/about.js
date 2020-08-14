import ReactMarkdown from 'react-markdown';

import Layout from 'components/Layout';
import { CodeBlock, LinkRenderer } from 'utils';
import { getContent } from 'utils/content-manager';
import Subscribe from 'components/Subscribe';

export default function About({ content }) {
  return (
    <Layout title="About" showLogo>
      <div className="markdown-body max-w-screen-md">
        <div className="flex justify-center">
          <img src="/kevin.jpg" className="rounded-full h-48 w-48" />
        </div>

        <ReactMarkdown
          escapeHtml={false}
          source={content}
          renderers={{ code: CodeBlock, link: LinkRenderer }}
        />

        <div className="flex flex-col justify-center max-w-lg text-center mx-auto mb-8">
          <h3>
            Get my newsletter on becoming a technical co-founder
            <span role="img" aria-label="point-down">👇</span>
          </h3>
          <Subscribe className="max-w-sm mx-auto" />
        </div>

      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { content } = getContent('', 'about.md');
  return { props: { content } };
}
