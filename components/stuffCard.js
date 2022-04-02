import React from "react";
import styles from "../styles/components/stuffcard.module.css";
import classNames from "classnames";

export default function card(props) {
  console.log(props.hideOnMobile);
  return (
    <a
      href={props.link}
      target="_blank"
      id={`stuffCard-${props.index}`}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
      className={classNames({
        [styles.card]: true,
        [styles.hideOnMobile]: props.hideOnMobile,
      })}
    >
      <h2>{props.title}</h2>
      <p dangerouslySetInnerHTML={{ __html: props.caption }} />
    </a>
  );
}
