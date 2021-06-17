import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <home>
      <Head>
        <title>Monty</title>
      </Head>
      <section>
        <header className={styles.navbarBg}>
          <ul className={styles.navbarList}>
            <li className={styles.navbarMainItem}>Monty</li>
            <li className={styles.navbarItem}>
              <Link href="#about">About</Link>
            </li>
            <li className={styles.navbarItem}>
              <Link href="#stuff">Stuff&#8482;</Link>
            </li>
            <li className={styles.navbarItem}>
              <Link href="#contact">Contact</Link>
            </li>
          </ul>
        </header>
        <div className={styles.mainWrapper}>
          <div className={styles.imageSection}>
            <img
              src="/this_is_temporary_and_should_not_be_used_in_the_official_website.jpg"
              alt="Me"
              className={styles.imageImage}
            />
            <h1 className={styles.imageText}>Hi, I'm Monty!</h1>
          </div>

          <div className={styles.aboutSection} id="about">
            <h1 className={styles.aboutHeader}>About me</h1>
            <p className={styles.aboutParagraph}>
              I make stuff&#8482; in JavaScript & Node.js as a hobby.
            </p>
            <p className={styles.aboutParagraph}>
              Sometimes it's useful stuff&#8482;, sometimes it's just random
              stuff&#8482; made for fun.
              <i> Mostly the latter though.</i>
            </p>
            <p className={styles.aboutParagraph}>
              My go to for making websites/APIs is Next.js, a React framework.
              The very website you're currently browsing is in fact made with
              Next.js.
            </p>
            <p className={styles.aboutParagraph}>
              I also like localizing open source projects from English to
              Italian and vice versa.
            </p>
          </div>

          <div className={styles.stuffSection} id="stuff">
            <h1 className={styles.stuffHeader}>Stuff&#8482;</h1>
            <p className={styles.stuffParagraph}>
              Here's the aforementioned stuff&#8482;:
            </p>
            <div className={styles.stuffList}>
              <div className={styles.stuffCard}>
                <h2 className={styles.stuffCardHeader}>
                  Discord Markdown Badge
                </h2>
                <div className={styles.stuffCardIconFlex}>
                  <Link href="https://github.com/montylion/discord-md-badge">
                    <img
                      src="/github.svg"
                      alt="GitHub"
                      className={styles.stuffCardIcon}
                    />
                  </Link>
                </div>
                <p className={styles.stuffCardParagraph}>
                  Add to your GitHub readme a badge that shows your Discord
                  username and presence!
                </p>
                <p className={styles.stuffLang}>JavaScript, Next.js</p>
              </div>
              <div className={styles.stuffCard}>
                <h2 className={styles.stuffCardHeader}>Website</h2>
                <div className={styles.stuffCardIconFlex}>
                  <Link href="https://github.com/montylion/website">
                    <img
                      src="/github.svg"
                      alt="GitHub"
                      className={styles.stuffCardIcon}
                    />
                  </Link>
                </div>
                <p className={styles.stuffCardParagraph}>
                  The very website you're currently browsing!
                </p>
                <p className={styles.stuffLang}>JavaScript, Next.js</p>
              </div>
              <div className={styles.stuffCard}>
                <h2 className={styles.stuffCardHeader}>
                  Neofetch but it's always Arch
                </h2>
                <div className={styles.stuffCardIconFlex}>
                  <Link href="https://github.com/montylion/neofetch-but-its-always-arch">
                    <img
                      src="/github.svg"
                      alt="GitHub"
                      className={styles.stuffCardIcon}
                    />
                  </Link>
                </div>
                <p className={styles.stuffCardParagraph}>
                  This is exactly what it sounds like: this version of Neofetch
                  always returns Arch.
                </p>
                <p className={styles.stuffLang}>Shell</p>
              </div>
              <div className={styles.stuffCard}>
                <h2 className={styles.stuffCardHeader}>croissant.ga</h2>
                <div className={styles.stuffCardIconFlex}>
                  <Link href="https://github.com/montylion/croissant">
                    <img
                      src="/github.svg"
                      alt="GitHub"
                      className={styles.stuffCardIcon}
                    />
                  </Link>
                  <Link href="https://croissant.ga">
                    <img
                      src="/globe.svg"
                      alt="Website"
                      className={styles.stuffCardIcon}
                    />
                  </Link>
                </div>
                <p className={styles.stuffCardParagraph}>
                  A website that shows random pictures of croissants. Don't ask
                  me why.
                </p>
                <p className={styles.stuffLang}>JavaScript, Next.js</p>
              </div>
            </div>
          </div>

          <div className={styles.contactSection} id="contact">
            <h1 className={styles.aboutHeader}>Contact me</h1>
            <p className={styles.aboutParagraph}>
              Feel free to reach out to me here!
            </p>
            <div className={styles.contactCard}>

            </div>
          </div>
        </div>
      </section>
    </home>
  );
}
