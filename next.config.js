module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };

    return config;
  },
};
