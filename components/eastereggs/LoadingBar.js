import styles from "../../styles/components/eastereggs/loadingbar.module.css";

export default function LoadingBar(context) {
  return (
    <div className={styles.egg}>
      <h2>Good job, you found an easter egg!</h2>
      <p>Now gimme a sec to load this</p>
      <div className={styles.loadingbar}></div>
    </div>
  );
}
