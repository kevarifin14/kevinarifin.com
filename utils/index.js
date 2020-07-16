import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import moment from 'moment';

export const colors = {
  blue: 'rgb(106, 152, 220)',
  twitterBlue: 'rgb(0, 172, 238)',
}

export function formatDateString(dateString) {
  const date = moment(dateString);
  return date.format('MMMM Do, YYYY');
}

export const CodeBlock = ({ language, value }) => {
  return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>;
};