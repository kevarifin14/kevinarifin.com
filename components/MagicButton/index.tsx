import { ReactNode } from "react";

import { classNames, TailwindSize } from "lib/tailwind";

type ButtonColor = "red" | "green" | "blue" | "primary";

type MagicButtonProps = {
  children: ReactNode;
  size?: TailwindSize;
  color?: ButtonColor;
  onClick: () => void;
  className?: string;
};

const getButtonColorClassName = (color: ButtonColor) => {
  switch (color) {
    case "red":
      return {
        edgeColorClassName: "bg-red-900",
        frontColorClassName: "bg-gradient-to-br from-red-400 to-red-600",
      };
    case "green":
      return {
        edgeColorClassName: "bg-green-900",
        frontColorClassName: "bg-gradient-to-br from-green-400 to-green-600",
      };
    case "blue":
      return {
        edgeColorClassName: "bg-blue-900",
        frontColorClassName: "bg-gradient-to-br from-blue-400 to-blue-600",
      };
    default:
      return {
        edgeColorClassName: "bg-blue-900",
        frontColorClassName: "bg-gradient-to-br from-blue-400 to-blue-600",
      };
  }
};

const getPaddingClassName = (size: TailwindSize) => {
  switch (size) {
    case "lg":
      return "px-6 py-8";

    case "md":
    default:
      return "px-4 py-2";
  }
};

export function MagicButton({
  children,
  onClick,
  className,
  color = "primary",
  size = "md",
}: MagicButtonProps) {
  const { edgeColorClassName, frontColorClassName } =
    getButtonColorClassName(color);
  const paddingClassName = getPaddingClassName(size);
  const sublayerClassName = "absolute top-0 left-0 w-full h-full rounded-xl";
  const transitionClassName =
    "transform will-change-transform ease-out duration-500 group-hover:duration-200 group-active:duration-75";

  const buttonClassName = classNames(
    "relative group hover:brightness-110 not-prose",
    className
  );

  const shadowClassName = classNames(
    "bg-black opacity-25 translate-y-[2px] blur-[4px]",
    "group-active:translate-y-[1px] group-hover:translate-y-[4px]",
    sublayerClassName,
    transitionClassName
  );

  const edgeClassName = classNames(edgeColorClassName, sublayerClassName);

  const frontClassName = classNames(
    "block rounded-xl text-white -translate-y-[4px]",
    "group-active:-translate-y-[2px] group-hover:-translate-y-[6px]",
    paddingClassName,
    frontColorClassName,
    transitionClassName
  );

  return (
    // pushable
    <button className={buttonClassName} onClick={onClick}>
      {/* shadow  */}
      <span className={shadowClassName} />

      {/* edge  */}
      <span className={edgeClassName} />

      {/* front  */}
      <span className={frontClassName}>{children}</span>
    </button>
  );
}
