import { ReactNode } from "react";
import { classNames } from "lib/tailwind"

type <FTName>Props = {
  children: ReactNode;
  className?: string;
};

export function <FTName>({
  className, children,
}: <FTName>Props) {
  const <FTName | camelcase>ClassName = classNames(
    className,
  );

  return (
    <div className={<FTName | camelcase>ClassName}>
      {children}
    </div>
  );
}