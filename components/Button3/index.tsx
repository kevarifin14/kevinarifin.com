import { ReactNode } from "react";

import { Card } from "components/Card";

import { classNames } from "lib/tailwind";

type Button3Props = {
  children: ReactNode;
  color?: "red" | "green" | "blue" | "primary";
  onClick: () => void;
  className?: string;
};

export function Button3({
  children,
  onClick,
  className,
  color = "primary",
}: Button3Props) {
  let edgeColorClassName, frontColorClassName;

  switch (color) {
    case "red":
      edgeColorClassName = "bg-red-900";
      frontColorClassName = "bg-gradient-to-br from-red-400 to-red-600";
      break;

    case "green":
      edgeColorClassName = "bg-green-900";
      frontColorClassName = "bg-gradient-to-br from-green-400 to-green-600";
      break;

    case "blue":
      edgeColorClassName = "bg-blue-900";
      frontColorClassName = "bg-gradient-to-br from-blue-400 to-blue-600";
      break;

    default:
      edgeColorClassName = "bg-primary-900";
      frontColorClassName = "bg-gradient-to-br from-primary-400 to-primary-600";
      break;
  }

  const buttonClassName = classNames(
    "relative group hover:brightness-110",
    className
  );

  const sublayerClassName = "absolute top-0 left-0 w-full h-full rounded-xl";
  const transitionClassName =
    "transform will-change-transform group-hover:duration-200 group-active:duration-75 ease-out duration-500";

  return (
    <button className={buttonClassName} onClick={onClick}>
      <span
        className={classNames(
          "bg-black opacity-25",
          "translate-y-[2px] group-active:translate-y-[1px] group-hover:translate-y-[4px] blur-[4px]",
          sublayerClassName,
          transitionClassName
        )}
      />

      <span className={classNames(edgeColorClassName, sublayerClassName)} />

      <span
        className={classNames(
          "block h-full rounded-xl text-white",
          "-translate-y-[4px] group-active:-translate-y-[2px] group-hover:-translate-y-[6px]",
          frontColorClassName,
          transitionClassName
        )}
      >
        {children}
      </span>
    </button>
  );
}
