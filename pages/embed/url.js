import Head from 'next/head';
import Link from 'next/link';
import "98.css";
import React from "react";


export async function getServerSideProps({ query }) {
  const fullUrl = 'https://www.monty.ga/embed?q=' + query.q
  return { props: { url: fullUrl } }
  
}

export default function Url({ url }) {

  return (
    <home>
      <Head>
        <title>embed.dll</title>

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />

      </Head>
      <section>
        <div className="window monty" style={{ minWidth: "300px" }} >
          <div className="title-bar">
            <div className="title-bar-text">embed.dll</div>
            <div className="title-bar-controls" >
              <Link href="/">
                <button aria-label="Close" />
              </Link>
            </div>
          </div>
          <div className="window-body">
            <h4 style={{ textAlign: "center" }}>Discord embed generator</h4>
            <div className="field-row-stacked" style={{maxWidth: "100%"}}>
              <label htmlFor="url">Here's the URL:</label>
              <textarea  id="url" type="text" rows="15" readOnly value={url} style={{wordWrap: "break-word" }}/>
            </div>
          </div>
        </div>
      </section>
    </home>
  );
}