import Head from "next/head";

import Navbar from "../components/navbar";
import StuffCard from "../components/stuffCard";
import OpenGraph from "../components/openGraph";

import { renderToString } from "react-dom/server";
import LoadingBar from "../components/eastereggs/LoadingBar";
import FakeCAPTCHA from "../components/eastereggs/FakeCAPTCHA";

import styles from "../styles/Home.module.css";
import cardStyles from "../styles/components/stuffcard.module.css";

export async function getServerSideProps(context) {
  const age = Math.floor(
    (new Date() - new Date("April 13, 2004")) / (1000 * 60 * 60 * 24 * 365)
  ); // There's no way I'm gonna remember to update it myself, so here's a lazy workaround.

  const _mdbUserCountFetch = await fetch(
    "https://discord.com/api/v9/guilds/852978546187698206?with_counts=true",
    {
      headers: {
        Authorization: process.env.MD_BADGE_DISCORD_TOKEN,
      },
    }
  );
  const _mdbUserCountJSON = await _mdbUserCountFetch.json();
  const mdbUserCount = _mdbUserCountJSON.approximate_member_count;

  const cards = [
    {
      title: "Coming soon...",
      caption: "gimme a sec lol",
      link: "#stuff",
    },
    {
      title: "Discord Badge",
      caption: `An SVG badge that shows your Discord username and presence. ${mdbUserCount} people use it, so it must be somewhat good. I think.`,
      link: "https://github.com/ashmonty/discord-md-badge",
    },
    {
      title: "Pretendo Network",
      caption:
        "Implemented the blog, the locale stuff™, the online Mii editor (not released yet), and also some of the stuff in the homepage, of which the infinite scrolling in the special thanks section is a favorite of mine 😎",
      repo: "PretendoNetwork/website",
      link: "https://pretendo.network",
    },
    {
      title: "Neofetch but it's always Arch",
      caption:
        "This version of neofetch always returns Arch, on any system. Don't ask me why I did this, but also don't expect any better from me.",
      link: "https://github.com/ashmonty/neofetch-but-its-always-arch",
    },
    {
      title: "Website",
      caption:
        "The website you're currently browsing! Can you tell I'm putting this card here just so this section looks even?",
      link: "#stuff",
      hideOnMobile: true,
    },
  ];

  return {
    props: { age, cards },
  };
}

