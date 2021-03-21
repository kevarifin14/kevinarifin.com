import NavLogo from '../NavLogo';
import NavCloseButton from './NavCloseButton';
import NavMobileLink from './NavMobileLink';

export default function NavMobileMenu({ links, onClick }) {
  return (
    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
      <div className="pt-5 pb-6 px-5">

        <div className="flex items-center justify-between">

          <NavLogo />

          <div className="-mr-2">
            <NavCloseButton onClick={onClick} />
          </div>
        </div>

        <div className="mt-6">
          <nav className="grid gap-y-8">
            {links.map(({ title, href, Icon }) => (
              <NavMobileLink Icon={Icon} href={href}>{title}</NavMobileLink>
            ))}
          </nav>
        </div>

      </div>
    </div>
  );
}
