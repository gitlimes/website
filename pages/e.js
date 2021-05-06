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

  let props = {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  };

  if (queryObject.url) {
    props.url = queryObject.url;
  }
  if (queryObject.header) {
    props.header = queryObject.header;
  }
  if (queryObject.title) {
    props.title = queryObject.title;
  }
  if (queryObject.desc) {
    props.desc = queryObject.desc;
  }

  if (queryObject.img) {
    props.img = queryObject.img;
    //props.twitter = "summary";
  }

  if (queryObject.bigImg) {
    props.bigImg = true;
  }

  /*if (queryObject.bigImg) {
    props.twitter = "summary_large_image";
    props.twitterImage = queryObject.img;
  }*/

  if (queryObject.vid) {
    props.vid = queryObject.vid;
    //props.twitter = "player";
  }
  return { props };
}

export default function Embed({ url, header, title, desc, img, bigImg, vid }) {
  //hope you enjoy big lists
  let headerElement,
    titleElement,
    descElement,
    imgElement,
    twitterCardElement,
    vidElement,
    vidElementUrl,
    ogTypeElement;

  if (header) {
    headerElement = <meta property="og:site_name" content={header} />;
  }
  if (title) {
    titleElement = <meta property="twitter:title" content={title} />;
  }
  if (desc) {
    descElement = <meta name="twitter:description" content={desc} />;
  }
  if (img) {
    if (bigImg) {
      imgElement = <meta name="twitter:image" content={img} />;
      twitterCardElement = (
        <meta name="twitter:card" content="summary_large_image" />
      );
    } else {
      imgElement = <meta name="og:image" content={img} />;
      twitterCardElement = <meta name="twitter:card" content="summary" />;
    }
  }
  if (vid) {
    vidElement = <meta property="og:video" content={vid} />;
    twitterCardElement = ""
  }

  const router = useRouter();
  useEffect(() => {
    router.push(url);
  });

  return (
    <main>
      <Head>
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
        <title>Loading...</title>

        {/*This is all the stuff*/}

        {headerElement}
        {titleElement}
        {descElement}
        {imgElement}
        {vidElement}
        {twitterCardElement}
        {/*<meta name="twitter:player:width" content={w} />
        <meta name="twitter:player:height" content={h} />*/}
        {/*<meta name="twitter:player" content={vid} />*/}
        {/*<meta name="twitter:player:stream" content={vid} />*/}

        {/*<meta property="og:video:url" content={vid} />*/}
      </Head>

      <section>
        <p>Loading...</p>
      </section>
    </main>
  );
}
