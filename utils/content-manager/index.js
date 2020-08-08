import fs from 'fs';
import matter from 'gray-matter';
import { v4 as uuid } from 'uuid';

const listMarkdownFiles = (contentDir) => {
  const files = fs.readdirSync(`content/${contentDir}`);
  return files.filter((filename) => filename.endsWith('.md'));
};

export const getContent = (contentDir, filename) => {
  const markdownWithMetadata = fs
    .readFileSync(`content/${contentDir}/${filename}`)
    .toString();
  return matter(markdownWithMetadata);
};

export const listContentMetadata = (contentDir) => {
  const files = listMarkdownFiles(contentDir);

  return files.map((filename) => {
    const { data } = getContent(contentDir, filename);
    return { ...data, id: uuid() };
  });
};

export const listContent = (contentDir) => {
  const files = listMarkdownFiles(contentDir);
  return files.map((filename) => filename.replace('.md', ''));
};
