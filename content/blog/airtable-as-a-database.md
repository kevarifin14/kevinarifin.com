---
title: Airtable as a Database
slug: airtable-as-a-database
date: '2020-08-06'
type: technical
---

In today's post, I'll show how to use Airtable as an alternative database to quickly get an MVP off the ground. Airtable is basically an excel spreadsheet with an API built on top of it. Compared to more common database solutions like a relational database (Postgres) or a document store (MongoDB), Airtable has a few advantages around building an MVP:

- Connecting to Airtable is easy - no dealing with AWS, connection strings, or IP address whitelisting. Just create an Airtable Base, get an API key and you're good to go.
- Airtable gives you a pre-built interface to view your data. Filters, hiding columns, aggregations - all that good stuff is ready out of the box.
- Added bonus - if you have a non-technical co-founder working with you, Airtable is much more user-friendly than a relational database or document store. This makes it easier for them to help you manage and analyze data you collect.

However, I don't advise using Airtable for anything more complicated than a nice wrapper around your data with a simple form - basically an MVP with an easy-to-access database.

Airtable is both not performant (Airtable limits you to 5 API calls per second), has a relatively small storage limit (1,200 records for the free tier) and isn't made for complex data modeling compared to a document store or a relational data model.

With that in mind, let's build an MVP with Airtable. We're going to build a simple app where visitors of the app can submit what stocks they're thinking about buying and selling and view all the submissions.

I'm assuming you have some familiarity with Next - if not, check out my post [Next.js from Zero to Production](https://kevinarifin.com/blog/next-from-zero-to-production). Otherwise, let's get started.

# Set Up Airtable in 3 Easy Steps

