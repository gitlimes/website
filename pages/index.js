import Head from "next/head";
import Link from "next/link";

import Navbar from "../components/Navbar";
import StuffCard from "../components/stuffCard";
import OpenGraph from "../components/openGraph";

import rawcards from "/cards.json";

import { renderToString } from "react-dom/server";
import LoadingBar from "../components/eastereggs/LoadingBar";
import FakeCAPTCHA from "../components/eastereggs/FakeCAPTCHA";

import styles from "../styles/Home.module.css";
import cardStyles from "../styles/components/stuffcard.module.css";

export async function getServerSideProps() {
  const _statsFetch = await fetch("https://www.ashmonty.com/api/stats");
  const _statsJSON = await _statsFetch.json();
  const stats = _statsJSON;

  const microsoftgithubStatsFetch = await fetch(
    "https://microsoftgithub.com/api/stats"
  );
  const microsoftgithubStatsJson = await microsoftgithubStatsFetch.json();
  const microsoftgithubStats = microsoftgithubStatsJson.rickrolled;

  const cards = JSON.parse(
    JSON.stringify(rawcards.cards)
      .replace("${mdbUserCount}", stats.discordmdbadge.usercount)
      .replace("${microsoftgithubusers}", microsoftgithubStats.users)
  );

  return {
    props: { cards },
  };
}

export default function Home({ cards, darkMode, setDarkMode }) {
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
    // loadingBarEasterEgg();
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

  //console.log(document.querySelector("body").dataset.darkMode)

  return (
    <div>
      <Head>
        <title>Ash "Monty"</title>
        <OpenGraph />
      </Head>

      <div className={styles.wrapper} id="wrapper">
        <Navbar home="true" darkMode={darkMode} setDarkMode={setDarkMode} />
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
              I'm Ash, an 18 year old who makes{" "}
              <span className="stuff">stuff™</span>!
            </p>
            <p>
              I play the piano and I'm learning the guitar, but nothing will
              ever top my kazoo playing skills. I love tinkering with stuff,
              which is why I am an Arch Linux user. Yes, I'm gonna say it:{" "}
              <i>I use Arch, btw.</i>
            </p>
            <p>
              I am very funny, especially when sleep deprived, as can be seen
              from the{" "}
              <Link
                href="https://pretendo.network/nso-legacy-pack"
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <a className={styles.link}>
                  Pretendo Network April Fools' joke of 2022
                </a>
              </Link>
              . What was that? You don't find it funny? Well, too bad. This is
              my about me, I can write anything I want.
            </p>
          </div>
          <div className={styles.sideImg} />
        </div>

        <div className={styles.stuff} id="stuff">
          <h1>
            <span className={styles.stuff}>Stuff™?</span> What's that?
          </h1>
          <p>Anything I do. As of now. it's mostly web projects.</p>

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
                  samePage={card.samePage}
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
            <a
              href="https://discord.com/users/406125028065804289"
              target="_blank"
              rel="noopener"
              className={styles.contactCard + " " + styles.discord}
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
            </a>
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
              rel="me"
              href="https://mas.to/@ashmonty"
              target="_blank"
              className={styles.contactCard + " " + styles.mastodon}
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Mastodon</title>
                <path d="M23.193 7.88c0-5.207-3.411-6.733-3.411-6.733C18.062.357 15.108.025 12.041 0h-.076c-3.069.025-6.02.357-7.74 1.147 0 0-3.412 1.526-3.412 6.732 0 1.193-.023 2.619.015 4.13.124 5.092.934 10.11 5.641 11.355 2.17.574 4.034.695 5.536.612 2.722-.15 4.25-.972 4.25-.972l-.09-1.975s-1.945.613-4.13.54c-2.165-.075-4.449-.234-4.799-2.892a5.5 5.5 0 0 1-.048-.745s2.125.52 4.818.643c1.646.075 3.19-.097 4.758-.283 3.007-.359 5.625-2.212 5.954-3.905.517-2.665.475-6.508.475-6.508zm-4.024 6.709h-2.497v-6.12c0-1.29-.543-1.944-1.628-1.944-1.2 0-1.802.776-1.802 2.313v3.349h-2.484v-3.35c0-1.537-.602-2.313-1.802-2.313-1.085 0-1.628.655-1.628 1.945v6.119H4.831V8.285c0-1.29.328-2.314.987-3.07.68-.759 1.57-1.147 2.674-1.147 1.278 0 2.246.491 2.886 1.474L12 6.585l.622-1.043c.64-.983 1.608-1.474 2.886-1.474 1.104 0 1.994.388 2.674 1.146.658.757.986 1.781.986 3.07v6.305z" />
              </svg>
              ashmonty
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
                <path d="M15.61 12c0 1.99-1.62 3.61-3.61 3.61-1.99 0-3.61-1.62-3.61-3.61 0-1.99 1.62-3.61 3.61-3.61 1.99 0 3.61 1.62 3.61 3.61M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12c2.424 0 4.761-.722 6.76-2.087l.034-.024-1.617-1.879-.027.017A9.494 9.494 0 0 1 12 21.54c-5.26 0-9.54-4.28-9.54-9.54 0-5.26 4.28-9.54 9.54-9.54 5.26 0 9.54 4.28 9.54 9.54a9.63 9.63 0 0 1-.225 2.05c-.301 1.239-1.169 1.618-1.82 1.568-.654-.053-1.42-.52-1.426-1.661V12A6.076 6.076 0 0 0 12 5.93 6.076 6.076 0 0 0 5.93 12 6.076 6.076 0 0 0 12 18.07a6.02 6.02 0 0 0 4.3-1.792 3.9 3.9 0 0 0 3.32 1.805c.874 0 1.74-.292 2.437-.821.719-.547 1.256-1.336 1.553-2.285.047-.154.135-.504.135-.507l.002-.013c.175-.76.253-1.52.253-2.457 0-6.617-5.383-12-12-12" />
              </svg>
              hey@ashmonty.com
            </a>
            <a
              href="https://www.buymeacoffee.com/ashm"
              target="_blank"
              rel="noopener"
              className={styles.contactCard + " " + styles.buymeacoffee}
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Buy Me A Coffee</title>
                <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364zm-6.159 3.9c-.862.37-1.84.788-3.109.788a5.884 5.884 0 01-1.569-.217l.877 9.004c.065.78.717 1.38 1.5 1.38 0 0 1.243.065 1.658.065.447 0 1.786-.065 1.786-.065.783 0 1.434-.6 1.499-1.38l.94-9.95a3.996 3.996 0 00-1.322-.238c-.826 0-1.491.284-2.26.613z" />
              </svg>
              ashm
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        Copyright 2022 - Ash "Monty" -{" "}
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
