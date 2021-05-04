import Head from "next/head";
import "98.css";
const atob = require("atob");
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getServerSideProps({ query }) {
  console.log(query);

  const decodedQuery = atob(query.q);
  let ogQuery = decodeURI(decodedQuery);

  let queryObject = {};
  let pairs = ogQuery.replace(/^\?/, "").split("&");
  for (var i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split("=");
    queryObject[decodeURIComponent(pair[0])] = decodeURIComponent(
      pair[1] || ""
    );
  }

  return {
    props: {
      genv: queryObject.genv,
      header: queryObject.header,
      title: queryObject.title,
      url: queryObject.url,
      img: queryObject.img,
      vid: queryObject.vid,
    },
  };
}

export default function Embed({ genv, header, title, url, img, vid }) {
  const router = useRouter();
  useEffect(() => {
    router.push(url);
  });
  return (
    <home>
      <Head>
        <title>redirecting... maybe idfk</title>
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

        <meta property="og:site_name" content={header} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={img} />
        <meta property="og:video" content={vid} />
        <meta property="og:video:url" content={vid} />
        <meta name="twitter:player:width" content="1920" />
        <meta name="twitter:player:height" content="1080" />
        <meta name="twitter:player" content={vid} />
        <meta name="twitter:player:stream" content={vid} />
        <meta property="og:type" content="video.other" />
      </Head>

      <section>
        <p>redirecting...</p>
      </section>
    </home>
  );
}
