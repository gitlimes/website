import Head from "next/head";
import Link from "next/link";

import Navbar from "../components/navbar";
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
  const age = Math.floor(
    (new Date() - new Date("April 13, 2004")) / (1000 * 60 * 60 * 24 * 365)
  ); // There's no way I'm gonna remember to update it myself, so here's a lazy workaround.

  const _mdbStarsFetch = await fetch(
    "https://api.github.com/repos/ashmonty/discord-md-badge"
  );
  const _mdbStarsJson = await _mdbStarsFetch.json();
  const mdbStarts = _mdbStarsJson.stargazers_count;

  const cards = [
    {
      title: "The place to dump cool stuff™",
      caption: "read the title, idiot",
      link: "/the-place-to-dump-cool-stuff",
    },
    {
      title: "Discord Badge",
      caption: `An SVG badge that shows your Discord username and presence. ${mdbStarts} people deemed it starworthy, so it must be somewhat good, I think.`,
      link: "https://github.com/ashmonty/discord-md-badge",
    },
    {
      title: "Pretendo Network",
      caption:
        "I implemented the blog section and the locale switcher, and I designed and wrote the CSS for the account management page and the login page. So yeah basically what I'm saying is that I'm cool. 😎",
      repo: "PretendoNetwork/website",
      link: "https://pretendo.network",
    },
    {
      title: "Croissant",
      caption:
        "A website that shows random pictures of croissants. Don't ask me why I did this, but also don't expect any better from me.",
      link: "https://croissant.ashmonty.com",
    },
    {
      title: "Website",
      caption:
        "The website you're currently browsing! Can you tell I'm putting this just so this section looks even?",
      link: "#stuff",
    },
  ];

  return {
    props: { dcTag, age, cards },
  };
}

export default function Home({ dcTag, age, cards }) {
  return (
    <home>
      <Head>
        <title>Ash (Monty)</title>
        <OpenGraph />
      </Head>

      <div className={styles.wrapper} id="wrapper">
        <Navbar />
        <div className={styles.hero}>
          <div className={styles.imgBg} id="imgBg">
            <img src="/assets/images/me2.png" id="imgMe" draggable="false" />
          </div>
          <div className={styles.text} id="hero-text">
            <h1>
              Hey, I'm <span>Ash</span>!
            </h1>
            <p id="hero-caption">
              I make <span className="stuff">stuff™</span>, I think.
            </p>
          </div>
        </div>

        <div className={styles.about} id="about">
          <h1>Who?</h1>
          <p>
            I'm Ash, a {age} year old who likes to make{" "}
            <span className="stuff">stuff™</span>. From useless websites to dumb
            unreleased songs, you can be sure it's in my repertoire.
          </p>
          <p>
            I play the piano and I'm learning to play the guitar, but my
            favorite instrument is the kazoo. I mean, can you really blame me?
          </p>
        </div>

        <div className={styles.stuff} id="stuff">
          <h1>
            Ok, but what exactly is <span className={styles.stuff}>stuff™</span>?
          </h1>
          <p>
            Stuff is really anything I do. At the moment it's mainly web dev
            stuff, but who knows, I might put up some songs in the future.
          </p>

          <div className={styles.list}>
            {cards.map((card, index) => {
              return (
                <StuffCard
                  title={card.title}
                  caption={card.caption}
                  link={card.link}
                  key={index}
                />
              );
            })}

            <a
              className={cardStyles.card}
              href="https://github.com/ashmonty?tab=repositories"
            >
              View more
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
          <h1 className={styles.contactHeader}>Contact me</h1>
          <p className={styles.contactParagraph}>
            Feel free to reach out to me for anything, unless you're Kyle, in
            which case: Kyle, I'm not giving you back your money. If you want it
            back so bad go to the police or something I don't even care I'm
            fleeing the country anyways
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
              title="Not a link 'cause Discord is dumb"
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
