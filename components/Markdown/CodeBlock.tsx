import { ReactNode } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

type CodeBlockProps = {
  language: string,
  value: ReactNode,
}

export default function CodeBlock({ language, value }: CodeBlockProps) {
  return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>;
}
