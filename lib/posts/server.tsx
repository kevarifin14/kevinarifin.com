import fs from "fs";
import _ from "lodash";
import { bundleMDX } from "mdx-bundler";
import path from "path";

import { IRawPost } from "lib/types";

const postsDirectory = path.join(process.cwd(), "posts");

export type PostTag = "Next.js" | "web3";

export const getPostSlugs = () =>
  fs.readdirSync(postsDirectory).map((filename) => ({
    params: { slug: filename.replace(/\.mdx$/, "") },
  }));

export const getPostData = async (slug: string) => {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(fullPath, "utf8");

  const {
    code,
    frontmatter: rawPost,
    matter,
  } = await bundleMDX<IRawPost>({ source });

  return { slug, rawPost, code, matter };
};

export const getPostsData = async (): Promise<IRawPost[]> => {
  return Promise.all(
    getPostSlugs().map(
      async ({ params: { slug } }) => (await getPostData(slug)).matter.data
    )
  );
};
