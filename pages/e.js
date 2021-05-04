import Head from "next/head";
import "98.css";
const atob = require("atob");
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getServerSideProps({ query }) {
  let queries = decodeURI(atob(query.e));

  let queryObject = {};
  let pairs = queries.replace(/^\?/, "").split("&");
  for (var i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split("=");
    queryObject[pair[0]] = decodeURI(atob(pair[1]));
  }
  queryObject.bigImg = queryObject.bigImg == "true";

  let propsStuff = {};
  propsStuff.url = queryObject.url || "";
  if (queryObject.header) {
    propsStuff.head = <meta property="og:site_name" content={queryObject.header} />;
  }
  if (queryObject.title) {
    propsStuff.title = <meta property="twitter:title" content={queryObject.title} />;
  }
  if (queryObject.desc) {
    propsStuff.desc = <meta name="twitter:description" content={queryObject.desc} />;
  }
  if (queryObject.img) {
    propsStuff.img = <meta property="og:image" content={queryObject.img} />;
  }
  if (queryObject.bigImg) {
    propsStuff.bigImg = <meta name="twitter:card" content="summary_large_image" />;
    propsStuff.img = <meta name="twitter:image" content={queryObject.img} />;
  }
  console.log(propsStuff);
  return { props: { propsStuff } };
}

export default function Embed({ url, head, title, desc, img, bigImg, vid }) {
  const router = useRouter();
  useEffect(() => {
    router.push(url);
  });
  return (
    <main>
      <Head>
        <title>Loading...</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />

        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        {head || " "}
        {title || " "}
        {desc || " "}
        {img || " "}
        {bigImg || " "}
        {{
          if(vid) {
            return <meta property="twitter:player:width" content="1920" />;
          },
        }}
        {{
          if(vid) {
            return <meta property="twitter:player:width" content="1920" />;
          },
        }}

        <meta name="twitter:player:height" content="1080" />
        {{
          if(vid) {
            return <meta name="twitter:player" content={vid} />;
          },
        }}
        <meta name="twitter:player:stream" content={vid} />
      </Head>

      <section>
        <p>Loading...</p>
      </section>
    </main>
  );
}
