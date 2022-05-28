export default function OpenGraph() {
  return (
    <head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/assets/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/assets/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/assets/favicons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/assets/favicons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <link rel="shortcut icon" href="/assets/favicons/favicon.ico" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta
        name="msapplication-config"
        content="/assets/favicons/browserconfig.xml"
      />
      <meta name="theme-color" content="#FF6B6B" />
      {/* OpenGraph & Twitter stuff */}
      <meta property="og:site_name" content={`Ash "Monty"`} />
      <meta property="og:title" content={`Ash "Monty"`} />
      <meta property="twitter:title" content={`Ash "Monty"`} />
      <meta
        property="twitter:description"
        content="I make stuff™ in JavaScript."
      />
      <meta property="og:description" content="I make stuff™ in JavaScript." />
      <meta property="og:url" content="https://ashmonty.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://ashmonty.com/assets/images/twimg.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://ashmonty.com/assets/images/twimg.png" />
      {/* Google SEO */}
      <meta name="description" content="I make stuff™ in JavaScript." />
      <meta name="robots" content="index, follow" />
    </head>
  );
}
