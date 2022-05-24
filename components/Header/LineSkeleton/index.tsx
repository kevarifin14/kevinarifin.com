import { classNames, TailwindSize } from "lib/tailwind";

type LineSkeletonProps = {
  size?: TailwindSize;
  block?: boolean;
  className?: string;
};

export function LineSkeleton({ block, className }: LineSkeletonProps) {
  const lineSkeletonClassName = classNames(
    "rounded bg-gray-300 animate-pulse",
    block ? "w-full" : "",
    className
  );

  return (
    <div className={lineSkeletonClassName}>
      <span className="invisible">hidden</span>
    </div>
  );
}
