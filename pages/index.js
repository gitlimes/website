import Head from "next/head";
import Link from "next/link";
import "98.css";
const btoa = require("btoa");
import React, { useState } from "react";
import { useEffect } from "react";

export default function Generator() {
  const [showInfo, setShowInfo] = useState(true);
  function toggleInfo() {
    setShowInfo(!showInfo);
  }

  let formFields = {
    header: "",
    title: "",
    desc: "",
    url: "",
    img: "",
    bigImg: false,
    vid: "",
  };

  const generateURL = async (event) => {
    event.preventDefault();

    formFields[event.target.id] = event.target.value;
    formFields.bigImg = document.getElementById("bigImg").checked;
    if (document.getElementById("vid").value) {
      document.getElementById("bigImg").checked = true;
      document.getElementById("bigImg").readOnly = true;
    } else {
      document.getElementById("bigImg").readOnly = false;
    }

    //Build embed query
    let embedQuery = "ver=2";

    if (formFields.header) {
      embedQuery += "&header=" + btoa(encodeURI(formFields.header));
    }
    if (formFields.title) {
      embedQuery += "&title=" + btoa(encodeURI(formFields.title));
    }
    if (formFields.desc) {
      embedQuery += "&desc=" + btoa(encodeURI(formFields.desc));
    }
    if (formFields.url) {
      embedQuery += "&url=" + btoa(encodeURI(formFields.url));
    }
    if (formFields.img) {
      embedQuery += "&img=" + btoa(encodeURI(formFields.img));
    }
    if (formFields.bigImg) {
      embedQuery += "&bigImg=" + btoa(encodeURI(formFields.bigImg));
    }
    if (formFields.vid) {
      embedQuery += "&vid=" + btoa(encodeURI(formFields.vid));
    }

    document.getElementById("embedUrl").value =
      "https://dc.montylion.dev/e?e=" + btoa(encodeURI(embedQuery));
  };

  const copyURL = async (event) => {
    event.preventDefault();

    const copyText = document.getElementById("embedUrl");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
  };

  useEffect(() => {
    dragElement(document.getElementById("mainWindow"));

    function dragElement(elmnt) {
      let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(
          elmnt.id + "header"
        ).onmousedown = dragMouseDown;
      } else {
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
  });

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

        <meta property="og:image" content="/og_image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="monty.exe" />
        <meta property="og:url" content="https://dc.montylion.deev" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/og_image.png" />
      </Head>
      <section>
        <div
          className="window monty"
          style={{ maxWidth: "500px", width: "95%" }}
          id="mainWindow"
        >
          <div className="title-bar" id="mainWindowheader">
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
            <p style={{ textAlign: "center" }}>(all parameters are optional, embeds with videos are not guaranteed to work)</p>
            <form onInput={generateURL}>
              <div className="field-row-stacked">
                <label htmlFor="header">Header</label>
                <input
                  id="header"
                  type="text"
                  placeholder="The smaller uppermost text"
                />
                <label htmlFor="title">Title</label>
                <textarea
                  id="title"
                  rows="2"
                  placeholder="The blue text below the header"
                />
                <label htmlFor="description">Description</label>
                <textarea
                  id="desc"
                  rows="3"
                  placeholder="The text below the title"
                />
                <label htmlFor="url">Redirect URL</label>
                <input
                  id="url"
                  type="text"
                  placeholder="The URL of the website to open on click (defaults to Never Gonna Give You Up)"
                />
                <label htmlFor="img">Image URL</label>
                <input
                  id="img"
                  type="text"
                  placeholder="A direct URL to the image to display on the embed"
                />
                <input type="checkbox" id="bigImg" />
                <label htmlFor="bigImg">
                  Show big image (automatically checked if you added a video)
                </label>
                <label htmlFor="vid">Video URL</label>
                <input
                  id="vid"
                  type="text"
                  placeholder="Direct URL to the video file to display on the embed"
                />
                <label htmlFor="vid" style={{ marginTop: "20px" }}>
                  Final URL (click to copy)
                </label>
                <textarea
                  readOnly
                  id="embedUrl"
                  rows="3"
                  placeholder="The final URL to send on Discord"
                  onClick={copyURL}
                />
              </div>
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
            <div className="title-bar-text">credits.dll</div>
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
                <Link href="https://dc.erdbeerbaerlp.de/">
                  ErdbeerbaerLP's Discord Embed Maker
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </home>
  );
}
