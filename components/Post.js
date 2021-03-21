import ReactMarkdown from 'react-markdown';

import { CodeBlock, LinkRenderer } from 'utils';

export default function Post({ title, content }) {
  return (
    <div className="prose max-w-prose mx-auto prose-indigo py-8">

      <h1>{title}</h1>

      <ReactMarkdown
        escapeHtml={false}
        source={content}
        renderers={{ code: CodeBlock, link: LinkRenderer }}
      />
    </div>
  );
}
