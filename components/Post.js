import ReactMarkdown from 'react-markdown';

import { CodeBlock, LinkRenderer } from 'utils';

export default function Post({ title, content }) {
  return (
    <div className="markdown-body max-w-screen-md md:mx-auto mx-4">

      <h1>{title}</h1>

      <ReactMarkdown
        escapeHtml={false}
        source={content}
        renderers={{ code: CodeBlock, link: LinkRenderer }}
      />
    </div>
  );
}
