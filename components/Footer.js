import styles from "../styles/components/footer.module.css";

export default function Footer({ sourceCodeOverride }) {
  return (
    <footer className={styles.footer}>
      Copyright 2023 - ash -{" "}
      <a
        href={sourceCodeOverride || "https://github.com/ashmonty/website"}
        target="_blank"
        rel="noopener"
      >
        Source code
      </a>
    </footer>
  );
}