export default function Home({ age, cards }) {
  let timestampArray = [];
  let oldTimestamp = 0;

  function mouseLeave(e) {
    // Filter out child elements
    if (e.target.tagName !== "A") return;

    // Push to the array the difference between the time the mouse left the last time and the time the mouse left this time
    let currentTimestamp = e.timeStamp;
    timestampArray.push({
      key: Number(e.target.id.split("-")[1]),
      timestamp: currentTimestamp - oldTimestamp,
    });

    // Get the last n timestamps
    const n = 15;
    const ntyTimestamps = timestampArray.slice(-n);
    if (ntyTimestamps.length !== n) return;

    // Check if all the last n timestamps are from the same element, return if not

    // NOTE: I am aware that this sometimes doesn't return even if the timestamps are from different elements, but I don't care.
    // It works for the most part, and even when it doesn't it takes a little bit of time to get the right combination so the average is still very high.

    const keySum = ntyTimestamps.reduce((a, b) => a + b.key, 0);
    if (keySum % n !== 0) return;

    // Calculate the average
    let sum = ntyTimestamps.reduce((a, b) => a + b.timestamp, 0);
    let avrg = sum / n;

    // If the average is less than 100, then it's a bug.
    if (avrg < 100) {
      cardBug(e);
    }

    //Sets the old timestamp to be the new timestamp
    oldTimestamp = currentTimestamp;
  }

  // Disable the card when the bug is found
  let disabledCards = 0;
  function cardBug(e) {
    const element = e.target;
    if (!element.className.includes("disabledCard"))
      element.className += " disabledCard";
    disabledCards += 1;
    if (disabledCards === 6) {
      loadingBarEasterEgg(e);
    }

    // Do that instantly for testing
    //loadingBarEasterEgg();
  }

  // The haha 169% loading bar easter egg
  function loadingBarEasterEgg(e) {
    document.querySelector("#stuff").innerHTML = renderToString(<LoadingBar />);
    setTimeout(function () {
      document.querySelector("#stuff").innerHTML = renderToString(
        <FakeCAPTCHA />
      );
    }, 19000);
  }

  return (
    <div>
      <Head>
        <title>Ash (Monty)</title>
        <OpenGraph />
      </Head>

      <div className={styles.wrapper} id="wrapper">
        <Navbar />
        <div className={styles.hero}>
          <div className={styles.imgBg} id="imgBg" />{" "}
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
          <div>
            <h1>Who?</h1>
            <p>
              I'm Ash, a {age} year old who likes to make{" "}
              <span className="stuff">stuff™</span>!
            </p>
            <p>
              While Ash is my name, you may also know me in real life as �̷̗͎̐�̸̟̯̐�̸̬̳́�̸̱̅�̴̟̖́�,
              but I decided to change it due to its unpronounceability.
            </p>
            <p>
              I enjoy playing the piano and I'm learning to play the guitar, but
              nothing will ever top my kazoo playing skills. I also love
              tinkering with stuff, which is why I am an Arch Linux user. Yes,{" "}
              <i>I use Arch, btw.</i>
            </p>
            <p>
              Also, fun fact, I'm depressed! But who isn't, right?{" "}
              <i>r-right?</i>
            </p>
          </div>
          <div className={styles.sideImg} />
        </div>

        <div className={styles.stuff} id="stuff">
          <h1>
            Ok, but what exactly is <span className={styles.stuff}>stuff™</span>
            ?
          </h1>
          <p>
            Anything I do, really. At the moment it's mainly web dev stuff, but
            who knows, I might put up something else here in the future{" "}
            <i>(foreshadowing)</i>
          </p>

          <div className={styles.list} id="stufflist">
            {cards.map((card, index) => {
              return (
                <StuffCard
                  key={index}
                  index={index}
                  title={card.title}
                  caption={card.caption}
                  link={card.link}
                  hideOnMobile={card.hideOnMobile}
                  onMouseOut={(e) => mouseLeave(e)}
                />
              );
            })}

            <a
              className={cardStyles.card}
              href="https://github.com/ashmonty?tab=repositories"
              onMouseOut={(e) => mouseLeave(e)}
              id={`stuffCard-5`}
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
          <h1>Contact me</h1>
          <p>
            Feel free to reach out to me for anything, unless I owe you money.
          </p>
          <div className={styles.list}>
            <a
              href="https://github.com/ashmonty"
              target="_blank"
              rel="noopener"
              className={styles.contactCard + " " + styles.github}
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              ashmonty
            </a>
            <div
              className={styles.contactCard + " " + styles.discord}
              title="Not a link 'cause Discord is dumb"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Discord</title>
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
              monty#9398
            </div>
            <a
              href="https://twitter.com/ashmmonty"
              target="_blank"
              rel="noopener"
              className={styles.contactCard + " " + styles.twitter}
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Twitter</title>
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              ashmmonty
            </a>
            <a
              href="mailto:hey@ashmonty.com"
              target="_blank"
              rel="noopener"
              className={styles.contactCard + " " + styles.mail}
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Mail</title>
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
              </svg>
              hey@ashmonty.com
            </a>
            <a
              href="https://ko-fi.com/ashmonty"
              target="_blank"
              rel="noopener"
              className={styles.contactCard + " " + styles.kofi}
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Ko-fi</title>
                <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z" />
              </svg>
              ashmonty
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        Copyright 2022 - Ash (Monty) -{" "}
        <a
          href="https://github.com/ashmonty/website"
          target="_blank"
          rel="noopener"
        >
          Source code
        </a>
      </div>
    </div>
  );
}
