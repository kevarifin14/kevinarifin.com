import { forwardRef, MouseEventHandler, ReactNode } from "react";

import { Spin } from "components/Spin";

import {
  classNames,
  Heroicon,
  sizeToFontSizeClassName,
  sizeToPaddingClassName,
  TailwindSize,
} from "lib/tailwind";

export type ButtonType =
  | "primary"
  | "secondary"
  | "danger"
  | "default"
  | "primary2";

export type ButtonProps = {
  type: ButtonType;
  children?: ReactNode;
  htmlType?: "submit" | "button";
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  size?: TailwindSize;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  block?: boolean;
  icon?: Heroicon;
};

const typeToClassName = {
  primary:
    "text-white bg-primary border-primary hover:bg-primary-dark disabled:bg-primary hover:border-primary-dark disabled:border-primary",
  secondary:
    "text-primary border-primary text-primary-dark hover:bg-primary/25",
  primary2:
    "text-white bg-secondary border-secondary hover:bg-secondary-dark disabled:bg-secondary hover:border-secondary-dark disabled:border-secondary",
  danger: "text-danger border-danger text-danger-dark hover:bg-danger/25",
  // default:
  //   "text-dark-light border-dark-light text-dark-light hover:bg-dark-light/25",
  link: "text-secondary border-transparent",
  // white: "bg-white border border-light-dark"
  default:
    "bg-light-light dark:bg-dark-light border-light-dark dark:border-dark-accent",
};

// const sizeClassName = {
//   sm:
//   lg:
//   xl:
// }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "default",
      children,
      htmlType = "button",
      className,
      loading,
      disabled,
      onClick,
      block,
      size = "md",
      ...props
    },
    ref
  ) => {
    const typeClassName = typeToClassName[type];
    const disabledClassName = "opacity-50 cursor-not-allowed";
    const blockClassName = "w-full inline-block";
    const fontSizeClassName = sizeToFontSizeClassName[size];
    const paddingClassName = sizeToPaddingClassName[size];

    const buttonClassName = classNames(
      "inline-flex items-center justify-center focus:outline-none font-medium rounded-md border space-x-2",
      typeClassName,
      disabled ? disabledClassName : "",
      block ? blockClassName : "",
      fontSizeClassName,
      paddingClassName,
      className
    );

    return (
      <button
        ref={ref}
        type={htmlType}
        className={buttonClassName}
        disabled={disabled || loading}
        onClick={onClick}
      >
        {loading && <Spin />}
        {props.icon && (
          <span>
            <props.icon />
          </span>
        )}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
