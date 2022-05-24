import { ComponentProps } from "react";

export const classNames = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export const sizeToMaxWClassName = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
};

export const sizeToSpaceYClassName = {
  xs: "space-y-1",
  sm: "space-y-1",
  md: "space-y-2",
  lg: "space-y-2",
  xl: "space-y-2",
  "2xl": "space-y-4",
  "3xl": "space-y-4",
  "4xl": "space-y-4",
  "5xl": "space-y-4",
  "6xl": "space-y-4",
  "7xl": "space-y-4",
};

export const sizeToDimensionsClassName = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
  "2xl": "h-20 w-20",
  "3xl": "h-24 w-24",
  "4xl": "h-28 w-28",
  "5xl": "h-32 w-32",
  "6xl": "h-36 w-36",
  "7xl": "h-40 w-40",
};

export const sizeToPaddingClassName = {
  xs: "px-2 py-0.5",
  sm: "px-3 py-1",
  md: "px-4 py-2",
  lg: "px-5 py-3",
  xl: "px-6 py-4",
  "2xl": "px-7 py-5",
  "3xl": "px-8 py-6",
  "4xl": "px-9 py-7",
  "5xl": "px-10 py-8",
  "6xl": "px-11 py-9",
  "7xl": "px-12 py-10",
};

export const sizeToFontSizeClassName = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
};

const tailwindSizes = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
] as const;

export type TailwindSize = typeof tailwindSizes[number];

export const downsize = (
  tailwindSize: TailwindSize,
  times = 1
): TailwindSize => {
  const downsized =
    tailwindSizes[Math.max(tailwindSizes.indexOf(tailwindSize) - 1, 0)];
  return times === 1 ? downsized : downsize(downsized, times - 1);
};

export type Heroicon = (props: ComponentProps<"svg">) => JSX.Element; // eslint-disable-line
