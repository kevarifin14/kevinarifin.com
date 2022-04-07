import { ReactNode } from "react";

import { classNames } from "lib/tailwind";

type MvpMagicButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export function MvpMagicButton({ children, onClick }: MvpMagicButtonProps) {
  const buttonClassName = "relative group hover:brightness-110 not-prose";
  const sublayerClassName = "absolute top-0 left-0 w-full h-full rounded-xl";

  const shadowClassName = classNames(
    "bg-black opacity-25 translate-y-[2px] blur-[4px]",
    sublayerClassName
  );
  const edgeClassName = classNames("bg-red-900", sublayerClassName);
  const frontClassName = classNames(
    "block rounded-xl text-white bg-red-500 px-4 py-2 -translate-y-[4px]"
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
