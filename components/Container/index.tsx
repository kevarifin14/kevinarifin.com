import { ReactNode } from "react";

import { classNames, sizeToMaxWClassName, TailwindSize } from "lib/tailwind";

type ContainerProps = {
  size?: TailwindSize;
  children: ReactNode;
  className?: string;
};

export function Container({
  children,
  className,
  size = "7xl",
}: ContainerProps) {
  const containerClassName = classNames(
    `w-full px-8 sm:px-6 lg:px-4 mx-auto`,
    sizeToMaxWClassName[size],
    className
  );
  return <div className={containerClassName}>{children}</div>;
}
