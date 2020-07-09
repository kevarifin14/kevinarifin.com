import Head from 'next/head'

import Navbar from './Navbar';

export default function Layout({ children, showLogo, title }) {
  return (
    <div className="container">
      <Head>
        <title>{`${title} | Kevin Arifin`}</title>

        <link rel="icon" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />

        <meta name="twitter:card" content="https://kevinarifin.com/favicon.png" key="twcard" />
        <meta name="twitter:creator" content="kevarifin" key="twhandle" />

        <meta property="og:url" content="kevinarifin.com" key="ogurl" />
        <meta property="og:image" content="https://kevinarifin.com/favicon.png" key="ogimage" />
        <meta property="og:site_name" content="Kevin Arifin" key="ogsitename" />
        <meta property="og:title" content={`${title} | Kevin Arifin`} key="ogtitle" />
        <meta property="og:description" content="Kevin's Personal Website" key="ogdesc" />
      </Head>

      <Navbar showLogo={showLogo} />

      {children}

      <footer>
        <p>Copyright © 2020 Kevin Arifin</p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Open Sans,-apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        hr {
          background-color: #eaeaea;
          height: 2px;
          border-width: 0;
        }
      `}</style>
    </div>
  );
}