import Head from "next/head";
import "98.css";
const atob = require("atob");
const probe = require("probe-image-size");
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
    head: " ",
    title: " ",
    desc: " ",
    vid: " ",
    img: " ",
    twitter: " ",
    twitterImage: " "
  };

  console.log(queryObject.img);
  if (props.url) {
    props.url = queryObject.url;
  }
  props.head = queryObject.header || " ";
  props.title = queryObject.title || " ";
  props.desc = queryObject.desc || " ";

  if (queryObject.img) {
    props.img = queryObject.img;
    props.twitter = "summary";
  }
  if (queryObject.bigImg) {
    props.twitter = "summary_large_image";
    props.twitterImage = queryObject.img;
  }
  if (queryObject.vid) {
    props.vid = queryObject.vid;
    props.twitter = "summary_large_image";
  }
  return { props };
}

export default function Embed({
  url,
  head,
  title,
  desc,
  img,
  twitter,
  twitterImage,
  vid,
}) {
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
        <meta property="og:site_name" content={head} />
        <meta property="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta property="og:image" content={img} />
        <meta name="twitter:image" content={twitterImage} />
        <meta name="twitter:card" content={twitter} />
        <meta name="og:video" content={vid} />;
      </Head>

      <section>
        <p>Loading...</p>
      </section>
    </main>
  );
}
