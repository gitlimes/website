export default function openGraph() {
  return (
    <div>
      {/* OpenGraph & Twitter stuff */}
      <meta property="og:site_name" content="Monty (montylion)" />
      <meta property="og:title" content="Monty (montylion)" />
      <meta property="twitter:title" content="Monty (montylion)" />
      <meta
        property="twitter:description"
        content="I make stuff™ in JavaScript."
      />
      <meta property="og:description" content="I make stuff™ in JavaScript." />
      <meta property="og:url" content="https://montylion.dev/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/opengraph.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="/opengraph.png" />
      {/* Google SEO */}
      <meta name="description" content="I make stuff™ in JavaScript." />
      <meta name="robots" content="index, follow" />)
    </div>
  );
}
