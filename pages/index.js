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
              <Link href="#projects">Projects</Link>
            </li>
            <li className={styles.navbarItem}>
              <Link href="#contact">Contact</Link>
            </li>
          </ul>
        </header>
        <div className={styles.main}>
          <div className={styles.me}>
            <Image
              src="https://via.placeholder.com/300?text=Placeholder"
              alt="Me"
              width="300px"
              height="300px"
              className={styles.meImage}
            />
            <div className={styles.meText} id="about">
              <h1 className={styles.meHeader}>Hi, I'm Monty!</h1>
              <p className={styles.meParagraph}>
                Hello! I'm Monty and I make stuff&#8482; in JavaScript. For
                websites, such as this one, I usually use Next.js.
              </p>
              <p className={styles.meParagraph}>
                I also enjoy localizing open source projects from English to
                Italian and vice versa.
              </p>
              <p className={styles.meParagraph}>
                I need to think of something else to write here. Bees bees bees
                bees bees bees bees bees bees bees bees bees bees bees bees bees
                bees.
              </p>
            </div>
          </div>
        </div>
      </section>
    </home>
  );
}
