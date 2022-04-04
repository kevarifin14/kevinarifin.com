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
      <div>
        <h2 className="my-0">{post.title}</h2>
        <p className="my-0 text-sm">{post.displayDate}</p>
      </div>
      <p className="my-0">{post.excerpt}</p>
    </div>
  );
}
