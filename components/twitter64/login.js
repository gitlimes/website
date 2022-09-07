import styles from "/styles/stuffitempage.module.css";

export default function Login({ authUrl }) {
  const tweetTime = new Date("2022-09-07T10:35:32.000Z");

  return (
    <a href="https://twitter.com/ashmlnt/status/1567461559668035584?s=20&t=LgFqtP7Lg3suPr0GzSmd8w" referrerPolicy="no-referrer">
      <div className={styles.fakeTweet}>
        <div className={styles.tweetHeader}>
          <img alt="Profile picture of my Twitter account" src="https://cdn.discordapp.com/avatars/406125028065804289/4fef71772bccad4a8511784b80416b10.png?size=256" />
          <div className={styles.text}>
            <p className={styles.name}>ash</p>
            <p className={styles.username}>@ashmlnt</p>
          </div>
        </div>
        <p className={styles.tweetContent}>
          This is a real tweet to showcase Twitter 64. Check this tweet's
          source!
        </p>
        <p className={styles.tweetInfo}>
          {tweetTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          ·{" "}
          {tweetTime.toLocaleDateString([], {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}{" "}
          ·{" "}Twitter for Nintendo™ 64
        </p>
      </div>
      <a href={authUrl}>
        <button className={styles.styled}>Login</button>
      </a>
    </a>
  );
}
