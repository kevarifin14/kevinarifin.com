import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { ReactNode } from "react";

export const createHasuraClient = () => {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_URL}/api/graphql`,
  });

  const link = ApolloLink.from([httpLink]);

  const cache = new InMemoryCache();
  return new ApolloClient({ link, cache });
};

export const apolloClient = createHasuraClient();

type ApolloClientProviderProps = {
  children: ReactNode;
};

export function ApolloClientProvider({ children }: ApolloClientProviderProps) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
