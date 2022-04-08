import Link from "next/link";

import styles from "../styles/components/gohome.module.css";

export default function GoHome() {
  return (
    <ul className={styles.navbar} id="navbar">
      <li className={styles.item}>
        <a href="/#stuff">
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
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </a>
      </li>
    </ul>
  );
}
