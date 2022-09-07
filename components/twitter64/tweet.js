import styles from "/styles/stuffitempage.module.css";
import { useState } from "react";

export default function Tweet({ accessToken, setNotice }) {
  const [tweet, setTweet] = useState();
  const tweetTweet = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/post-tweet", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        text: tweet,
      }),
    });

    if (response.ok) {
      setNotice("Tweet sent successfully!");
    } else {
      setNotice("Something went wrong, pelase try again.");
    }
  };
  return (
    <div>
      <textarea
        className={styles.styled}
        placeholder="Write your tweet here"
        rows="3"
        onChange={(e) => setTweet(e.target.value)}
        maxLength="280"
      />
      <button className={styles.styled} onClick={tweetTweet}>
        Tweet
      </button>
    </div>
  );
}
