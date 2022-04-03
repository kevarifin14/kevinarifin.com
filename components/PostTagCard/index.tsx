import { Card } from "components/Card";

import { classNames } from "lib/tailwind";
import { IPostTag } from "lib/types";

type PostTagCardProps = {
  postTag: IPostTag;
  title?: string;
  description?: string;
  className?: string;
};

export function PostTagCard({
  postTag,
  className,
  title,
  description,
}: PostTagCardProps) {
  let backgroundClassName;

  switch (postTag.color) {
    case "red":
      backgroundClassName = "from-red-400 to-red-600";
      break;

    case "blue":
      backgroundClassName = "from-blue-400 to-blue-600";
      break;

    case "green":
      backgroundClassName = "from-green-400 to-green-600";
      break;

    default:
      backgroundClassName = "from-primary-400 to-primary-600";
      break;
  }

  const postTagCardClassName = classNames(
    "bg-gradient-to-br",
    "prose prose-invert flex flex-col items-start space-y-8",
    backgroundClassName,
    className
  );

  return (
    <Card className={postTagCardClassName}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-xl">
        {postTag.emoji}
      </div>

      <div>
        <h1 className="my-0">{title || postTag.name}</h1>
        {description && <p className="my-0">{description}</p>}
      </div>
    </Card>
  );
}
