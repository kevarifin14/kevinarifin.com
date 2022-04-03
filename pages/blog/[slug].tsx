import { GetStaticProps, GetStaticPropsContext } from "next";

import { getLayout } from "components/Layout";
import PostPage from "components/PostPage";

import { parseRawPost } from "lib/posts";
import { getPostData, getPostSlugs } from "lib/posts/server";
import { IRawPost } from "lib/types";

type PostProps = {
  rawPost: IRawPost;
  code: string;
};

export default function Post({ rawPost, code }: PostProps) {
  return <PostPage post={parseRawPost(rawPost)} code={code} />;
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const postData = await getPostData(params?.slug as string);
  return { props: { ...postData } };
};

export async function getStaticPaths() {
  const paths = getPostSlugs();
  return { paths, fallback: false };
}

Post.getLayout = getLayout;
