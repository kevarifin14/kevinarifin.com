import NavLink from './NavLink';

export default function NavMenu({ links, className }) {
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
