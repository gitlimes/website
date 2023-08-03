module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  optimizeFonts: false,
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
        destination: "https://fedi.limes.pink/@limes",
        permanent: false,
      },
      {
        source: "/mastodon",
        destination: "https://fedi.limes.pink/@limes",
        permanent: false,
      },
      {
        source: "/fedi",
        destination: "https://fedi.limes.pink/@limes",
        permanent: false,
      },
      {
        source: '/.well-known/webfinger/:path*',
        destination: 'https://fedi.limes.pink/.well-known/webfinger/:path*',
        permanent: true
      }
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
