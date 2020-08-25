---
title: 'Build Your Own Blog Part 1'
slug: build-your-own-blog-1
date: '2020-08-25'
type: technical
excerpt: Part 1 of my two part series on building your own blog. Managing Markdown content and rendering it your blog.
# related: newsletters/63
# related: newsletters/62,blog/build-your-own-blog-2,blog/next-from-zero-to-production
---
There are a lot of website building alternatives like Wix, Wordpress, and Webflow that provide a lot of nice tools for content management, message boards, and styling out of the box. However, I've found it valuable to take full ownership of building my own personal website/blog from scratch and it's something I've been tinkering with since my first year of college.

This is a two-part series on building your own blog and takes a peek behind the curtain of this website (with potential extensions forthcoming).
* Part 1 covers the content management piece - writing blog posts in Markdown files, hooking them into your blog, and then displaying them.
* Part 2 covers the styling piece - using Tailwind CSS (a low-level CSS framework) to customize the look of your blog.

## Getting Started

We'll start with the default Next app. If you want more detailed instructions on getting started with Next, check out my [previous post](/blog/next-from-zero-to-production).

Run the following command in your terminal and follow the subsequent prompts:

```bash
npx create-next-app
```

You can verify this worked by running `npm run dev` and heading over to [localhost:3000](http://localhost:3000).

> Hint: I prefer absolute imports in this post, so be sure to add a `jsconfig.json` with the following content to your project:
> ```
> {
>   "compilerOptions": {
>     "baseUrl": "."
>   }
> }
> ```

## Storing Your Content

Once you have your Next app set up, create a directory `content/blog` at the root of your project. Your project should look something like this:

```bash
public/
content/
  blog/
pages/
	api/
	index.js
package.json
node_modules/
jsconfig.json # Don't forget to add this file to allow for absolute imports
```

We'll be storing our blog posts in Markdown files inside the `blog/content` directory. Let's create our first blog post: `blog/content/obi-wans-journal.md`.

> **What is Markdown?**
>
> Markdown is a simple markup language for formatting plain text documents (like HTML is a markup language for web pages).
>
> Markdown provides easy-to-learn syntax to write formatted text (headers, bold text, code blocks, etc.) within our blog post. For a quick rundown on Markdown syntax, check out the [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

You can add YAML to the top of a Mardown file to add metadata to your blog posts, called Frontmatter. In simple terms, basically you can specify identifying information about your blog post at the top of your blog post using some special lines.

For example, this blog post has the following Frontmatter.

```
---
title: "Build Your Own Blog Part 1"
slug: build-your-own-blog-1
date: "2020-08-25"
type: technical
excerpt: Part 1 of my two part series on building your own blog. Managing Markdown content and rendering it your blog.
---
```

We'll be able to access this information later when we want to display our blog post. Within `content/blog/obi-wans-journal.md`, let's add our own Frontmatter. Keep in mind, you can add whatever Frontmatter you want and aren't limited to the keys that I use.

```
---
title: "Obi-Wan's Journal"
slug: obi-wans-journal
excerpt: Keeping track of things I do as a Padawan.
---
```

> **What is a slug?**
>
> A slug is a user-friendly URL endpoint that points to content. The slug in the Frontmatter should match the name of the file so we are able to correctly find the right Markdown file to display.

Whenever you want to make a new blog post, just go through the same process of:

1. Creating a new file in `content/blog`.
2. Adding Frontmatter to identify your blog post (title, slug, date, etc.).
3. Writing your blog post using Markdown syntax in the body of the file.

## Displaying your Blog Post

Let's now handle rendering two types of pages commonly found on blogs: a list of all blog posts and viewing a single blog post.

Before we get started, we'll need to install a few libraries (`gray-matter`, `uuid`, `react-markdown`):

```
npm install --save gray-matter uuid react-markdown
```

### Listing All Blog Posts

Create a file `pages/blog/index.js`. This page will be viewable at [localhost:3000/blog](http://localhost:3000/blog) and show all your blog posts.

In order to do so, we need to read all the files stored in our `content/blog` directory. Since we'll be using this code a lot, let's create a utils library to manage our content.

Create a `utils` directory and a file titled `utils/content-management.js`. Within `content-management.js`:

```jsx
import fs from 'fs';

const listMarkdownFiles = () => {
  const files = fs.readdirSync(`${process.cwd()}/content/blog`);
  return files.filter((filename) => filename.endsWith('.md'));
};
```

`fs` is Node's file system management library, and we're using `fs` to read our `content/blog` directory to get all Markdown files.

Now that we have a list of all the files containing our blog posts, we want to read the metadata stored in the Frontmatter.

```jsx
...
import matter from 'gray-matter';
import { v4 as uuid } from 'uuid';

const listMarkdownFiles = () => {
  ...
};

export const getContent = (filename) => {
  const markdownWithMetadata = fs
    .readFileSync(`${process.cwd()}/content/blog/${filename}`)
    .toString();
  return matter(markdownWithMetadata);
};

export const listContentMetadata = () => {
  const files = listMarkdownFiles();

  return files.map((filename) => {
    const { data } = getContent(filename);
    return { ...data, id: uuid() };
  });
};
```

This is a definitely a lot to take in. Basically, we get all the Markdown files and read their metadata (and attach a unique ID).

> **What is this `gray-matter` thing?**
>
> `gray-matter` is a library that reads in a Markdown with Frontmatter string and converts is to an object we can use.
>
> For example, we'll take the Markdown file for our first blog post above:
> ```
> ---
> title: "Obi-Wan's Journal"
> slug: obi-wans-journal
> excerpt: Keeping track of things I do as a Padawan.
> ---
> Today I went to a planet with a lot of sand and picked up another useless life form.
> ```
>
> And convert it into something like this:
> ```jsx
> {
>   content: 'Today I went to a planet with a lot of sand and picked up another useless life form.',
>   data: {
>     title: "Obi-Wan's Journal",
>     slug: 'obi-wans-journal',
>     excerpt: "Keeping track of things I do as a Padawan.",
>   }
> }
> ```

Now we have all the tools needed to display the blog posts at [localhost:3000/blog](http://localhost:3000/blog).

Within the `pages/blog/index.js` file, let's put everything together. We'll use Next's `getStaticProps` feature which fetches data at build time.

```jsx
import { listContentMetadata } from 'utils/content-management';

export default function Blog({ posts }) {
  ... // We'll fill this in later
}

export async function getStaticProps() {
  const posts = listContentMetadata();
  return { props: { posts } };
}
```
We import the `listContentMetadata` function from the `utils/content-management` file we wrote earlier which gives us metadata like the title, slug, and an excerpt of all the blog posts.

The `posts` prop passed into `Blog` looks like:

```jsx
[
  {
    title: "Obi-Wan's Journal",
    slug: 'obi-wans-journal',
    excerpt: "Keeping track of things I do as a Padawan.",
  },
  ... // More posts will be added to this array when you create more blog post files
]
```

Let's now display the titles and excerpts for the list of posts where clicking on the title of the post would take us to the page for the respective blog post.

```jsx
...

export default function Blog({ posts }) {
  return (
    posts.map(({ title, slug, excerpt }) => (
      <a href={`/blog/${slug}`}>
        <h1>{title}</h1>
        <p>{excerpt}</p>
      </a>
    ))
  );
}

export async function getStaticProps() {
  ...
}
```

You should see your only blog post titled **Obi Wan's Journal** along with its excerpt rendered on the page. When you click on the text, it should take you to `/blog/obi-wans-journal`, which we'll work on next.

![](/blog/build-your-own-blog-1/index.png)

Your final `pages/blog/index.js` file should look like this:

```jsx
import { listContentMetadata } from 'utils/content-management';

export default function Blog({ posts }) {
  return (
    posts.map(({ title, slug, excerpt }) => (
      <a href={`/blog/${slug}`}>
        <h1>{title}</h1>
        <p>{excerpt}</p>
      </a>
    ))
  );
}

export async function getStaticProps() {
  const posts = listContentMetadata();
  return { props: { posts } };
}
```

### Viewing a Blog Post

We'll start by creating a `pages/blog/[slug].js` file. This is an example of a Next dynamic route, meaning any path `/blog/example-post` or `/blog/obi-wans-journal` will be passed to the `pages/blog/[slug].js` page with the matching param getting passed as a query parameter. For more details on Next dynamic routes, you can view the [official documentation](https://nextjs.org/docs/routing/dynamic-routes).

With respect to viewing our blog post, the slug parameter specifies which Markdown file we are reading for the blog post. We'll use the same `getStaticProps` concept that we used above to fetch the blog content at build time, but since this is a dynamic route, we also have to implement `getStaticPaths`.

Since `pages/blog/[slug].js` is dynamic, it needs to know which paths should be built as HTML during build time. `getStaticPaths` returns an object with two required keys: `paths` and `fallback`.

* `paths` - An array of the pages that should be statically built specifying their params. Here's an example for our situation:
  ```jsx
  {
    paths: [
      { params: { slug: 'obi-wans-journal' } },
      { params: { slug: 'example-post' } },
      ... // Any additional blog posts you make
    ],
    ...
  }
  ```
* `fallback` - If `fallback` is set to false, then going to a page not statically built (in our case, anything besides `obi-wans-journal`) would result in a `404 not found`.

Now that we understand `getStaticProps` and `getStaticPaths`, let's implement our blog post page.

First, we need to implement one more helper function in `utils/content-management.js` to get a list of all the slugs we need for `getStaticPaths`.

```jsx
...

export const listContent = () => {
  const files = listMarkdownFiles();
  return files.map((filename) => filename.replace('.md', ''));
};
```

This is the final addition to our content management library, so the final `utils/content-management.js` file should look like this:

```jsx
import fs from 'fs';
import matter from 'gray-matter';
import { v4 as uuid } from 'uuid';

const listMarkdownFiles = () => {
  const files = fs.readdirSync(`${process.cwd()}/content/blog`);
  return files.filter((filename) => filename.endsWith('.md'));
};

export const getContent = (filename) => {
  const markdownWithMetadata = fs
    .readFileSync(`${process.cwd()}/content/blog/${filename}`)
    .toString();
  return matter(markdownWithMetadata);
};

export const listContentMetadata = () => {
  const files = listMarkdownFiles();

  return files.map((filename) => {
    const { data } = getContent(filename);
    return { ...data, id: uuid() };
  });
};

export const listContent = () => {
  const files = listMarkdownFiles();
  return files.map((filename) => filename.replace('.md', ''));
};
```

Now we use `listContent` in `getStaticPaths` to get the list of pages to build and read the blog content in `getStaticProps`.

```jsx
import { getContent, listContent } from 'utils/content-management';

export default function Post({ content, frontmatter }) {
  ... // Fill this out later, we will
}

export async function getStaticProps({ params: { slug } }) {
  const { data: frontmatter, content } = getContent(`${slug}.md`);
  return { props: { content, frontmatter } };
}

export async function getStaticPaths() {
  const markdownFilenames = listContent();

  return {
    paths: markdownFilenames.map((filename) => ({
      params: { slug: filename },
    })),
    fallback: false,
  };
}
```

Now in our `Post` component, we have the content and frontmatter from the blog post specified by the slug.

We'll use `react-markdown` to take the Markdown content and convert it to HTML. Let's fill out the rest of the `Post` component to render your content.

```jsx
import ReactMarkdown from 'react-markdown';
...

export default function Post({ content, frontmatter }) {
  const { title } = frontmatter;

  return (
    <>
      <h1>{title}</h1>
      <ReactMarkdown
        escapeHtml={false}
        source={content}
      />
    </>
  );
}

export async function getStaticProps({ params: { slug } }) {
  ...
}

export async function getStaticPaths() {
  ...
}
```

Now when you navigate to [localhost:3000/blog/obi-wans-journal](http://localhost:3000/blog/obi-wans-journal), you should see your post.

![](/blog/build-your-own-blog-1/slug.png)

Your final `pages/blog/[slug].js` file should look like this:

```jsx
import ReactMarkdown from 'react-markdown';
import { getContent, listContent } from 'utils/content-management';

export default function Post({ content, frontmatter }) {
  const { title } = frontmatter;

  return (
    <>
      <h1>{title}</h1>
      <ReactMarkdown
        escapeHtml={false}
        source={content}
      />
    </>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const { data: frontmatter, content } = getContent(`${slug}.md`);
  return { props: { content, frontmatter } };
}

export async function getStaticPaths() {
  const markdownFilenames = listContent();

  return {
    paths: markdownFilenames.map((filename) => ({
      params: { slug: filename },
    })),
    fallback: false,
  };
}
```

That's it - we've taken content from our file system, successfully created an index page to navigate all our blog posts, and created a view for the content of individual posts.

The blog currently looks quite rudimentary, so BYOB Part 2 will cover using Tailwind CSS to make your blog look more like a modern website.