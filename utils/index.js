import moment from 'moment';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export const colors = {
  blue: 'rgb(95, 144, 213)',
  twitterBlue: 'rgb(0, 172, 238)',
};

export function formatDateString(dateString) {
  const date = moment(dateString);
  return date.format('MMMM Do, YYYY');
}

export const CodeBlock = ({ language, value }) => (
  <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>
);

export const LinkRenderer = ({ href, children }) => (
  <a href={href} target="_blank" rel="noreferrer">{children}</a>
);