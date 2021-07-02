import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

// import CodeBlock from './CodeBlock';

type MarkdownProps = {
  title?: string,
  date?: string,
  children: string
};

export default function Markdown({ title, date, children }: MarkdownProps) {
  return (
    <div className="max-w-screen-md w-full mx-auto">

      {(title || date) && (
        <div className="space-y-4 pb-8">
          {title && <h1 className="text-4xl md:text-5xl">{title}</h1>}
          {date && <p className="text-sm">{`Kevin Arifin | ${moment(date).format('LL')}`}</p>}
        </div>
      )}

      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        className="prose w-full max-w-screen-md"
        linkTarget="_blank"
        // components={{
        //   code: CodeBlock,
        // }}
      >
        {children}
      </ReactMarkdown>

    </div>
  );
}
