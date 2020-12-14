---
title: Getting Started with Next + Jest
slug: getting-started-with-next-jest
date: '2020-12-03'
type: technical
excerpt: A modular approach to setting up Jest for your Next project.
related: blog/next-from-zero-to-production
---
Jest is a testing framework for JavaScript. I found setting up tests in Next to be particularly difficult, with an overload of online resources that added a little too much configuration.

In this post, I'll start with the bare minimum implementation of adding Jest to a Next project and adding on layers from there. Each section will be tagged from Required → Recommended → Nice-To-Have so you can easily figure out which layers of Jest you'll need for your project.

## Setup (Required)

1. Install `jest`.

    ```bash
    npm i -D jest
    ```

2. Add the test script to your`package.json` in the `scripts` section.

    ```json
    // package.json

    ...
    "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "test": "jest"
    }
    ...
    ```

### Example

Let's run through a simple example to make sure our setup worked. We'll create a dummy unit test.

1. By default, [Jest runs all files matching](https://jestjs.io/docs/en/configuration#testmatch-arraystring) `*/__tests__/**/*.[jt]s?(x)` (e.g. `__tests__/utils/index.js`) or `*/?(*.)+(spec|test).[jt]s?(x)` (e.g. `utils/index.test.js`). Create our testing file`__tests__/index.js` with the following contents:

    ```jsx
    // __tests__/index.js

    describe('dummy', () => {
      it('I can multiply', async () => {
        expect(5 * 5).toEqual(25);
      });
    });
    ```

    Note: `it` [is an alias](https://jestjs.io/docs/en/api.html#testname-fn-timeout) for `test` so they can be used interchangeably

2. Run the test:

    ```bash
    npm test
    ```

3. You should see the following output:

    ![test-terminal](getting-started-with-next-jest/test-terminal.png)

## Use ES6 Syntax (Recommended)

While Next  automatically includes the `next/babel` preset in your app, Jest does not. If you use ES6 syntax that's common in Next in your tests (you probably do if you use `import` instead of `require`), you'll need to create a `.babelrc`. Otherwise, Jest won't be able to parse the tests.

![babel-error](getting-started-with-next-jest/babel-error.png)

In order to support ES6 syntax, create `.babelrc` with the following contents:

```
// .babelrc

{
    "presets": ["next/babel"]
}
```

### Example

Let's build off of our previous example to check that our `.babelrc` works. We'll make a simple function that multiplies by 5 in the `utils` directory:

```jsx
// utils/index.js

export const mul5 = (x) => return x * 5;
```

You should now be able to import the `mul5` function from `utils`:

```jsx
// __tests__/index.js

import { mul5 } from '../utils';

describe('mul5', () => {
  it('I can multiply by 5', async () => {
    expect(mul5(5)).toEqual(25);
  });
});
```

## Absolute Imports (Nice-To-Have)

If you use absolute imports (with your `jsconfig.json` set like below), you'll need to configure Jest to support absolute imports.

```json
// jsconfig.json

{
  "compilerOptions": {
    "baseUrl": ".",
  }
}
```

If you haven't yet, create a `jest.config.js` at the root of your project. We'll need to add `moduleNameMapper` to the config, a map of regular expressions to the module (or modules if it's an array) you'd like to map to. If you use absolute paths to import `pages` and `utils`, then you'll want to set your `moduleNameMapper` like the one below:

```jsx
// jest.config.js

module.exports = {
	...
  moduleNameMapper: {
    '^pages/(.*)': '<rootDir>/pages/$1',
    '^utils/(.*)': '<rootDir>/utils/$1',
  }
	...
}
```

### Example

If you've set up absolute paths correctly, you should be able to change your import from `import { mul5 } from '../utils';` to `import { mul5 } from 'utils';`.

```jsx
// __tests__/index.js

import { mul5 } from 'utils';

describe('mul5', () => {
  it('I can multiply by 5', async () => {
    expect(mul5(5)).toEqual(25);
  });
});
```

## Environment Variables (Nice-To-Have)

`.env.local` won't be loaded because you expect tests to execute the same for everyone. In order to load `.env.test` and `.env.test.local` in Jest, add the following to `jest.config.js`:

```jsx
const { loadEnvConfig } = require('@next/env');

loadEnvConfig(process.env.PWD);

module.exports = {
...
```

### Example

Continuing our example above, let's say we store a secret number in the `.env.test`.

```
// .env.test

SECRET_NUMBER=69
```

You should now be able to load the secret number from `process.env.SECRET_NUMBER`:

```jsx
// __tests__/index.js

import { mul5 } from 'utils';

describe('mul5', () => {
  it('I can multiply by 5', async () => {
    expect(mul5(process.env.SECRET_NUMBER)).toEqual(345);
  });
});
```

## Watch (Nice-To-Have)

Add the `--watch` flag to your test script in `package.json`. [This will watch files for changes](https://jestjs.io/docs/en/cli#--watch) and rerun tests related to changed files.

```json
// package.json

...
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest --watch"
},
...
```

## Coverage (Nice-To-Have)

Add a new test coverage script to run `jest --coverage` flag to your test script in `package.json`. This will collect coverage information when you run your tests. Most likely, you don't want to run this every time you run tests, so we'll make a separate command for it:

```json
// package.json

...
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest --watch",
    "test:coverage": "jest --coverage"
},
...
```

To get coverage from files without tests yet, you'll need to add which files you want and don't want to collect coverage from: 

```javascript
// jest.config.js

module.exports = {
  ...
  collectCoverageFrom: [
    '**/*.js',
    '!**/.next/**',
    '!*.js',
    '!**/coverage/**',
    '!**/mocks/**',
  ],
  ...
};
```

Run:

```bash
npm run test:coverage
```

You should see output like the one below:

![coverage-terminal](getting-started-with-next-jest/coverage-terminal.png)

