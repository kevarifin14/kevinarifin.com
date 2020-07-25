---
title: Next.js from Zero to Production
slug: next-from-zero-to-production
date: '2020-07-16'
type: technical
excerpt: An overview of getting a Next app off the ground. I go over creating a Next app, making a simple change, and then doing a serverless deploy with Vercel.
related: newsletters/57
---
As a technical co-founder, it's important to quickly get a user interface off the ground. Whether as a quick way to interface with an internal SQL database, build a marketing page for your project, or develop a custom interface for your product, frontend development allows you to get your product in the hands of your customers, technical or non-technical, and start the feedback loop of build, learn, and iterate.

I've dabbled in various frontend frameworks (such as pure React, Gatsby, Next, Jekyll), but I've found Next to be the simplest framework to quickly design, build, and deploy. Next.js is a React framework that hides a lot of the configuration (Babel, Webpack, routing, etc.) from the developer.

The goal of this post is to get you familiar with the end-to-end development cycle of a Next app. It will consist of three parts:

1. Getting started with your first Next app.
2. Making a simple change.
3. Deploying to production.

I assume a baseline understanding of HTML/CSS and a familiarity with React/Javascript. I'll sprinkle in common questions I faced as I learned Next/React to dig into some of the details.

## Getting Started

To create your Next app, run the following command in your terminal. Follow the prompts to name your app and pick a template (for the sake of this tutorial, pick the `Default starter app`).

```
npx create-next-app
```

> **I don't have Node/npm installed. What do I do?**
>
> npm (node package manager) comes installed with Node.js. You can find instructions to download Node.js [here](https://www.npmjs.com/get-npm).

> **What is npx?**
>
> npx is a npm package runner ("x" for execute). npx temporarily downloads and runs the package, like running the npm package create-next-app once to set up the Next project.

Once the command finishes, you'll find a project structured like so:

```bash
public/ # Static files like images
pages/ # React component associated with a route
	api/ # A more advanced topic I'll cover in a future post
	index.js # The React component
package.json # Project metadata and package dependencies
node_modules/ # Where npm packages are installed
```
> **What's a React component?**
>
> A React component is a Javascript function or class that returns HTML.

To test that your setup worked, run:

```bash
npm run dev
```

If the setup worked correctly, you should find your project that looks like this at `localhost:3000`.

![getting-started.png](/blog/next-from-zero-to-production/getting-started.png)

Congrats - you got your first Next project off the ground!

## Making Your First Change

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

> **How does the index.js file work?**
>
> `index.js` allows you to import the part folder as a module. Considering the following directory structure:
> ```bash
>  components/
>    Button/
>      index.js
>    Navbar/
>      index.js
> ```
>
> You would import the `Button` component like so:
> ```jsx
> import Button from 'components/Button';
>
> export default function Navbar() {
>  ...
> }
> ```
>
> **How does `import` and `export` work?**
>
> `export` allows other Javascript files to access your functions. There are two types of exports in React with corresponding import syntax.
>
> 1. Default export - each Javascript file can only have on default export.
>
>     ```jsx
>     // MyFunction.js
>
>     export default function MyFunction() {
>     	...
>     }
>     ```
>
>     ```jsx
>     import MyFunction from './MyFunction';
>     ```
>
> 2. Named export - Javascript files can have unlimited named exports.
>
>     ```jsx
>     // MyFunction.js
>
>     export function MyFunction() {
>     	...
>     }
>     ```
>
>     ```jsx
>     import { MyFunction } from './MyFunction';
>     ```

The HTML the function `Home` returns maps to the page in the image above. Let's customize the page to say "Welcome {Your Name}!" instead. In the `pages/index.js` file, change the title from "Welcome to Next.js" to "Welcome {Your Name}".

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

![getting-started-change.png](/blog/next-from-zero-to-production/getting-started-change.png)

You should now see the change live at `localhost:3000`. Many of the changes you make in a React app will be around modifying the returned HTML. However, instead of templating a static HTML file, React allows you to inject variables in your HTML, allowing you to develop more complex and custom interfaces. We'll stop here for today - you've successfully made your first change to your Next app! Time to move on to deploying your app.

## Deploying to Production

Deploying a project to the cloud is definitely something they don't teach you in school, but you can't run a project on localhost forever. Deploying an app can be a frustrating and time-consuming experience, which is why I want to cover this topic from the start to make it as seamless as possible for you.

We'll be deploying our project with [Vercel](https://vercel.com), which hosts single-page Javascript apps. For a small personal projects, Vercel is free and saves you the time of setting up AWS and Serverless. I'll cover recreating your own Vercel deployment using Serverless and AWS Lambda@Edge in a future post.

Deploying with Vercel is simple:
1. Create a [Github](https://github.com) (or [GitLab](https://about.gitlab.com) or [Bitbucket](https://bitbucket.org/product)) repo for your project.
2. Create a Vercel account and connect it to the Github account you created.
3. Copy and paste the URL of the Github repo you created and hit **Continue**.
4. Hit deploy and Vercel will start building your app - once it's done, hit **Visit** to view your live site and hit **View Dashboard** to see more details about your deployment.

![vercel-dashboard.png](/blog/next-from-zero-to-production/vercel-dashboard.png)

The demo app I've been working with is deployed at [nextjs-getting-started-chi.vercel.app](https://nextjs-getting-started-chi.vercel.app). You can also find the repo [here](https://github.com/kevarifin14/nextjs-getting-started) if you'd like to dig deeper into the example code.

As you continue to make changes to the repo, Vercel will handle continuous deployment to the live site as you push code to master.

That's it - you've taken your first Next app from zero to production. In future posts, I'll build on what we started here and explore more specific use cases for Next, like integrating an Airtable base, creating a personal blog, and starting a mailing list.