import { useRouter } from "next/router";

import Breadcrumbs from "components/Breadcrumbs";
import PostCard from "components/PostCard";
import { PostTagCard } from "components/PostTagCard";

import { POST_TAGS } from "lib/constants";
import { IPost } from "lib/types";

type TagPageProps = {
  posts: IPost[];
};

export function TagPage({ posts }: TagPageProps) {
  const router = useRouter();
  const postTag = POST_TAGS.find((p) => p.name === router.query.tag)!;

  return (
    <div className="prose mx-auto px-4 dark:prose-invert">
      <Breadcrumbs
        breadcrumbs={[
          { href: `/${postTag?.name.toLowerCase()}`, name: postTag.name },
        ]}
        className="pb-4"
      />

      <PostTagCard postTag={postTag!} />

      <div className="flex flex-col divide-y dark:divide-dark-light">
        {posts.length === 0 ? (
          <h1 className="py-8 text-center">Coming soon...</h1>
        ) : (
          posts.map((post) => (
            <button
              key={post.slug}
              onClick={() => router.push(`/blog/${post.slug}`)}
            >
              <PostCard post={post} className="py-8" />
            </button>
          ))
        )}
      </div>
    </div>
  );
}
