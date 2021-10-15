import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

const colorSchemes = require("../public/assets/colorSchemes.json");

import parse from "html-react-parser";

import navbar from "../components/navbar";
import StuffCard from "../components/stuffCard";

import styles from "../styles/Home.module.css";

export async function getServerSideProps(context) {
  const localeJSON = require(`../locales/${context.locale}.json`);
  return {
    props: { localeJSON },
  };
}

export default function Home({ localeJSON }) {
  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  let colorSchemeIndex = 0;

  function updateCSSVars() {
    colorSchemeIndex++;
    //colorSchemeIndex = 3;
    if (colorSchemeIndex === colorSchemes.length) colorSchemeIndex = 0;

    const heroCaption = document.querySelector("#hero-caption");
    // Update theme specific stuff
    switch (colorSchemeIndex) {
      case 5: {
        heroCaption.innerHTML = localeJSON.index.hero.captions[1];
        heroCaption.className += " awfulRainbowText";
        document.querySelector("#imgMe").src = "/assets/images/me-sad.png";
        break;
      }
      default: {
        heroCaption.innerHTML = localeJSON.index.hero.captions[0];
        heroCaption.className = heroCaption.className.replace(
          " awfulRainbowText",
          ""
        );
        document.querySelector("#imgMe").src = "/assets/images/me.png";
        break;
      }
    }

    const rootVars = document.documentElement.style;
    const scheme = colorSchemes[colorSchemeIndex];
    rootVars.setProperty("--accent", scheme.accent);
    rootVars.setProperty("--secondary", scheme.secondary);
    rootVars.setProperty("--dimmed", scheme.dimmed);
    rootVars.setProperty("--tertiary", scheme.tertiary);
    rootVars.setProperty("--background", scheme.background);
    rootVars.setProperty("--heading-font", scheme.headingFont);
    rootVars.setProperty("--secondary-font", scheme.secondaryFont);
    rootVars.setProperty("--radius", scheme.radius);
    rootVars.setProperty("--border", scheme.border);
  }

  function fadeElement(element) {
    document.querySelector(element).className += " fadeAway";
  }

  function unfadeElement(element) {
    document.querySelector(element).className = document
      .querySelector(element)
      .className.replace(" fadeAway", " unfade");
  }

  function resetClass(element) {
    document.querySelector(element).className = document
      .querySelector(element)
      .className.replace(" unfade", "")
      .replace(" showMe", "")
      .replace(" hideMe", "")
      .replace(" fadeAway", "");
  }

  let animationRunning = false;

  async function changeColorScheme() {
    if (animationRunning) return;
    animationRunning = !animationRunning;

    // 0 - Hide the cursor
    document.querySelector("body").style.cursor = "none";

    // 1 - Duck!
    document.querySelector("#imgMe").className += " hideMe";

    // 2 - Fade the text away
    fadeElement("#navbar");
    fadeElement("#hero-text");
    fadeElement("#about");
    fadeElement("#stuff");

    await wait(400);

    // 3 - Expand the circle to fill the screen
    const circle = document.querySelector("#imgBg");
    const circleCoordinates = circle.getBoundingClientRect();
    circle.style.position = "absolute";
    circle.style.left = `${circleCoordinates.x}px`;
    circle.style.top = `${circleCoordinates.y}px`;
    circle.className += " expandCircle";
    document.querySelector("body").style.maxHeight = "100vh";

    await wait(300);

    // 4 - Change color scheme and update circle
    updateCSSVars();
    circle.style.background = "var(--background)";

    await wait(200);

    // 5 - Fade the expanded circle away
    circle.className = circle.className.replace(" expandCircle", "");
    fadeElement("#imgBg");

    // 6 - Reset overflow and put circle back in its place
    document.querySelector("body").style = "";
    circle.style = "";
    circle.style.background = "var(--background)";

    // 7 - Unfade text
    unfadeElement("#navbar");
    unfadeElement("#hero-text");
    unfadeElement("#about");
    unfadeElement("#stuff");

    await wait(100);

    // 8 - Unfade circle and pop myself back up
    circle.style.background = "var(--accent)";
    circle.style = "";
    unfadeElement("#imgBg");
    document.querySelector("#imgMe").className = document
      .querySelector("#imgMe")
      .className.replace("hideMe", "showMe");

    await wait(200);

    // 9 - Reset the classes
    resetClass("#imgBg");
    resetClass("#navbar");
    resetClass("#hero-text");
    resetClass("#about");
    resetClass("#stuff");
    await wait(300);
    resetClass("#imgMe");

    animationRunning = false;
  }

  console.log("Hi!");

  return (
    <home>
      <Head>
        <title>Monty (montylion)</title>

        {/* Preload the image for the easter egg */}
        <link rel="prefetch" href="/assets/images/me-sad.png" as="image" />
      </Head>

      <div className={styles.wrapper} id="wrapper">
        {navbar(localeJSON)}
        <div className={styles.hero}>
          <div
            className={styles.imgBg}
            id="imgBg"
            onClick={() => changeColorScheme()}
          >
            <img src="/assets/images/me.png" id="imgMe" draggable="false" />
          </div>
          <div className={styles.text} id="hero-text">
            <h1>{parse(localeJSON.index.hero.header)}</h1>
            <p id="hero-caption">{parse(localeJSON.index.hero.captions[0])}</p>
          </div>
        </div>

        <div className={styles.about} id="about">
          <h1>{localeJSON.index.about.header}</h1>
          <p>{parse(localeJSON.index.about.paragraphs.a)}</p>
          <p>{parse(localeJSON.index.about.paragraphs.b)}</p>
        </div>

        <div className={styles.stuff} id="stuff">
          <h1>{localeJSON.index.stuff.header}</h1>
          <p>{parse(localeJSON.index.stuff.paragraph)}</p>

          <strong>
            TODO: everything below this, cleanup code, janky about me design
          </strong>

          <div className={styles.list}>
            {localeJSON.index.stuff.cards.map((card, index) => {
              return (
                <StuffCard
                  title={card.title}
                  caption={card.caption}
                  repoUrl={card.repoUrl}
                  websiteUrl={card.websiteUrl}
                  langs={card.langs}
                  key={index}
                />
              );
            })}

            <a
              className={styles.card}
              href="https://github.com/montylion?tab=repositories"
            >
              {localeJSON.index.viewMore + " ->"}
            </a>
          </div>
        </div>

        <div className={styles.contact} id="contact">
          <h1 className={styles.contactHeader}>
            {localeJSON.index.contact.header}
          </h1>
          <p className={styles.contactParagraph}>
            {localeJSON.index.contact.paragraph}
          </p>
          <div className={styles.contactCardList}>
            <a
              href="https://github.com/montylion"
              target="_blank"
              rel="noopener"
              className={styles.githubCard}
            >
              montylion
            </a>

            <div
              className={styles.contactCardDiscord}
              title={localeJSON.index.easterEggs.discord}
            >
              montylion#3581
            </div>

            <a
              href="https://twitter.com/montylion_"
              target="_blank"
              rel="noopener"
              className={styles.twitterCard}
            >
              montylion_
            </a>

            <a
              href="mailto:hey@montylion.dev"
              target="_blank"
              rel="noopener"
              className={styles.emailCard}
            >
              hey@montylion.dev
            </a>

            <a
              href="https://ko-fi.com/montylion"
              target="_blank"
              rel="noopener"
              className={styles.kofiCard}
            >
              montylion
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footer}>Copyright 2021 - Monty (montylion)</div>
    </home>
  );
}
