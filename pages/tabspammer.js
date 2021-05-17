import Head from "next/head";
import Link from "next/link";
import "98.css";
import React, { useEffect } from "react";

export default function Generator() {
  useEffect(() => {
    dragElement(document.getElementById("mainWindow"));

    function dragElement(elmnt) {
      let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown =
          dragMouseDown;
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
        <title>tabspammer.vbs</title>
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
        <meta property="og:url" content="https://monty.ga" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/og_image.png" />
      </Head>
      <section>
        <div
          className="window monty"
          id="mainWindow"
          style={{ minWidth: "300px" }}
        >
          <div className="title-bar" id="mainWindowheader">
            <div className="title-bar-text">tabspammer.vbs</div>
            <div className="title-bar-controls">
              <Link href="/">
                <button aria-label="Close" />
              </Link>
            </div>
          </div>

          <div className="window-body">
            <h4 style={{ textAlign: "center" }}>tabspammer</h4>
            <p style={{ textAlign: "center" }}>
              Have you ever thought{" "}
              <em>Hmm, I don't have enough tabs open...</em>
            </p>
            <p style={{ textAlign: "center" }}>
              Well, I've got the s-solution?
            </p>
            <p style={{ textAlign: "center" }}>
              I take no responsability if your browser crashes.
              <br />
              You are strongly advised to save all unsaved work.
              <br />
              Most broswers block tab spamming/popups so I'm not sure what the point is.
            </p>
            <h4 style={{ textAlign: "center" }}>EPILEPSY WARNING</h4>
            <Link href="/servicepages/epilepsywarning/tabspammer" className="field-row-stacked">
              <button style={{ width: "100%" }}>
                Click here to open infinite tabs (I wouldn't do it but ok)
              </button>
            </Link>
          </div>
        </div>
      </section>
    </home>
  );
}
