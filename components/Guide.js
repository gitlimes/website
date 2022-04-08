import Link from "next/link";
import { useState } from "react";

import styles from "../styles/components/guide.module.css";

export default function Guide({ children }) {
  const [open, setopen] = useState(false);
  return (
    <div className={styles.guideWrapper}>
      <button className={styles.icon} onClick={() => setopen(!open)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={open ? "var(--accent)" : "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </button>
      {open && <div className={styles.guide}>{children}</div>}
    </div>
  );
}
