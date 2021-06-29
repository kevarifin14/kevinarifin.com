import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api.notionql.com/graphql/b32a2734-366c-4800-a21a-7c9ca6241eea',
  cache: new InMemoryCache(),
});

export default {};
