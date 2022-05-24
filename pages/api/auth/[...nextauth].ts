import { apolloClient } from "contexts/apollo";
import {
  UpsertUserDocument,
  UpsertUserMutation,
  UpsertUserMutationVariables,
} from "generated";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  events: {
    async signIn({ user, account }) {
      if (account.provider === "google" && user) {
        await apolloClient.mutate<
          UpsertUserMutation,
          UpsertUserMutationVariables
        >({
          mutation: UpsertUserDocument,
          variables: { email: user.email! },
        });
      }
    },
  },
});
