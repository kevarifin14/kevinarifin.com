import Head from 'next/head';

import Navbar from './Navbar';

export default function Layout({ children, showLogo, title }) {
  return (
    <div className="min-h-screen flex flex-col py-2">
      <Head>
        <title>{`${title} | Kevin Arifin`}</title>

        <link rel="icon" href="/favicon.png" />

        {process.env.NODE_ENV == 'production'
          && (
          <script dangerouslySetInnerHTML={{
            __html: `
            !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var t=analytics.methods[e];analytics[t]=analytics.factory(t)}analytics.load=function(e,t){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+e+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=t};analytics.SNIPPET_VERSION="4.1.0";
            analytics.load("RohLHDPf32AKxOig08ifIW5fN1OcB05n");
            analytics.page();
            }}();
          `,
          }}
          />
          )}

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

    </div>
  );
}
