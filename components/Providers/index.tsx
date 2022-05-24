import { ApolloClientProvider } from "contexts/apollo";
import { MetadataProvider } from "contexts/metadata";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
  session: Session;
};

export function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <MetadataProvider>
        <ThemeProvider attribute="class">
          <ApolloClientProvider>{children}</ApolloClientProvider>
        </ThemeProvider>
      </MetadataProvider>
    </SessionProvider>
  );
}
