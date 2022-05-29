import styles from "../../styles/components/eastereggs/loadingbar.module.css";

export default function LoadingBar(context) {
  return (
    <div className={styles.egg}>
      <h2>Good job, you found an easter egg!</h2>
      <p>Loading reward...</p>
      <div className={styles.loadingbar}></div>
    </div>
  );
}
