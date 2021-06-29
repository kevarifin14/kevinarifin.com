import ReactMarkdown from 'react-markdown';

import CodeBlock from './CodeBlock';
import MarkdownLink from './MarkdownLink';

type MarkdownProps = {
  source: string
};

export default function Markdown({ source }: MarkdownProps) {
  return (
    <ReactMarkdown
      escapeHtml={false}
      className="max-w-screen-md w-full prose mx-auto"
      source={source}
      renderers={{ code: CodeBlock, link: MarkdownLink }}
    />
  );
}
