export default function OpenGraph({ darkMode }) {
  return (
    <>
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
      <meta name="theme-color" content={ darkMode ? "#271322" : "#FF6B6B" } />
      {/* OpenGraph & Twitter stuff */}
      <meta property="og:site_name" content={`Ash "Monty"`} />
      <meta property="og:title" content={`Ash "Monty"`} />
      <meta property="twitter:title" content={`Ash "Monty"`} />
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
