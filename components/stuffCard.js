import React from "react";
import styles from "../styles/components/stuffcard.module.css";
import classNames from "classnames";

export default function card({
  link,
  samePage,
  index,
  onMouseOver,
  onMouseOut,
  hideOnMobile,
  title,
  caption,
}) {
  return (
    <a
      href={link}
      target={samePage ? "_self" : "_blank"}
      rel="noopener noreferrer"
      id={`stuffCard-${index}`}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      className={classNames({
        [styles.card]: true,
        [styles.hideOnMobile]: hideOnMobile,
      })}
    >
      <h2>{title}</h2>
      <p dangerouslySetInnerHTML={{ __html: caption }} />
    </a>
  );
}
