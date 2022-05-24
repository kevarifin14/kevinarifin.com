import { Header } from "components/Header";

import { classNames } from "lib/tailwind";
import { IPost } from "lib/types";

type PostCardProps = {
  post: IPost;
  className?: string;
};

export default function PostCard({ post, className }: PostCardProps) {
  const postCardClassName = classNames(
    "prose dark:prose-invert text-left space-y-4",
    className
  );

  return (
    <div className={postCardClassName}>
      <Header size="xl" title={post.title} description={post.displayDate} />

      <p className="my-0">{post.excerpt}</p>
    </div>
  );
}
