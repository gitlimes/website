module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  optimizeFonts: false,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };

    return config;
  },
  async redirects() {
    return [
      {
        source: '/WIIU',
        destination: '/wiiu',
        permanent: true,
      },
    ]
  },

};
