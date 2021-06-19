import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import parse from "html-react-parser";

import styles from "../styles/Home.module.css";

export async function getServerSideProps(context) {
  const localeJSON = require(`../locales/${context.locale}.json`);
  return {
    props: { localeJSON },
  };
}

export default function Home({ localeJSON }) {

  const router = useRouter();
  useEffect(() => {
    let keyPresses = "";
    document.addEventListener("keydown", (event) => {
      const key = event.key.toLowerCase();
      keyPresses += key;

      let winRegex = /win/;

      let ghRegex = /gh/;

      // This redirects to win.monty.ga if the user types "win"
      if (winRegex.test(keyPresses)) {
        router.push("https://win.monty.ga");
      }

      // This redirects to my github if the user types "gh"
      if (ghRegex.test(keyPresses)) {
        router.push("https://github.com/montylion");
      }

    })
  })
  return (
    <home>
      <Head>
        <title>Monty</title>

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

        <meta property="og:site_name" content="Monty (montylion)" />
        <meta property="og:title" content="Monty (montylion)" />
        <meta
          property="og:description"
          content="I make stuff™ in JavaScript & Node.js as a hobby."
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
        <header className={styles.navbarBg}>
          <ul className={styles.navbarList}>
            <li className={styles.navbarMainItem}>Monty</li>
            <li className={styles.navbarItem}>
              <Link href="#about">{localeJSON.navbar.about}</Link>
            </li>
            <li className={styles.navbarItem}>
              <Link href="#stuff">{localeJSON.navbar.stuff}</Link>
            </li>
            <li className={styles.navbarItem}>
              <Link href="#contact">{localeJSON.navbar.contact}</Link>
            </li>
          </ul>
        </header>
        <div className={styles.mainWrapper}>
          <div className={styles.heroSection}>
            <img
              src="/this_is_temporary_and_should_not_be_used_in_the_official_website.jpg"
              alt="Me"
              className={styles.heroImage}
            />
            <h1 className={styles.heroText}>
              {localeJSON.imageSection.paragraph}
            </h1>
          </div>

          <div className={styles.aboutSection} id="about">
            <div className={styles.aboutText}>
              <h1 className={styles.aboutHeader}>{localeJSON.about.header}</h1>
              <p className={styles.aboutParagraph}>
                {parse(localeJSON.about.paragraphs.a)}
              </p>
              <p className={styles.aboutParagraph}>
                {parse(localeJSON.about.paragraphs.b)}
              </p>
            </div>
            <div className={styles.aboutImageContainer}>
              <img
                src="/spaghetti.jpg"
                alt="Me"
                className={styles.aboutImage}
              />
              <p style={{ textAlign: "center", marginRight: "20px" }}>
                {localeJSON.about.imageCaption}
              </p>
            </div>
          </div>

          <div className={styles.stuffBg}>
            <div className={styles.stuffSection} id="stuff">
              <h1 className={styles.stuffHeader}>{localeJSON.stuff.header}</h1>
              <p className={styles.stuffParagraph}>
                {localeJSON.stuff.paragraph}
              </p>
              <div className={styles.stuffList}>
                <div className={styles.stuffCard}>
                  <h2 className={styles.stuffCardHeader}>
                    {localeJSON.stuff.cards[0].title}
                  </h2>
                  <div className={styles.stuffCardIconFlex}>
                    <a
                      href="https://github.com/montylion/discord-md-badge"
                      target="_blank"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgb(129,129,129)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.stuffCardIcon}
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                  </div>
                  <p className={styles.stuffCardParagraph}>
                    {localeJSON.stuff.cards[0].caption}
                  </p>
                  <p className={styles.stuffLang}>JavaScript, Next.js</p>
                </div>
                <div className={styles.stuffCard}>
                  <h2 className={styles.stuffCardHeader}>
                    {localeJSON.stuff.cards[1].title}
                  </h2>
                  <div className={styles.stuffCardIconFlex}>
                    <a
                      href="https://github.com/montylion/website"
                      target="_blank"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgb(129,129,129)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.stuffCardIcon}
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                  </div>
                  <p className={styles.stuffCardParagraph}>
                    {localeJSON.stuff.cards[1].caption}
                  </p>
                  <p className={styles.stuffLang}>JavaScript, Next.js</p>
                </div>
                <div className={styles.stuffCard}>
                  <h2 className={styles.stuffCardHeader}>
                    {localeJSON.stuff.cards[2].title}
                  </h2>
                  <div className={styles.stuffCardIconFlex}>
                    <a
                      href="https://github.com/montylion/neofetch-but-its-always-arch"
                      target="_blank"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgb(129,129,129)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.stuffCardIcon}
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                  </div>
                  <p className={styles.stuffCardParagraph}>
                    {localeJSON.stuff.cards[2].caption}
                  </p>
                  <p className={styles.stuffLang}>Shell</p>
                </div>
                <div className={styles.stuffCard}>
                  <h2 className={styles.stuffCardHeader}>
                    {localeJSON.stuff.cards[3].title}
                  </h2>
                  <div className={styles.stuffCardIconFlex}>
                    <a href="https://croissant.ga" target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgb(129,129,129)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.stuffCardIcon}
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                    </a>
                    <a
                      href="https://github.com/montylion/croissant"
                      target="_blank"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgb(129,129,129)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.stuffCardIcon}
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                  </div>
                  <p className={styles.stuffCardParagraph}>
                    {localeJSON.stuff.cards[3].caption}
                  </p>
                  <p className={styles.stuffLang}>JavaScript, Next.js</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.contactBg}>
            <div className={styles.contactSection} id="contact">
              <h1 className={styles.contactHeader}>
                {localeJSON.contact.header}
              </h1>
              <p className={styles.contactParagraph}>
                {localeJSON.contact.paragraph}
              </p>
              <div className={styles.contactCardList}>
                <a
                  href="https://github.com/montylion"
                  target="_blank"
                  className={styles.contactCardGitHub}
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.contactCardIcon}
                  >
                    <title>GitHub</title>
                    <path
                      fill="#fff"
                      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    />
                  </svg>
                  montylion
                </a>

                <a
                  className={styles.contactCardDiscord}
                  title={localeJSON.easterEggs.discord}
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.contactCardIcon}
                  >
                    <title>Discord</title>
                    <path
                      fill="#fff"
                      d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
                    />
                  </svg>
                  Monty#3581
                </a>

                <a
                  href="https://twitter.com/montylion_"
                  target="_blank"
                  className={styles.contactCardTwitter}
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.contactCardIcon}
                  >
                    <title>Twitter</title>
                    <path
                      fill="#fff"
                      d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                    />
                  </svg>
                  montylion_
                </a>

                <a
                  href="mailto:monty.github@gmail.com"
                  target="_blank"
                  className={styles.contactCardGmail}
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.contactCardIcon}
                  >
                    <title>Gmail</title>
                    <path
                      fill="#fff"
                      d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
                    />
                  </svg>
                  monty.github
                </a>

                <a
                  href="https://ko-fi.com/montylion"
                  target="_blank"
                  className={styles.contactCardKofi}
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.contactCardIcon}
                  >
                    <title>Ko-fi</title>
                    <path
                      fill="#fff"
                      d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"
                    />
                  </svg>
                  montylion
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer} title={localeJSON.easterEggs.footer}>
          Copyright 2021 - Monty (montylion)
        </div>
      </section>
    </home>
  );
}
