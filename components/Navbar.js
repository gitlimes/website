import Link from "next/link";

import styles from "../styles/components/navbar.module.css";

export default function Navbar({ darkMode, setDarkMode }) {

  setDarkMode(true); //always set to dark mode because i hate y'all

  return (
    <ul className={styles.navbar} id="navbar">
      <li className={styles.item}>
        <Link href="/">limes.pink</Link>
      </li>
      <li className={styles.item}>
        <Link href="#stuff">stuff™</Link>
      </li>
      <li className={styles.item}>
        <Link href="#contact">contact</Link>
      </li>
      {/*<li
        className={styles.darkModeToggle}
        onClick={() => {
          document.querySelector("body").style.transition = "background 250ms";
          setDarkMode(!darkMode);
        }}
      >
        {darkMode ? (
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
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ) : (
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
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        )}
      </li>*/}
    </ul>
  );
}
