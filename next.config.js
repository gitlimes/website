const isProd = process.env.NODE_ENV === "production";

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
  assetPrefix: isProd ? "https://cdn.limes.pink" : undefined,
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
        source: "/rickroll",
        destination: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
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
        source: "/.well-known/webfinger/:path*",
        destination: "https://fedi.limes.pink/.well-known/webfinger/:path*",
        permanent: true,
      },
      {
        source: "/.well-known/fursona",
        destination: "/.well-known/fursona.json",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/(e|E)(r|R)(r|R)(o|O)(r|R)(s|S)",
        destination: "/errors",
      },
    ];
  },
};
