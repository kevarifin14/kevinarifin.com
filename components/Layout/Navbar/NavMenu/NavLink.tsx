import Link from 'next/link';
import { ReactNode } from 'react';

type NavLinkProps = {
  href: string,
  children: ReactNode,
}

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link href={href}>
      <a className="text-lg font-medium text-gray-500 hover:text-gray-900 no-underline">
        {children}
      </a>
    </Link>
  );
}
