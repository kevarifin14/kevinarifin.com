---
title: Next.js from Zero to Production
slug: next-from-zero-to-production
date: '2020-07-16'
---
# Next.js from Zero to Production

As a technical co-founder, it's important to quickly get a user interface off the ground. Whether as a quick way to interface with an internal SQL database, build a marketing page for your project, or develop a custom interface for your product, frontend development gets your product in the hands of your customers, technical or non-technical, get feedback, and allows you to quickly iterate.

I've dabbled in various frontend frameworks (such as pure React, Gatsby, Next, Jekyll), but I've found Next to be the simplest framework to quickly design, build, and deploy.

Next.js is a React framework that hides a lot of the configuration (Babel, Webpack, routing) from the developer. This post consists of three parts:

1. Getting started with your first Next app.
2. Making a simple change.
3. Deploying to production.

The post will cover the end-to-end process of developing with Next on a high-level. However, I'll sprinkle in common questions I faced as I learned Next/React to dig into some of the details and expand on larger topics in future posts.

Before you move on, I'm assuming a baseline understanding of HTML/CSS and a familiarity with React/Javascript.

## Getting Started

To create your Next app, run the following command in your terminal. Follow the prompts to name your app and pick a template (for the sake of this tutorial, pick the `Default starter app`).

```
npx create-next-app
```

<details>
<summary>I don't have Node/npm installed. What do I do?</summary>
  `npm` (node package manager) comes installed with Node.js. You can find instructions to download Node.js [here](https://www.npmjs.com/get-npm).
</details>

<details>
  <summary>What is npx?</summary>
</details>

Once the command finishes, you'll find a project structured like so:

```bash
public/ # Static files like images
pages/ # React component associated with a route
	api/ # Complicated
	index.js # The React component
package.json # Project metadata and package dependencies
node_modules/ # Where npm packages are installed
```

<details>
  <summary>What's a React component?</summary>
  A React component is a Javascript function or class that returns HTML.
</details>

To test that your setup worked, run:

```bash
npm run dev
```

If the setup worked correctly, you should find your project that looks like this at `localhost:3000`.

<!-- ![Next%20js%20from%20Zero%20to%20Production%20ad100238c98e4df49d8042bda2598439/Screen_Shot_2020-07-15_at_12.00.56_AM.png](/blog/next-from-zero-to-production/Screen_Shot_2020-07-15_at_12.00.56_AM.png) -->

Congrats - you got your first Next project off the ground!

# Making Your First Change

We'll make our first change to the Next app in the `pages/index.js` file. Each Javascript file in the `pages` directory maps to a browser route. For example, `pages/index.js` maps to the root path `/`, `pages/about.js` would map to `/about`, and `pages/blog/index.js` would map to `/blog`.

Let's open `pages/index.js`. You should find a Javascript function like so:

```jsx
import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
				...
```

- [How does the `index.js` file work?](https://stackoverflow.com/questions/44092341/how-do-index-js-files-work-in-react-component-directories)

`index.js` allows you to import the part folder as a module.

Considering the following directory structure:

```bash
components/
  Button/
    index.js
  Navbar/
    index.js
```

You would import the `Button` component like so:

```jsx
// components/Navbar/index.js

import Button from 'components/Button';

export default function Navbar() {
  ...
}
```

<details>
  <summary>How does `import` and `export` work?</summary>

</details>

The HTML the function `Home` returns maps to the page in the image above. Let's customize the page to say "Welcome {Your Name}!" instead.

```jsx
import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome Kevin!
        </h1>
        ...
      </main>
    </div>
  );
}
```

<!-- ![Screen_Shot_2020-07-15_at_12.55.41_AM.png](/blog/next-from-zero-to-production/Screen_Shot_2020-07-15_at_12.55.41_AM.png) -->

# Deploying to Production

If you're using Next 9 with dynamic routes, you'll need to use the latest `serverless-nextjs` plugin.

1. Create a `serverless.yml` file with the following:

    ```bash
    # serverless.yml
    myNextApplication:
      component: "@sls-next/serverless-component"
    ```

2. Make sure your AWS credentials are set in the environment or configured with Serverless.
3. To deploy, simply run:

    ```bash
    serverless
    ```

If you're using AWS Route53 for DNS hosting, it's easy to set up a custom domain in the `serverless.yml`. If not, you probably just want to set up a custom domain in CloudFront.

If you're using Google Domains and want to set up DNS configuration for your CloudFront instance, you'll have to set up a synthetic forward to a subdomain. [Here are some good AWS docs for that.](https://docs.aws.amazon.com/amplify/latest/userguide/to-add-a-custom-domain-managed-by-google-domains.html)

# Nice-to-Haves

## Absolute Imports

## ESLint
