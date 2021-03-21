import Head from 'next/head';

import NotificationOverlay from 'components/NotificationOverlay';

import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({ children, showLogo, title }) {
  return (
    <>
      <Head>
        <title>{`${title} | Kevin Arifin`}</title>

        <link rel="icon" href="/favicon.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twcard" />
        <meta name="twitter:creator" content="@kevarifin" key="twcreator" />
        <meta name="twitter:title" content={`${title} | Kevin Arifin`} key="twtitle" />

        <meta property="og:url" content="kevinarifin.com" key="ogurl" />
        <meta property="og:site_name" content="Kevin Arifin" key="ogsitename" />
        <meta property="og:title" content={`${title} | Kevin Arifin`} key="ogtitle" />
      </Head>

      <div className="min-h-screen flex flex-col">

        <NotificationOverlay />

        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6">
          <Navbar showLogo={showLogo} />
          {children}
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Footer />
      </div>

    </>
  );
}
