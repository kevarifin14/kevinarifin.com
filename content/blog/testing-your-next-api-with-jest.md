---
title: Testing Your Next API with Jest
slug: testing-your-next-api-with-jest
date: '2020-12-08'
type: technical
excerpt: Setting up a test Next server to write Jest tests for your API.
related: blog/next-from-zero-to-production, blog/getting-started-with-next-jest
---
Once you’ve set up [Jest to test your Next project](/blog/getting-started-with-next-jest), you may want to test your API endpoints. Writing tests for Next API endpoints requires some additional setup which I’ll walk through in this post.

## Install SuperTest

SuperTest is a module that allows you to pass in a Server or function to handle HTTP requests and make assertions on them. We’ll be using this to set up a test Next server.

To install SuperTest:

```bash
npm install supertest --save-dev
```

## Test Next Server

Create a test utilities library that spins up the server in `utils/tests/server.js`:

```jsx
// utils/tests/server.js

import { apiResolver } from 'next/dist/next-server/server/api-utils';
import supertest from 'supertest';

export const testNextServer = (handler) => {
	// 1. Function to forward req and res to Next's apiResolver
	const app = (req, res) => apiResolver(req, res, undefined, handler);

	// 2. Pass function to supertest
	return supertest(app);
};
```

1. `supertest` takes in a function which can forward the `req` and `res` a customer handler. To integrate this with Next, we forward the `req` and `res` to Next’s API handler `apiResolver`.
2. Passing the function to `supertest` allows us to call HTTP methods (that then get forwarded to our Next API handlers) and then make assertions to test the endpoint.

## Example API Test

Make a simple Next API handler that just returns status 200.

```jsx
// pages/api/example.js

export default function handler(req, res) {
	res.status(200);
  res.end();
}
```

Initialize a `testNextServer` with our `exampleHandler` to forward requests to the API endpoint we made above. We send a GET request and assert status 200.

```jsx
// __tests__/pages/api/example.js

import exampleHandler from 'pages/api/example';
import { testNextServer } from 'utils/tests/server';

describe('Next API', () => {
	it('/api/example 200', () => {
		const server = testNextServer(exampleHandler);

		server
			.get('/api/example')
			.expect(200);
	});
});
```