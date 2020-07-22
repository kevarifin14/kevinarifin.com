import Head from 'next/head'

import Navbar from './Navbar';
import { colors } from 'utils';

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
        <script dangerouslySetInnerHTML={{ __html: `
          !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var t=analytics.methods[e];analytics[t]=analytics.factory(t)}analytics.load=function(e,t){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+e+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=t};analytics.SNIPPET_VERSION="4.1.0";
          analytics.load("RohLHDPf32AKxOig08ifIW5fN1OcB05n");
          analytics.page();
          }}();
        `}} />

        <meta property="og:url" content="kevinarifin.com" key="ogurl" />
        <meta property="og:site_name" content="Kevin Arifin" key="ogsitename" />
        <meta property="og:title" content={`${title} | Kevin Arifin`} key="ogtitle" />
        <meta property="og:description" content="Kevin's personal website" key="ogdesc" />
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
        html, body {
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

        code {
          background: rgb(233, 232, 231);
          padding: 0.2em 0.4em;
          color: #EB5757;
          border-radius:3px;
        }

        td {
          border-bottom: 0;
        }

        .markdown-body {
          font-family: inherit;
          margin: auto;
        }

        p, li, a {
          font-size: 16px;
          line-height: 1.5;
        }

        .markdown-body h1, .markdown-body h2 {
          border-bottom: none;
        }

        .markdown-body img {
          max-width: 100%;
        }

        .markdown-body pre {
          overflow-x: auto;
          width: 85vw;
          max-width: 100%;
          margin: auto;
        }

        blockquote {
          border-left: solid black;
          padding: 0.01em 0 0.01em 1em;
          margin: 0;
        }

        .markdown-body summary {
          cursor: pointer;
          outline: none;
          padding: 0.5em 0;
        }

        .markdown-body a {
          color: ${colors.blue};
        }

        .markdown-body a:visited {
          color: ${colors.blue};
        }

      `}</style>
    </div>
  );
}