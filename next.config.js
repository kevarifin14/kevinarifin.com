module.exports = {
  async redirects() {
    return [
      {
        source: '/tb',
        destination: '/newsletter',
        permanent: true,
      },
      {
        source: '/tb/:slug',
        destination: '/newsletter/:slug',
        permanent: true,
      },
    ];
  },
};
