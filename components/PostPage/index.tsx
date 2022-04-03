import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";

import Breadcrumbs from "components/Breadcrumbs";
import { PostTagCard } from "components/PostTagCard";

import { IPost, IPostTag } from "lib/types";

type PostPageProps = {
  code: string;
  post: IPost;
};

export default function PostPage({ code, post }: PostPageProps) {
  const Content = useMemo(() => getMDXComponent(code), [code]);
  const primaryPostTag = post.tags[0];

  const breadcrumbs = [
    {
      name: primaryPostTag.name,
      href: `/${primaryPostTag.name.toLowerCase()}`,
    },
    {
      name: post.title,
      href: `/blog/${post.slug}`,
    },
  ];

  return (
    <article className="prose mx-auto w-full max-w-prose dark:prose-invert">
      <Breadcrumbs breadcrumbs={breadcrumbs} className="pb-4" />

      <PostTagCard
        postTag={primaryPostTag}
        title={post.title}
        description={post.displayDate}
      />
      <Content />
    </article>
  );
}
