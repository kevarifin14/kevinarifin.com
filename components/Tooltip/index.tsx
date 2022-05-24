import { ReactNode } from "react";

type TooltipProps = {
  children: ReactNode;
  text: string;
};

export function Tooltip({ children, text }: TooltipProps) {
  return (
    <div className="group relative">
      <div className="dark:bg-dark-light absolute inset-x-1/2 z-10 -my-1 w-48 -translate-x-1/2 -translate-y-full transform rounded p-1 opacity-0 duration-500 ease-in-out group-hover:opacity-100">
        <p className="text-xs">{text}</p>
      </div>
      {children}
    </div>
  );
}
