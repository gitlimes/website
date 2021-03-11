import Head from 'next/head'
import "98.css";
const atob = require('atob');
import Router from 'next/router'

export async function getServerSideProps({ query }) {

  const decodedQuery = atob(query.q)
  let ogQuery = decodeURI(decodedQuery);


  let queryObject = {};
  let pairs = ogQuery.replace(/^\?/, '').split('&')
  for (var i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=');
    queryObject[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }

  console.log(queryObject)

  return { props: { v: queryObject.v, title: queryObject.title, desc: queryObject.desc, url: queryObject.url, img: queryObject.img, vid: queryObject.vid } }
}

export default function Embed({ props }) {

  Router.push(queryObject.url)
  return (

    <home>
      <Head>
        <title>redirecting...</title>

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />

        <meta property="og:site_name" content={props.title} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta property='og:title' content={props.desc} />
        <meta property="og:image" content={props.image} />
        <meta property="og:video" content={props.video} />
        <meta property="og:video:url" content={props.video} />
        <meta name="twitter:player:width" content="1920" />
        <meta name="twitter:player:height" content="1080" />
        <meta name="twitter:player" content={props.video} />
        <meta name="twitter:player:stream" content={props.video} />
        <meta property='og:type' content='video.other' />
      </Head>
    </home>
  )
}