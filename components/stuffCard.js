import React from "react";
import styles from "../styles/components/stuffcard.module.css";

export default function card(props) {
  return (
    <a
      href={props.link}
      className={(() => {
        if (!props.hideOnMobile) {
          return styles.card;
        } else {
          return styles.card + " " + styles.hideOnMobile;
        }
      })()}
    >
      <h2>{props.title}</h2>
      <p>{props.caption}</p>
    </a>
  );
}
