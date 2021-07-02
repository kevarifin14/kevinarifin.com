import { Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  HiBookOpen, HiDocumentText, HiMail, HiUser,
} from 'react-icons/hi';

import { ILink } from './NavLink';
import NavLogo from './NavLogo';
import NavMenu from './NavMenu';
import NavMobileMenu from './NavMobileMenu';
import NavMenuButton from './NavOpenButton';

export default function Navbar() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const links: ILink[] = [
    {
      title: 'Blog',
      href: '/blog',
      active: router.pathname.includes('/blog'),
      icon: HiDocumentText,
    },
    {
      title: 'Newsletter',
      href: '/newsletter',
      active: router.pathname.includes('/newsletter'),
      icon: HiMail,
    },
    {
      title: 'About',
      href: '/about',
      active: router.pathname.includes('/about'),
      icon: HiUser,
    },
  ];

  return (
    <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center pt-4 md:space-x-10">

        <NavLogo />

        <div className="-mr-2 -my-2 md:hidden">
          <NavMenuButton onClick={() => setIsVisible(true)} />
        </div>

        <NavMenu className="hidden md:flex" links={links} />

      </div>

      <Transition
        show={isVisible}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        className="absolute top-0 inset-x-0 py-2 transition transform origin-top-right md:hidden z-50"
      >
        <NavMobileMenu
          links={links}
          onClick={() => setIsVisible(false)}
        />
      </Transition>
    </div>
  );
}
