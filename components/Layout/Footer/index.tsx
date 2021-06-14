import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';

import FooterLink from './FooterLink';

export default function Footer() {
  const links = [
    { Icon: FaTwitter, href: 'https://twitter.com/kevarifin' },
    { Icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/kevinarifin/' },
  ];

  return (
    <div className="border-t-2 border-gray-100 py-8 max-w-7xl w-full mx-auto">
      <div className="flex justify-center flex-col items-center space-y-4 md:space-y-0 md:flex-row md:justify-between">

        <div className="flex space-x-6 md:order-2">
          {links.map(({ Icon, href }) => <FooterLink Icon={Icon} href={href} />)}
        </div>

        <p className="text-base text-gray-400 xl:text-center md:order-1">
          &copy; 2021 Kevin Arifin
        </p>

      </div>
    </div>
  );
}
