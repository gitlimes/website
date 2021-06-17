import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
// import React, { useEffect } from "react";

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
            <h1 className={styles.aboutHeader}>About me</h1>
          </div>
        </div>
      </section>
    </home>
  );
}
