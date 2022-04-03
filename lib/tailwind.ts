import { ComponentProps } from "react";

export const classNames = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export type TailwindSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl";

export type Heroicon = (props: ComponentProps<"svg">) => JSX.Element; // eslint-disable-line
