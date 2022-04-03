import Head from "next/head";
import { ReactElement, ReactNode } from "react";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Providers } from "./Providers";

type LandingPageLayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LandingPageLayoutProps) {
  return (
    <Providers>
      <Head>
        <title>Kevin Arifin</title>
      </Head>

      <div className="min-h-screen">
        <Navbar />

        {children}
      </div>

      <Footer />
    </Providers>
  );
}

export const getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
