import { GetStaticPaths, GetStaticProps } from "next";

import { getLayout } from "components/Layout";
import { TagPage } from "components/TagPage";

import { POST_TAGS } from "lib/constants";
import { parseRawPost } from "lib/posts";
import { getPostsData } from "lib/posts/server";
import { IRawPost } from "lib/types";

type TagProps = {
  rawPosts: IRawPost[];
};

export default function Tag({ rawPosts }: TagProps) {
  return <TagPage posts={rawPosts.map(parseRawPost)} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: POST_TAGS.map(({ name }) => ({
      params: { tag: name.toLowerCase() },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const rawPosts = await getPostsData();
  return { props: { rawPosts } };
};

Tag.getLayout = getLayout;