1. [Create an account](https://airtable.com/signup).

    ![](/blog/airtable-as-a-database/airtable-home.png)

2. [Add a base](https://airtable.com).

    ![](/blog/airtable-as-a-database/airtable-home.png)

3. [Generate your API keys](https://airtable.com/account). (Be sure to note the generated API key for later)

    ![](/blog/airtable-as-a-database/airtable-account.png)

# Building the Airtable

> ### Defining Airtable Terminology
>
> **Base:** A collection of data tables (basically an Excel file).
>
> **Table:** Rows and columns of data found on a single page of a base. Basically a single tab/sheet in an Excel file.
>
> **Record:** A single row of data in a table.

We want to make a simple app that allows people to enter stocks that they're thinking of buying and selling. So that means we need to add a Table to our Base with three columns:

- Name (of the person of who's submitting the data)
- Ticker (the stock symbol they're looking at)
- Buy or Sell? (if they're buying or selling the stock)

I'll leave it as an exercise to the reader to build the Table. I've added a dummy entry, but the end result should look like this:

![](/blog/airtable-as-a-database/airtable-base.png)

# Connect to Airtable

It's now time to get our app connected to our Airtable database. Let's clone an empty Next skeleton project to get started.

```bash
# get the Next skeleton
git clone -b skeleton https://github.com/kevarifin14/next-templates.git ticker-tracker
# install dependencies
npm install
```

We'll now install Airtable's Javascript client.

```bash
npm install --save airtable
```

Airtable automatically generates docs for your Airtable Base which you can find [here](https://airtable.com/api). Also in the docs, you'll find the ID for your Base.

![](/blog/airtable-as-a-database/airtable-base-id.png)

Create a `.env.local` to store your API keys and Base ID.

```bash
AIRTABLE_API_KEY=your-airtable-api-key
AIRTABLE_BASE_ID=your-airtable-base-id
```

> ### Managing Environment Variables in Next
> Next allows to you to easily manage environment variables in .env files. You can then access them in server-side code in `process.env`. If you need an environment variable available on the client side, append `NEXT_PUBLIC` to your environment variable. Set the default environment variables in:
- `.env` (all environments),
- `.env.development` (development)
- `.env.production`(production)
- `.env.local` overrides all defaults.
>
> `.env`, `env.development`, and `env.production` files should be committed with your code as they define defaults. `.local` variables should be ignored - add `.env*.local` to your `.gitignore`.

Let's spin up our local Next instance.

```bash
npm run dev
```

Since we haven't made any changes, visiting [localhost:3000](http://localhost:3000) should show a blank page. Let's now get our data from Airtable.

If you open `pages/index.js`, you should see this:

```jsx
export default function Home() {
  return (
    <div>
    </div>
  )
}
```

We want to fetch our Airtable data from the server and pass it to our component when it renders. If you export an `async` function `getServerSideProps`, you can fetch data at request time and pass it to your component.

Let's make use of this functionality to fetch data from Airtable. First let's create an Airtable client. We installed Airtable's Javascript earlier so we can import the package and create a new connection with our database.

```jsx
// pages/index.js

import Airtable from 'airtable';

...

// Runs when a request is made to your root endpoint
export async function getServerSideProps() {
  // Create a new connection to Airtable with your API key
  const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });

  // Tell your client which Base and Table to connect to
  const database = airtable.base(process.env.AIRTABLE_BASE_ID)('Submissions');
}

```

Now that the variable `database` has opened a connection to the table we want to read from, we can use the built-in functions. An instance of a Table connection has the follow methods:

- `select`: Gets a list of all the Records
- `find`: Finds a specific Record by Record ID
- `create`: Creates a new Record
- `update`: Updates an existing Record by Record ID
- `delete`: Deletes an existing Record by Record ID

As mentioned above, Airtable automatically generates docs for your Airtable Base which you can find [here](https://airtable.com/api).

In this instance, we care about the `select` method. Since we want to get all entries in the the Airtable, we don't have to pass any parameters into the `select` method. `select` returns a query that allows us to paginate through the return Records or return all the Records. Let's not worry about optimizing our code just yet, so we'll just get all the Records.

```jsx
...
export async function getServerSideProps() {
  ...
  // select returns a query - use the all function to resolve all Records
  const records = await database.select().all();
  ...
};
```

Now we have the list of Airtable Records, we need to convert the data to Javascript objects.

```jsx
export async function getServerSideProps() {
  ...
  // records is a list of Airtable Record objects
  const data = records.map((record) => ({
    name: record.get('Name'),
    ticker: record.get('Ticker'),
    buyOrSell: record.get('Buy or Sell?'),
  }));

  // pass the data from Airtable to the component props
  return { props: { data } };
};
```

Finally, `data` is passed as a prop to the `Home` component. To keep things simple, let's just render a string of the data we want to show. This is the complete API route for selecting from our Airtable database.

```jsx
import Airtable from 'airtable';

export default function Home({ data }) {
  return (
    <div>
      {data.map(({ name, ticker, buyOrSell }) => (
        <p>{`${name} ${ticker} ${buyOrSell}`}</p>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
  const database = airtable.base(process.env.AIRTABLE_BASE_ID)('Submissions');

  const records = await database.select().all();
  const data = records.map((record) => ({
    name: record.get('Name'),
    ticker: record.get('Ticker'),
    buyOrSell: record.get('Buy or Sell?'),
  }));

  return { props: { data } };
}
```

If you refresh [localhost:3000](http://localhost:3000), you should see the test entry.

![](/blog/airtable-as-a-database/select-screen.png)

# Make a New Entry

Now that we can view the entries, how do we allow others to add entries? We'll make use of the `create` function on the Airtable client. Let's start by creating an API endpoint for creation.

```jsx
// pages/api/airtable/create.js

import Airtable from 'airtable';

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
const database = airtable.base(process.env.AIRTABLE_API_KEY)('Submissions');
...
```

API routes in Next are Express-like functions that take in a request (`req`) and a response (`res`) and allow you to run server-side (or backend) functions. Typically, it's used to make interact with an external client, which is exactly what we want to do.

```jsx
...

export default async (req, res) => {
  ...
};
```

We've set up `database` as our Airtable client. We'll assume that the request body is JSON of the list Records we want to create. The `create` function expects a list of objects in the following form:

```jsx
{
  fields: {
    'Field 1': fieldValue1,
    'Field 2': fieldValue2,
    ...
  }
}
```

We'll pull that off of the request body (more on how to pass the `createList` into the request body later).

```jsx
export default async (req, res) => {
  const { createList } = req.body;
  database.create(createList);
  return res.status(201);
};
```

The final code for `pages/api/airtable/create` looks like this:

```jsx
// pages/api/airtable/create

import Airtable from 'airtable';

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
const database = airtable.base(process.env.AIRTABLE_BASE_ID)('Submissions');

export default async (req, res) => {
  const { createList } = req.body;
  database.create(createList);
  return res.status(201);
};
```

Let's now make a simple form that posts data to this API endpoint. I don't want to spend too much time detailing all the pieces of the code so I'll start with the final product and break down the relevant parts.

```jsx
// pages/create.js

import { useState } from 'react';

export default function Create() {
  const [name, setName] = useState();
  const [ticker, setTicker] = useState();
  const [buyOrSell, setBuyOrSell] = useState();

  const fields = [
    {
      label: 'Name',
      value: name,
      onChange: (e) => setName(e.target.value),
    },
    {
      label: 'Ticker',
      value: ticker,
      onChange: (e) => setTicker(e.target.value),
    },
    {
      label: 'buyOrSell',
      value: buyOrSell,
      onChange: (e) => setBuyOrSell(e.target.value),
    },
  ];

  const submit = () => {
    const body = JSON.stringify({
      createList: [{
        fields: {
          'Name': name,
          'Ticker': ticker,
          'Buy or Sell?': buyOrSell,
        }
      }],
    });

    fetch(
      '/api/airtable/create',
      { method: 'POST', body, headers: { 'Content-Type': 'application/json' } },
    );
  }

  return (
    <form onSubmit={submit}>
      {fields.map(({ label, value, onChange }) => (
        <>
          <label>{`${label}: `}</label>
          <input value={value} onChange={onChange} />
        </>
      ))}
      <button type="submit">Create</button>
    </form>
  )
}
```

The part we care about is form submission. The `submit` function runs when you click the **Submit** button on the form.

First, we construct the `createList`. For our particular Table, we have three columns: "Name", "Ticker", and "Buy or Sell?". Our the Airtable `create` function will expect an object with those keys and the values we submitted. `JSON.stringify` converts the object to a JSON string, which can be passed in as the request body.

Second, we make a POST request to the API endpoint we just created. We pass in the JSON body containing the `createList`. Be sure to add `{ 'Content-Type': 'application/json' }` to the headers so the API knows how to parse the request body.

```jsx
const submit = () => {
  // Construct the request body with the corresponding column names
  const body = JSON.stringify({
    createList: [{
      fields: {
        'Name': name,
        'Ticker': ticker,
        'Buy or Sell?': buyOrSell,
      }
    }],
  });

  // Make a POST request to the endpoint with the createList
  fetch(
    '/api/airtable/create',
    { method: 'POST', body, headers: { 'Content-Type': 'application/json' } },
  );
}

```

Now if we head to [http://localhost:3000/create](http://localhost:3000/create), we'll see an ugly form like so:

![](/blog/airtable-as-a-database/create-form.png)

If we input data and hit submit, we should see it show up in our Table.

![](/blog/airtable-as-a-database/airtable-create-result.png)

That's it - we've successfully integrated a Next app with Airtable to both view data and add new Records.

- [Live example](https://nextjs-getting-started-git-ticker-tracker.kevarifin14.vercel.app)
- [Source code](https://github.com/kevarifin14/nextjs-getting-started/tree/ticker-tracker)