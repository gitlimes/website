import Head from "next/head";
import Link from "next/link";
import "98.css";
import Router from "next/router";
const btoa = require("btoa");
import React, { useState } from "react";

export default function Generator() {
  const [showInfo, setShowInfo] = useState(true);
  function toggleInfo() {
    setShowInfo(!showInfo);
  }

  let rawEmbedQuery;

  const generateURL = async (event) => {
    event.preventDefault();

    rawEmbedQuery =
      "?genv=1&header=" +
      event.target.header.value +
      "&title=" +
      event.target.title.value +
      "&url=" +
      event.target.url.value +
      "&img=" +
      event.target.img.value +
      "&vid=" +
      event.target.vid.value;
    let encodedQuery = encodeURI(rawEmbedQuery);
    const embedQuery = btoa(encodedQuery);
    Router.push("/embed/url?q=" + embedQuery);
    console.log(embedQuery);
    return embedQuery;
  };

  return (
    <home>
      <Head>
        <title>embed.dll</title>

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
      </Head>
      <section>
        <div className="window monty" style={{ minWidth: "300px" }}>
          <div className="title-bar">
            <div className="title-bar-text">embed.dll</div>
            <div className="title-bar-controls">
              <button
                style={{ textAlign: "center", fontWeight: "bold" }}
                onClick={toggleInfo}
              >
                i
              </button>
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
                <label htmlFor="header">Header</label>
                <input id="header" type="text" />
              </div>
              <div className="field-row-stacked">
                <label htmlFor="title">Title</label>
                <textarea id="title" rows="3" />
              </div>
              <div className="field-row-stacked">
                <label htmlFor="url">
                  Redirect URL (for YouTube links, use the youtu.be/ link, not{" "}
                  <br /> www.youtube.com/watch?v=, otherwise it's not gonna
                  work)
                </label>
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
              <button
                type="submit"
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  width: "100%",
                }}
              >
                Generate URL
              </button>
            </form>
          </div>
        </div>

        <div
          style={{
            width: 300,
            display: showInfo ? "none" : "block",
          }}
          className="window monty"
        >
          <div className="title-bar">
            <div className="title-bar-text">monty.exe</div>
            <div className="title-bar-controls">
              <button aria-label="Close" onClick={toggleInfo} />
            </div>
          </div>

          <div
            className="window-body"
            style={{
              display: showInfo ? "none" : "block",
            }}
          >
            <div className="field-row" style={{ justifyContent: "center" }}>
              <p style={{ textAlign: "center" }}>
                Inspired by&nbsp;
                <Link href="https://erdbeerbaerlp.de/DCEmbedMaker/">
                  ErdbeerbaerLP's Discord Embed Maker
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </home>
  );
}
