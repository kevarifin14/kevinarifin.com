import { ReactNode } from 'react';

type MarkdownLinkProps = {
  href: string,
  children: ReactNode,
}

export default function MarkdownLink({ href, children }: MarkdownLinkProps) {
  return <a href={href} target="_blank" rel="noreferrer" className="text-primary">{children}</a>;
}
