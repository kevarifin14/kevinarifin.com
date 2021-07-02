export const pageview = (url) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, params }: { action: string, params?: any }) => {
  window.gtag('event', action, params);
};
