import { HomeIcon } from "@heroicons/react/solid";
import Link from "next/link";

import { classNames } from "lib/tailwind";

export type IBreadcrumb = {
  href: string;
  name: string;
};

type BreadcrumbsProps = {
  breadcrumbs: IBreadcrumb[];
  className?: string;
};

export default function Breadcrumbs({
  breadcrumbs,
  className,
}: BreadcrumbsProps) {
  const breadcrumbsClassName = classNames("flex", className);

  return (
    <nav className={breadcrumbsClassName}>
      <ol role="list" className="flex list-none items-center space-x-4">
        <li>
          <div>
            <Link href="/">
              <a className="text-sm no-underline hover:text-primary">
                <HomeIcon className="h-5 w-5 flex-shrink-0" />
              </a>
            </Link>
          </div>
        </li>
        {breadcrumbs.map((breadcrumb) => (
          <li key={breadcrumb.name} className="no-underline">
            <div className="flex items-center">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link href={breadcrumb.href}>
                <a className="ml-4 text-sm no-underline hover:text-primary">
                  {breadcrumb.name}
                </a>
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
