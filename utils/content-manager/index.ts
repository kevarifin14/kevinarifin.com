import fs from 'fs';
import matter from 'gray-matter';
import moment from 'moment';

export interface IPost {
  slug: string,
  title: string,
  date: string,
  type: string,
  excerpt: string,
}

export type IContentDir = 'blog' | 'newsletters' | '';

const listMarkdownFiles = (contentDir: IContentDir) => {
  const files = fs.readdirSync(`${process.cwd()}/content/${contentDir}`);
  return files.filter((filename) => filename.endsWith('.md'));
};

export const getContent = (contentDir: IContentDir, filename: string) => {
  const markdownWithMetadata = fs
    .readFileSync(`${process.cwd()}/content/${contentDir}/${filename}`)
    .toString();
  return matter(markdownWithMetadata);
};

export const listContentMetadata = (contentDir: IContentDir) => {
  const files = listMarkdownFiles(contentDir);

  return files
    .map((filename) => {
      const { data } = getContent(contentDir, filename);
      return data;
    })
    .sort(({ date: date1 }, { date: date2 }) => (
      -1 * (moment(date1).unix() - moment(date2).unix())
    ));
};

export const listContent = (contentDir: IContentDir) => {
  const files = listMarkdownFiles(contentDir);
  return files.map((filename) => filename.replace('.md', ''));
};
