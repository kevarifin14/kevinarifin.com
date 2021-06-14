import NavLink from './NavLink';

type NavMenuProps = {
  links: any,
  className: string,
}

export default function NavMenu({ links, className }: NavMenuProps) {
  const navMenuClassName = [
    'space-x-10',
    className,
  ].join(' ');

  return (
    <nav className={navMenuClassName}>
      {links.map(({ title, href }) => <NavLink key={href} href={href}>{title}</NavLink>)}
    </nav>
  );
}
