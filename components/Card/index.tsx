import { ReactNode, useEffect, useRef } from "react";
import VanillaTilt, { TiltOptions } from "vanilla-tilt";

import { classNames } from "lib/tailwind";

type CardProps = {
  children: ReactNode;
  type?: "primary";
  className?: string;
  tiltOptions?: TiltOptions;
};

export function Card({ children, className, type, tiltOptions }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  let typeClassName;

  useEffect(() => {
    if (cardRef.current) {
      VanillaTilt.init(cardRef.current, { reverse: true, reset: false });
    }
  }, [cardRef]);

  switch (type) {
    case "primary":
      typeClassName = "bg-primary-dark";
      break;

    default:
      typeClassName = "bg-light dark:bg-dark-light";
  }

  const cardClassName = classNames(
    "px-6 py-8 rounded-3xl shadow-md dark:shadow-none",
    typeClassName,
    className
  );

  return (
    <div className={cardClassName} ref={cardRef}>
      {children}
    </div>
  );
}
