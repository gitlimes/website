export default function OpenGraph() {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/assets/favicons/apple-touch-icon.png?v=220918"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/favicons/favicon-32x32.png?v=220918"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/assets/favicons/favicon-16x16.png?v=220918"
      />
      <link rel="manifest" href="/assets/favicons/site.webmanifest?v=220918" />
      <link
        rel="mask-icon"
        href="/assets/favicons/safari-pinned-tab.svg?v=220918"
        color="#ab7bcc"
      />
      <link rel="shortcut icon" href="/assets/favicons/favicon.ico?v=220918" />
      <meta name="msapplication-TileColor" content="#ff5da2" />
      <meta
        name="msapplication-config"
        content="/assets/favicons/browserconfig.xml?v=220918"
      />
      <meta name="theme-color" content="#ff5da2" />
      {/* OpenGraph & Twitter stuff */}
      <meta property="og:site_name" content={`limes.pink`} />
      <meta property="og:url" content="https://limes.pink/" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
