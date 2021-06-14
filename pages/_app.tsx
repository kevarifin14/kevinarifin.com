import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { pageview } from 'utils/googleAnalytics';
import 'styles/index.scss';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      router.events.on('routeChangeComplete', pageview);
    }

    return () => {
      if (process.env.NODE_ENV === 'production') {
        router.events.off('routeChangeComplete', pageview);
      }
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <link rel="favicon" href="/logo.png" />
      </Head>

      <DefaultSeo
        title="Kevin Arifin"
        description="Kevin's home on the internet"
        openGraph={{
          title: 'Kevin Arifin',
          description: "Kevin's home on the internet",
          url: process.env.NEXT_PUBLIC_SITE,
          type: 'website',
        }}
        twitter={{
          site: 'Kevin Arifin',
          handle: '@kevarifin',
          cardType: 'summary',
        }}
      />

      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
