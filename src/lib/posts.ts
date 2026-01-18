import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  category: 'posts' | 'drafts';
}

const postsDirectory = path.join(process.cwd(), 'content/posts');
const draftsDirectory = path.join(process.cwd(), 'content/drafts');

/**
 * Extract slug from date-prefixed filename
 * Example: "2024-01-15-my-first-post.md" -> "my-first-post"
 */
function getSlugFromFilename(filename: string): string {
  // Remove .md extension
  const withoutExt = filename.replace(/\.md$/, '');
  // Remove date prefix (YYYY-MM-DD-)
  const slug = withoutExt.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  return slug;
}

/**
 * Extract date from filename if not in frontmatter
 * Example: "2024-01-15-my-first-post.md" -> "2024-01-15"
 */
function getDateFromFilename(filename: string): string | null {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})-/);
  return match ? match[1] : null;
}

/**
 * Read and parse a markdown file
 */
async function parseMarkdownFile(
  filePath: string,
  filename: string,
  category: 'posts' | 'drafts'
): Promise<Post> {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const slug = getSlugFromFilename(filename);
  const dateFromFilename = getDateFromFilename(filename);

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || dateFromFilename || new Date().toISOString().split('T')[0],
    description: data.description || '',
    content, // Return raw markdown content instead of HTML
    category,
  };
}

/**
 * Get all posts from a directory
 */
async function getPostsFromDirectory(
  directory: string,
  category: 'posts' | 'drafts'
): Promise<Post[]> {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const fileNames = fs.readdirSync(directory);
  const markdownFiles = fileNames.filter((name) => name.endsWith('.md'));

  const posts = await Promise.all(
    markdownFiles.map(async (filename) => {
      const filePath = path.join(directory, filename);
      return parseMarkdownFile(filePath, filename, category);
    })
  );

  // Sort by date (newest first)
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get all published posts
 */
export async function getAllPosts(): Promise<Post[]> {
  return getPostsFromDirectory(postsDirectory, 'posts');
}

/**
 * Get all draft posts
 */
export async function getAllDrafts(): Promise<Post[]> {
  return getPostsFromDirectory(draftsDirectory, 'drafts');
}

/**
 * Get a single post by slug
 * Searches published posts first, then drafts
 */
export async function getPostBySlug(
  slug: string,
  category?: 'posts' | 'drafts'
): Promise<Post | null> {
  if (category === 'posts' || !category) {
    const posts = await getAllPosts();
    const post = posts.find((p) => p.slug === slug);
    if (post) return post;
  }

  if (category === 'drafts' || !category) {
    const drafts = await getAllDrafts();
    const draft = drafts.find((d) => d.slug === slug);
    if (draft) return draft;
  }

  return null;
}

/**
 * Get all post slugs for static generation (published posts only)
 */
export async function getPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}
