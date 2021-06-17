import Head from "next/head";
import Link from "next/link";
// import Image from "next/image";
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
              <Link href="#about" className={styles.link}>
                About
              </Link>
            </li>
            <li className={styles.navbarItem}>
              <Link href="#projects">Projects</Link>
            </li>
            <li className={styles.navbarItem}>
              <Link href="#contact">Contact</Link>
            </li>
          </ul>
        </header>
      </section>
    </home>
  );
}
