import Head from 'next/head';
import Link from 'next/link';
import "98.css";
import React from "react";
import Router from 'next/router'
const btoa = require('btoa');

export default function Generator() {

  let rawEmbedQuery

  const generateURL = async event => {
    event.preventDefault()

    rawEmbedQuery = '?v=1&title=' + event.target.title.value + '&desc=' + event.target.desc.value + '&url=' + event.target.url.value + '&img=' + event.target.img.value + '&vid=' + event.target.vid.value
    let encodedQuery = encodeURI(rawEmbedQuery);
    const embedQuery = btoa(encodedQuery)
    Router.push('/embed/url?q=' + embedQuery)
    console.log(embedQuery)
    return embedQuery

  }

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
            <p style={{ textAlign: "center" }}>(all parameters are optional)</p>
            <form onSubmit={generateURL}>
              <div className="field-row-stacked">
                <label htmlFor="title">Title</label>
                <input id="title" type="text" />
              </div>
              <div className="field-row-stacked">
                <label htmlFor="desc">Description</label>
                <textarea id="desc" rows="3" />
              </div>
              <div className="field-row-stacked">
                <label htmlFor="url">Redirect URL</label>
                <input id="url" type="text" />
              </div>
              <div className="field-row-stacked">
                <label htmlFor="img">Direct URL to the image to display</label>
                <input id="img" type="text" />
              </div>
              <div className="field-row-stacked">
                <label htmlFor="vid">Direct URL to the video to display</label>
                <input id="vid" type="text" />
              </div>
              <button type="submit" style={{ textAlign: "center", marginTop: "20px", width: "100%" }}>Generate URL</button>
            </form>
          </div>
        </div>
      </section>
    </home >
  )

}