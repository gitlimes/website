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
        source: "/repo",
        destination: "https://github.com/gitlimes/website",
        permanent: false,
      },
      {
        source: "/masto",
        destination: "https://tech.lgbt/@ashg",
        permanent: false,
      },
      {
        source: "/mastodon",
        destination: "https://tech.lgbt/@ashg",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/(e|E)(r|R)(r|R)(o|O)(r|R)(s|S)',
        destination: '/errors',
      }
    ]
  }
};
