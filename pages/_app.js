import { useRouter } from 'next/router';
import { useEffect } from 'react';

import 'styles/index.scss';
import NotificationProvider from 'components/NotificationProvider';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeComplete = (url) => {
      if (process.env.NODE_ENV == 'production') {
        window.analytics.page(url);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  return (
    <NotificationProvider>
      <Component {...pageProps} />
    </NotificationProvider>
  );
}
