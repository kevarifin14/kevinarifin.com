import { LinkIcon } from "@heroicons/react/solid";
import _ from "lodash";
import Link from "next/link";
import { HTMLAttributes, PropsWithChildren } from "react";

export const Heading = (
  props: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>
) => {
  const name = _.kebabCase(props.children?.toString());

  return (
    <Link href={`#${name}`}>
      <a
        className="flex items-center prose dark:prose-invert space-x-2 group -ml-7 no-underline"
        id={name}
      >
        <LinkIcon className="h-5 w-5 text-primary-dark opacity-0 group-hover:opacity-75 transform duration-200" />

        <h1 {...props} className="text-primary" />
      </a>
    </Link>
  );
};
