import NavLink, { ILink } from '../NavLink';

type NavMenuProps = {
  links: ILink[],
  className: string,
}

export default function NavMenu({ links, className }: NavMenuProps) {
  const navMenuClassName = ['space-x-10', className].join(' ');

  return (
    <nav className={navMenuClassName}>
      {links.map((link) => <NavLink link={link} />)}
    </nav>
  );
}
