import Head from "next/head";
import Link from "next/link";

const colorSchemes = require("../public/assets/colorSchemes.json");

import parse from "html-react-parser";

import navbar from "../components/navbar";
import StuffCard from "../components/stuffCard";
import OpenGraph from "../components/openGraph";

import styles from "../styles/Home.module.css";
import cardStyles from "../styles/components/stuffcard.module.css";

export async function getServerSideProps(context) {
  const _dcTagFetch = await fetch(
    "https://dcbadge.vercel.app/api/shield/json/406125028065804289"
  );
  const _dcTagFetchJson = await _dcTagFetch.json();
  const dcTag = _dcTagFetchJson.t;
  const localeJSON = require(`../locales/${context.locale}.json`);
  const age = Math.floor(
    (new Date() - new Date("April 13, 2004")) / (1000 * 60 * 60 * 24 * 365)
  ); // There's no way I'm gonna remember to update it myself, so here's a lazy workaround.
  return {
    props: { localeJSON, dcTag, age },
  };
}

export default function Home({ localeJSON, dcTag, age }) {
  /* This is bad; commenting out for now just so I can get the new website out for now

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
        document.querySelector("#imgBg").className += " awfulRainbowBg";
        document.querySelector("#stuff").className += " awfulRainbowBg";
        document.querySelector("#imgMe").src = "/assets/images/me-sad.webp";
        break;
      }
      default: {
        heroCaption.innerHTML = localeJSON.index.hero.captions[0];
        heroCaption.className = heroCaption.className.replace(
          " awfulRainbowText",
          ""
        );
        document.querySelector("#stuff").className = document
          .querySelector("#stuff")
          .className.replace(" awfulRainbowBg", "");
        document.querySelector("#imgBg").className = document
          .querySelector("#imgBg")
          .className.replace(" awfulRainbowBg", "");
        document.querySelector("#imgMe").src = "/assets/images/me.webp";
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
    animationRunning = true;

    // 0 - Hide the cursor
    document.querySelector("body").style.cursor = "none";

    // 1 - Duck!
    document.querySelector("#imgMe").className += " hideMe";

    // 2 - Fade the text away
    fadeElement("#navbar");
    fadeElement("#hero-text");
    fadeElement("#about");
    fadeElement("#stuff");
    fadeElement("#contact");

    await wait(400);

    // 3 - Expand the circle to fill the screen
    document.querySelector("body").style.overflow = "hidden";
    const circle = document.querySelector("#imgBg");
    const circleCoordinates = circle.getBoundingClientRect();
    circle.style.position = "absolute";
    circle.style.left = `${circleCoordinates.x}px`;
    circle.style.top = `${circleCoordinates.y}px`;
    circle.className += " expandCircle";

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
    unfadeElement("#contact");

    await wait(100);

    // 8 - Unfade circle and pop myself back up
    circle.style.background = "var(--accent)";
    circle.style = "";
    unfadeElement("#imgBg");
    document.querySelector("#imgMe").className = document
      .querySelector("#imgMe")
      .className.replace("hideMe", "showMe");

    await wait(350); // Gecko hates me

    // 9 - Reset the classes
    resetClass("#imgBg");
    resetClass("#navbar");
    resetClass("#hero-text");
    resetClass("#about");
    resetClass("#stuff");
    resetClass("#contact");
    await wait(300);
    resetClass("#imgMe");

    animationRunning = false;
  }

  console.log(
    "%cHi! (*・ω・)ﾉ",
    `
      display: inline-block;
      padding: 36px;
      color: #FF6B6B;
      background: #f6effb;
      border-radius: 4px;
      font-family: 'Poppins', sans-serif;
      font-size: 32px;
    `
  );
  console.log(
    "%cThanks for checking out my website! You can take a look at the source code here: https://ashmonty.com/repo",
    `
      display: inline-block;
      padding: 18px;
      color: #FF6B6B;
      background: #f6effb;
      border-radius: 4px;
      font-family: 'Poppins', sans-serif;
      font-size: 18px
    `
  );*/

  return (
    <home>
      <Head>
        <title>Ash (Monty)</title>

        {/* Preload the image for the easter egg */}
        {/* Commented out as it's not needed <link rel="prefetch" href="/assets/images/me-sad.webp" as="image" />*/}

        <OpenGraph />
      </Head>

      <div className={styles.wrapper} id="wrapper">
        {navbar(localeJSON)}
        <div className={styles.hero}>
          <div
            className={styles.imgBg}
            id="imgBg"
            /*onClick={() => changeColorScheme()} This is bad; hiding for now just so I can get the new website out for now */
          >
            <img src="/assets/images/me2.png" id="imgMe" draggable="false" />
          </div>
          <div className={styles.text} id="hero-text">
            <h1>Hey, I'm <span>Ash</span>!</h1>
            <p id="hero-caption">I make <span className='stuff'>stuff™</span>, I think.</p>
          </div>
        </div>

        <div className={styles.about} id="about">
          <h1>Who?</h1>
          <p>I'm Ash, a {age} year old dev who likes to make <span className="stuff">stuff™</span>. From useless websites to dumb unreleased songs, you can be sure it's in my repertoire.</p>
          <p>I play the piano and I'm learning to play the guitar, and I've got like 15 half baked songs, who knows if I'm ever gonna release any of them.</p>
        </div>

        <div className={styles.stuff} id="stuff">
          <h1>{localeJSON.index.stuff.header}</h1>
          <p>{parse(localeJSON.index.stuff.paragraph)}</p>

          <div className={styles.list}>
            {localeJSON.index.stuff.cards.map((card, index) => {
              return (
                <StuffCard
                  title={card.title}
                  caption={card.caption}
                  repo={card.repoUrl}
                  website={card.websiteUrl}
                  coverEl={card.coverEl}
                  langs={card.langs}
                  key={index}
                />
              );
            })}

            <a
              className={cardStyles.card}
              href="https://github.com/ashmonty?tab=repositories"
            >
              {localeJSON.index.viewMore}
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
                className={styles.viewMore}
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
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
              href="https://github.com/ashmonty"
              target="_blank"
              rel="noopener"
              className={styles.githubCard}
            >
              ashmonty
            </a>

            <div
              className={styles.contactCardDiscord}
              title={localeJSON.index.easterEggs.discord}
            >
              {dcTag}
            </div>

            <a
              href="https://twitter.com/ashmonty_"
              target="_blank"
              rel="noopener"
              className={styles.twitterCard}
            >
              ashmonty_
            </a>

            <a
              href="mailto:hey@ashmonty.com"
              target="_blank"
              rel="noopener"
              className={styles.emailCard}
            >
              hey@ashmonty.com
            </a>

            <a
              href="https://ko-fi.com/ashmonty"
              target="_blank"
              rel="noopener"
              className={styles.kofiCard}
            >
              ashmonty
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footer}>Copyright 2021 - Ash (Monty)</div>
    </home>
  );
}
