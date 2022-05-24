import _ from "lodash";
import { ReactNode } from "react";

import { Header } from "components/Header";

import { classNames, TailwindSize } from "lib/tailwind";

type HeroSectionProps = {
  title: string;
  description: string;
  children?: ReactNode;
  size?: TailwindSize;
  className?: string;
  reverse?: boolean;
  inline?: boolean;
};

export function HeroSection({
  title,
  description,
  children,
  inline,
  size = "2xl",
  className,
  reverse,
}: HeroSectionProps) {
  const heroSectionClassName = classNames(
    "mx-auto",
    inline ? "grid sm:grid-cols-2 items-center" : "",
    className
  );

  const elements = [
    <Header
      key="header"
      centered={!inline}
      size={size}
      title={title}
      description={description}
    />,
    children,
  ];

  return (
    <section className={heroSectionClassName}>
      {inline && reverse ? _.reverse(elements) : elements}
    </section>
  );
}
