import Link from 'next/link';
import { HiMenu } from 'react-icons/hi';

export interface ILink {
  href: string,
  title: string,
  icon?: typeof HiMenu,
}

type NavLinkProps = {
  link: ILink,
  showIcon?: boolean,
}

export default function NavLink({ link, showIcon = false }: NavLinkProps) {
  return (
    <Link href={link.href}>
      <a className="flex items-center space-x-3 text-lg font-medium border-transparent hover:bg-transparent">
        {showIcon && (
          <div>
            <link.icon className="flex-shrink-0 h-6 w-6 text-primary" />
          </div>
        )}
        <p>{link.title}</p>
      </a>
    </Link>
  );
}
