import Router from 'next/router';

// Track client-side page views with Segment
Router.events.on('routeChangeComplete', (url) => {
  if (process.env.NODE_ENV == 'production') {
    window.analytics.page(url);
  }
});

export default function Page({ children }) {
  return children;
}
