import Head from 'next/head'
import "98.css";
const atob = require('atob');
import redirect from 'nextjs-redirect'

//localhost:3000/embed?q=P3Y9MSZ0aXRsZT10aXRsZSUyMENPTlRFTlQmZGVzYz1kZXNjcmlwdGlvbiUyMENPTlRFTlQmdXJsPXVybCUyMCUyMENPTlRFTlQmaW1nPWltYWdlJTIwQ09OVEVOVCZ2aWQ9VklERU8lMjBjb250ZW50

export async function getServerSideProps({ query }) {


  const decodedQuery = atob(query.q)
  let ogQuery = decodeURI(decodedQuery);


  let queryObject = {};
  let pairs = ogQuery.replace(/^\?/, '').split('&') 
  for (var i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=')
    queryObject[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
  }

  return { props: { v: queryObject.v, title: queryObject.title, desc: queryObject.desc, url: queryObject.url, img: queryObject.img, vid: queryObject.vid } }
}

export default function Embed({ v, title, desc, url, img, vid }) {
  

  return (
    
    <home>
      <Head>
        <title>redirecting... maybe idfk</title>

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />

        <meta property="og:site_name" content={title} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta property='og:title' content={desc} />
        <meta property="og:image" content={img} />
        <meta property="og:video" content={vid} />
        <meta property="og:video:url" content={vid} />
        <meta name="twitter:player:width" content="1920" />
        <meta name="twitter:player:height" content="1080" />
        <meta name="twitter:player" content={vid} />
        <meta name="twitter:player:stream" content={vid} />
        <meta property='og:type' content='video.other' />
        
        
      </Head> 
      
      <section>
        <p>redirecting... maybe idfk</p>
      </section>
    </home>
  )
}