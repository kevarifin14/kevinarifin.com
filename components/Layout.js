import Head from 'next/head';

import Navbar from './Navbar';

export default function Layout({ children, showLogo, title }) {
  return (
    <div className="min-h-screen flex flex-col py-2">
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

      <Navbar showLogo={showLogo} />

      {children}

      <footer>
        <p>Copyright © 2020 Kevin Arifin</p>
      </footer>

    </div>
  );
}
