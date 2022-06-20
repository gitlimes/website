export default function OpenGraph({ darkMode }) {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/assets/favicons/apple-touch-icon.png?v=20220620"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/favicons/favicon-32x32.png?v=20220620"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/assets/favicons/favicon-16x16.png?v=20220620"
      />
      <link
        rel="manifest"
        href="/assets/favicons/site.webmanifest?v=20220620"
      />
      <link
        rel="mask-icon"
        href="/assets/favicons/safari-pinned-tab.svg?v=20220620"
        color="#ab7bcc"
      />
      <link
        rel="shortcut icon"
        href="/assets/favicons/favicon.ico?v=20220620"
      />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta
        name="msapplication-config"
        content="/assets/favicons/browserconfig.xml?v=20220620"
      />
      <meta name="theme-color" content="#ab7bcc" />
      {/* OpenGraph & Twitter stuff */}
      <meta property="og:site_name" content={`ash`} />
      <meta property="og:title" content={`ash`} />
      <meta property="twitter:title" content={`ash`} />
      <meta
        property="twitter:description"
        content="I make stuff™ in JavaScript."
      />
      <meta property="og:description" content="I make stuff™ in JavaScript." />
      <meta property="og:url" content="https://ashm.dev/" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://ashm.dev/assets/images/twimg.png"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:image"
        content="https://ashm.dev/assets/images/twimg.png"
      />
    </>
  );
}
