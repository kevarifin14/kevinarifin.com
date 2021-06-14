import Head from 'next/head';
import { ReactNode } from 'react';

import NotificationOverlay from 'components/NotificationOverlay';
import NotificationProvider from 'components/NotificationProvider';

import Footer from './Footer';
import Navbar from './Navbar';

type LandingPageLayoutProps = {
  children: ReactNode,
};

export default function Layout({ children }: LandingPageLayoutProps) {
  return (
    <NotificationProvider>

      <NotificationOverlay />

      <div>
        <Head>
          <title>Kevin Arifin</title>
        </Head>

        <div className="flex flex-col px-4 sm:px-6 lg:px-8">

          <main className="min-h-screen max-w-7xl w-full mx-auto">
            <Navbar />
            {children}
          </main>

          <Footer />

        </div>

      </div>
    </NotificationProvider>
  );
}

export const getLayout = (page) => <Layout>{page}</Layout>;
