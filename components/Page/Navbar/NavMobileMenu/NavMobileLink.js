import Link from 'next/link';

export default function NavMobileLink({ children, href, Icon }) {
  return (
    <Link href={href}>
      <a className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50 no-underline">
        <Icon className="flex-shrink-0 h-6 w-6 text-primary" />

        <span className="ml-3 text-base font-medium text-gray-900">
          {children}
        </span>

      </a>
    </Link>
  );
}
