import { Transition } from '@headlessui/react';
import { useState } from 'react';
import {
  HiBookOpen, HiDocumentText, HiMail, HiUser,
} from 'react-icons/hi';

import NavLogo from './NavLogo';
import NavMenu from './NavMenu';
import NavMobileMenu from './NavMobileMenu';
import NavMenuButton from './NavOpenButton';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  const links = [
    {
      title: 'Blog',
      href: '/blog',
      Icon: HiDocumentText,
    },
    {
      title: 'Newsletter',
      href: '/tb',
      Icon: HiMail,
    },
    {
      title: 'Bookshelf',
      href: '/bookshelf',
      Icon: HiBookOpen,
    },
    {
      title: 'About',
      href: '/about',
      Icon: HiUser,
    },
  ];

  return (
    <div className="relative">
      <div>
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-4 md:space-x-10">

          <NavLogo />

          <div className="-mr-2 -my-2 md:hidden">
            <NavMenuButton onClick={() => setIsVisible(true)} />
          </div>

          <NavMenu className="hidden md:flex" links={links} />

        </div>
      </div>

      <Transition
        show={isVisible}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        className="absolute top-0 inset-x-0 py-2 transition transform origin-top-right md:hidden"
      >
        <NavMobileMenu
          links={links}
          onClick={() => setIsVisible(false)}
        />
      </Transition>
    </div>
  );
}
