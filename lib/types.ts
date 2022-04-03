export type IPostTag = {
  name: string;
  color: "blue" | "green" | "red";
  emoji: string;
};

export type IRawPost = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  tags: string;
};

export type IPost = {
  title: string;
  date: Date;
  displayDate: string;
  excerpt: string;
  slug: string;
  tags: IPostTag[];
};
