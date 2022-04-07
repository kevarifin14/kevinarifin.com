import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";

import Breadcrumbs from "components/Breadcrumbs";
import { MagicButton } from "components/MagicButton";
import { MvpMagicButton } from "components/MvpMagicButton";
import { PostTagCard } from "components/PostTagCard";
import { SyntaxHighlighter } from "components/SyntaxHighlighter";

import { IPost } from "lib/types";

type PostPageProps = {
  code: string;
  post: IPost;
};

export default function PostPage({ code, post }: PostPageProps) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
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
    <article className="prose mx-auto w-full max-w-prose dark:prose-invert px-4">
      <Breadcrumbs breadcrumbs={breadcrumbs} className="pb-4" />

      <PostTagCard
        postTag={primaryPostTag}
        title={post.title}
        description={post.displayDate}
      />
      <Component
        components={{
          pre: SyntaxHighlighter,
          MagicButton,
          MvpMagicButton,
        }}
      />
    </article>
  );
}
