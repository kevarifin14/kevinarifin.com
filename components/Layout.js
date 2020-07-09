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