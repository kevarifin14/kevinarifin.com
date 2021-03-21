import ReactMarkdown from 'react-markdown';

import Page from 'components/Page';
import SubscribeForm from 'components/SubscribeForm';
import { CodeBlock, LinkRenderer } from 'utils';
import { getContent } from 'utils/content-manager';

export default function About({ content }) {
  return (
    <Page title="About">
      <div className="py-8 space-y-8">
        <div className="flex justify-center">
          <img src="/kevin.jpg" className="rounded-full h-48 w-48" />
        </div>

        <div className="markdown-body max-w-screen-sm">
          <ReactMarkdown
            escapeHtml={false}
            source={content}
            renderers={{ code: CodeBlock, link: LinkRenderer }}
          />
        </div>

        <div className="flex flex-col justify-center max-w-lg text-center mx-auto mb-8 space-y-4">
          <h3>
            Get my newsletter on becoming a technical co-founder
            <span role="img" aria-label="point-down">👇</span>
          </h3>
          <SubscribeForm className="max-w-sm mx-auto" />
        </div>

      </div>
    </Page>
  );
}

export async function getStaticProps() {
  const { content } = getContent('', 'about.md');
  return { props: { content } };
}
