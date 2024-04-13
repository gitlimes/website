import styles from "../styles/components/footer.module.css";

export default function Footer({ sourceCodeOverride }) {
  return (
    <footer className={styles.footer}>
      Copyright 2024 - ash -{" "}
      <a
        href={sourceCodeOverride || "https://github.com/gitlimes/website"}
        target="_blank"
        rel="noopener"
      >
        Source code
      </a>
    </footer>
  );
}
