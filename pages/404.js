import "98.css";
import styles from "../styles/Custom404.module.css";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Custom404() {
  const router = useRouter();
  useEffect(() => {
    document.addEventListener("keydown", pushToHome);
    function pushToHome() {
      document.removeEventListener("keydown", pushToHome);
      router.push("/");
    }
  });

  return (
    <home>
      <Head>
        <title>404 :/</title>
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
        <a href="/">
          <div className={styles.blbg}>
            <div className={styles.yeet}>
              <p className={styles.header}>404</p>
              <div className={styles.textcontainer}>
                <p>An error has occured. To continue:</p>
                <p>
                  Click/tap anywhere or press any key to return to the home
                  page.
                </p>
                <p>Error: 404 : P4G3 : N07F0UND</p>
                <div className={styles.pressDiv}>
                  <p className={styles.pressText}>
                    Press any key to continue&nbsp;
                    <p className={styles.blink}>_</p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </section>
    </home>
  );
}
