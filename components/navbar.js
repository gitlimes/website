import Link from "next/link";

import styles from "../styles/components/navbar.module.css";

export default function Navbar(localeJSON) {
  return (
      <ul className={styles.navbar} id="navbar">
        <li className={styles.item}>
        <Link href="/">Ash</Link>
        </li>
        <li className={styles.item}>
          <Link href="#stuff">{localeJSON.index.navbar.stuff}</Link>
        </li>
        <li className={styles.item}>
          <Link href="#contact">{localeJSON.index.navbar.contact}</Link>
        </li>
      </ul>
  );
}
