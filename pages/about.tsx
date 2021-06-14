import ReactMarkdown from 'react-markdown';

import { getLayout } from 'components/Layout';
import Markdown from 'components/Markdown';
import SubscribeForm from 'components/SubscribeForm';
import { getContent } from 'utils/content-manager';

export default function AboutPage({ content }) {
  return (
    <div>
      <div className="py-8 space-y-8">
        <div className="flex justify-center">
          <img alt="kevin" src="/kevin.jpg" className="rounded-full h-48 w-48" />
        </div>

        <Markdown source={content} />

        <div className="flex flex-col justify-center max-w-lg text-center mx-auto mb-8 space-y-4">
          <h3>
            Get my newsletter on becoming a technical co-founder
            <span role="img" aria-label="point-down">👇</span>
          </h3>
          <SubscribeForm className="max-w-sm mx-auto" />
        </div>

      </div>
    </div>
  );
}

AboutPage.getLayout = getLayout;

export async function getStaticProps() {
  const { content } = getContent('', 'about.md');
  return { props: { content } };
}
