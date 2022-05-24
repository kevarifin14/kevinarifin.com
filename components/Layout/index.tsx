import { useMetadataContext } from "contexts/metadata";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { name } = useMetadataContext();

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <main className="min-h-screen">
        <Navbar />

        {children}
      </main>
      <Footer />
    </>
  );
}

export const getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
