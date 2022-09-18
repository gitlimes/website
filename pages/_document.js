import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-theme="dark">
      <Head>
        {/* Google SEO */}
        <meta name="description" content="I make stuff™ in JavaScript." />
        <meta name="robots" content="index, follow" />
        <link rel="stylesheet" href="https://use.typekit.net/mbh0dyp.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
