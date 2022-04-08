/* Where's Linux????
  https://helpx.adobe.com/fonts/using/activate-fonts-desktop.html
*/

import Head from "next/head";
import { useState } from "react";
import GoHome from "../components/GoHome";
import Guide from "../components/Guide";
import OpenGraph from "../components/openGraph";
import styles from "../styles/AdobeFontsDL.module.css";

import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function AdobeFontsDL() {
  const [notice, setNotice] = useState("");

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
  const styleSheetURLRegex = /https:\/\/use.typekit.net\/.*\.css/g;
  const stylesheetIDRegex = /.{7}/g;

  const fontUrlRegex =
    /(?<=format\("woff"\),url\(")(.*)(?="\) format\("opentype"\))/g;
  const familyRegex = /(?<=font-family:").*(?=";)/g;
  const weightRegex = /(?<=font-weight:).*(?=;font-stretch:)/g;
  const styleRegex = /(?<=font-style:).*(?=;font-weight:)/g;

  async function downloadFonts(e) {
    e.preventDefault();

    const formValue = e.target.url.value;
    let cssUrl = "";
    let stylesheetID = "";

    if (formValue.match(styleSheetURLRegex)) {
      cssUrl = formValue;
    } else if (formValue.match(stylesheetIDRegex)) {
      stylesheetID = formValue;
      cssUrl = `https://use.typekit.net/${formValue}.css`;
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
        /(?<=https:\/\/use.typekit.net\/)(.{7})(?=\.css)/g;
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
        <title>Adobe Fonts downloader | Ash "Monty"</title>
        <OpenGraph />
      </Head>

      <div className={styles.wrapper} id="wrapper">
        <GoHome />

        <div className={styles.projectHero}>
          <h1>
            Adobe Fonts <span className="accented">downloader</span>
          </h1>
          <p>Download .otf fonts from any Adobe Fonts Web Project</p>
        </div>
        <p>
          Paste the Typekit URL or Project ID of your Web Project to download
          all of its fonts for use in any program.
        </p>
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={downloadFonts}>
            <input
              type="text"
              id="url"
              name="url"
              required={true}
              placeholder="https://use.typekit.net/qwertyu.css"
            />
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
          </form>
          {notice && (
            <p
              className={styles.notice}
              dangerouslySetInnerHTML={{ __html: notice }}
            />
          )}
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
      </div>
    </div>
  );
}
