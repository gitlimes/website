import styles from "../../styles/components/eastereggs/loadingbar.module.css";

export default function NotARickroll() {
  return (
    <div className={styles.egg}>
      <p>Lol you got Together Forever'd</p>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/yPYZpwSpKmA?autoplay=1&mute=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
