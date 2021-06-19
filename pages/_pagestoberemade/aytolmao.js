import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";

export default function Generator() {
  const ayRegex = new RegExp(/\b(ay+)\b/, "i");

  const handleInput = (event) => {
    let textToLmao = event.target.value;

    if (ayRegex.test(textToLmao)) {
      let textArray = textToLmao.split(ayRegex);
      textArray.forEach((entry, index) => {
        if (!ayRegex.test(entry)) return;
        textArray[index] = textArray[index]
          .replace(/y/g, "o")
          .replace(/Y/g, "O")
          .replace("a", "lma")
          .replace("A", "LMA");
      });

      const lmaodText = textArray.join("");
      document.getElementById("lmaodText").value = lmaodText;
    } else {
      document.getElementById("lmaodText").value = textToLmao;
    }
  };

  return (
    <home>
      <Head>
        <title>Ay to lmao | Monty</title>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png?v=180621"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png?v=180621"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png?v=180621"
        />
        <link rel="manifest" href="/site.webmanifest?v=180621" />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg?v=180621"
          color="#969acf"
        />
        <link rel="shortcut icon" href="/favicon.ico?v=180621" />
        <meta name="msapplication-TileColor" content="#969acf" />
        <meta name="theme-color" content="#ffffff" />

        <meta property="og:site_name" content="Ay to lmao | Monty (montylion)" />
        <meta property="og:title" content="Ay to lmao | Monty (montylion)" />
        <meta
          property="og:description"
          content="This thing converts all 'ay's into 'lmao's"
        />
        <meta property="og:url" content="https://monty.ga/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/opengraph.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/opengraph.png" />

        <meta
          name="description"
          content="I make stuff™ in JavaScript & Node.js as a hobby."
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <section>
        <div
          className="window monty"
          id="mainWindow"
          style={{ minWidth: "300px" }}
        >
          <div className="title-bar" id="mainWindowheader">
            <div className="title-bar-text">aytolmao.dll</div>
            <div className="title-bar-controls">
              <Link href="/">
                <button aria-label="Close" />
              </Link>
            </div>
          </div>

          <div className="window-body">
            <h4 style={{ textAlign: "center" }}>ay to lmao</h4>
            <p style={{ textAlign: "center" }}>
              Basically{" "}
              <Link href="https://github.com/PretendoNetwork/Yamamura/pull/29">
                this
              </Link>{" "}
              but standalone.
            </p>
            <form className="field-row-stacked" onInput={handleInput}>
              <textarea
                id="textToLmao"
                rows="8"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                placeholder="Type here the text to lmaoify"
              />
              <textarea
                readOnly
                id="lmaodText"
                rows="8"
                placeholder="Lmaoified text"
              />
            </form>
          </div>
        </div>
      </section>
    </home>
  );
}
