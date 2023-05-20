/* Where's Linux????
  https://helpx.adobe.com/fonts/using/activate-fonts-desktop.html
*/

import Head from "next/head";
import { useState } from "react";
import classNames from "classnames";
import GoHome from "../components/GoHome";
import Guide from "../components/Guide";
import OpenGraph from "../components/openGraph";
import Footer from "../components/Footer";

import styles from "../styles/stuffitempage.module.css";

import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function AdobeFontsDL() {
  const [notice, setNotice] = useState("");
  const [stylesheet, setStylesheet] = useState("");

  // add string prototype for titleCase
  String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  };

  // lookup table for font weights
  const weightList = {
    100: "Thin",
    200: "ExtraLight",
    300: "Light",
    400: "Regular",
    500: "Medium",
    600: "SemiBold",
    700: "Bold",
    800: "ExtraBold",
    900: "Black",
  };

  // various regexes
  const styleSheetURLRegex = /https:\/\/use\.typekit\.net\/.*\.css/g;
  const stylesheetIDRegex = /.{7}/g;

  const fontUrlRegex =
    /(?<=format\("woff"\),url\(")(.*)(?="\) format\("opentype"\))/g;
  const familyRegex = /(?<=font-family:").*(?=";)/g;
  const weightRegex = /(?<=font-weight:).*(?=;font-stretch:)/g;
  const styleRegex = /(?<=font-style:).*(?=;font-weight:)/g;

  async function downloadFonts(e) {
    e.preventDefault();

    let cssUrl = "";
    let stylesheetID = "";

    if (stylesheet.match(styleSheetURLRegex)) {
      cssUrl = stylesheet;
    } else if (stylesheet.match(stylesheetIDRegex)) {
      stylesheetID = stylesheet;
      cssUrl = `https://use.typekit.net/${stylesheet}.css`;
    } else {
      setNotice("Please enter a valid Typekit URL or ID");
      return;
    }

    // fetch the raw CSS
    const rawCSSFetch = await fetch(cssUrl);
    if (!rawCSSFetch.ok) {
      setNotice("Could not fetch CSS. Try checking the URL.");
      return;
    }
    const rawCSS = await rawCSSFetch.text();

    const urls = rawCSS.match(fontUrlRegex);
    console.log("[info] found", urls?.length, "fonts");
    if (urls.length === 0) {
      setNotice("No fonts found in CSS. Try checking the URL.");
      return;
    }
    setNotice(
      `Found <span class="accented">${urls.length}</span> fonts! Downloading...`
    );
    const families = rawCSS.match(familyRegex);
    const weights = rawCSS.match(weightRegex);
    const styles = rawCSS.match(styleRegex);

    const downloads = [];

    urls.forEach((url, index) => {
      // extract the font family name from the CSS and make it pretty (e.g. "museo-sans" becomes "Museo Sans")
      const familyName = families[index].replaceAll("-", " ").toTitleCase();
      // extract the font weight from the CSS and convert it to words if possible (e.g. "400" becomes "Regular", 450 stays "450")
      const weight = weightList[weights[index]] || weights[index];
      // extract the font style from the CSS and only display it if it's not "normal"
      const style =
        styles[index] === "normal" ? "" : ` ${styles[index].toTitleCase()}`;

      // create the filename for the font file
      const filename = `${familyName} ${weight}${style}.otf`;

      // push the font file url and filename to the downloads array
      downloads.push({
        filename,
        url,
      });
    });

    const fontZip = new JSZip();

    // generate the zip file
    const generateZip = new Promise((resolve) => {
      downloads.forEach(async (download, index) => {
        fetch(download.url)
          .then((response) => response.blob())
          .then((blob) => fontZip.file(download.filename, blob))
          .then(() => {
            if (index === downloads.length - 1) {
              resolve();
            }
          });
      });
    });

    // after generating the zip file, download it
    generateZip.then(() => {
      const extractStyleSheetIDRegex =
        /(?<=https:\/\/use\.typekit\.net\/)(.{7})(?=\.css)/g;
      stylesheetID = stylesheetID || cssUrl.match(extractStyleSheetIDRegex);

      fontZip
        .generateAsync({ type: "blob" })
        .then((zip) => saveAs(zip, `fonts-${stylesheetID}.zip`));
    });
    setNotice(`Downloaded <span class="accented">${urls.length}</span> fonts!`);
  }

  return (
    <div>
      <Head>
        <title>Adobe Fonts dl | limes.pink</title>
        <meta property="og:title" content="Adobe Fonts dl | limes.pink" />
				<meta property="twitter:title" content="Adobe Fonts dl | limes.pink" />
				<meta
					property="og:description"
					content="Download fonts from any Web Project."
				/>
				<meta
					property="twitter:description"
					content="Download fonts from any Web Project!"
				/>
				<meta
					property="og:image"
					content="https://limes.pink/assets/images/twimg.png"
				/>
				<meta
					name="twitter:image"
					content="https://limes.pink/assets/images/twimg.png"
				/>
				<OpenGraph />
      </Head>

      <div className={styles.wrapper} id="wrapper">
        <GoHome />

        <div className={styles.floatingContainer}>
          <div className={styles.projectHero}>
            <h1>
              Adobe Fonts <span className="accented">dl</span>
            </h1>
            <p>Download fonts from any Web Project.</p>
          </div>

          <input
            type="text"
            required={true}
            placeholder="https://use.typekit.net/qwertyu.css"
            onChange={(e) => setStylesheet(e.target.value)}
            style={{ marginTop: "2rem" }}
          />
          <button onClick={downloadFonts}>Download</button>

          <p
            className={styles.notice}
            style={{ visibility: notice ? "visible" : "hidden" }}
            dangerouslySetInnerHTML={{ __html: notice || "hi" }}
          />
        </div>

        <div className={styles.guide}>
          <Guide>
            <h2>Why did you make this?</h2>
            <p>
              Because Adobe allows system-wide installation of fonts on Windows
              and MacOS, but not on Linux (see{" "}
              <a
                href="https://helpx.adobe.com/fonts/using/activate-fonts-desktop.html"
                target="_blank"
                rel="noreferrer noopener"
              >
                here
              </a>
              ) .
            </p>
            <h2>Usage</h2>
            <ol>
              <li>
                On{" "}
                <a href="https://fonts.adobe.com" target="_blank">
                  fonts.adobe.com
                </a>
                , add the fonts to a Web Project.
              </li>
              <li>
                Copy the CSS URL{" "}
                <span className="dim">
                  (https://use.typekit.net/qwertyu.css)
                </span>{" "}
                or Project ID <span className="dim">(qwertyu)</span>.
              </li>
              <li>Paste it in the box and click on the download icon.</li>
              <li>Done!</li>
            </ol>
          </Guide>
        </div>

        <Footer sourceCodeOverride="https://github.com/gitlimes/website/blob/main/pages/adobe-fonts-dl.js"/>
      </div>
    </div>
  );
}
