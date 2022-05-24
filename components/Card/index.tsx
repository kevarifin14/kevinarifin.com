import { ReactNode } from "react";

import { classNames, sizeToPaddingClassName, TailwindSize } from "lib/tailwind";

type CardProps = {
  children: ReactNode;
  className?: string;
  size?: TailwindSize;
};

export function Card({ className, children, size = "md" }: CardProps) {
  const cardClassName = classNames(
    "bg-light-dark dark:bg-dark-light rounded-md",
    sizeToPaddingClassName[size],
    className
  );

  return <div className={cardClassName}>{children}</div>;
}
