import React from "react";
import styles from "../styles/Home.module.css";
import parse from "html-react-parser";

export default class HeroSentence extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sentence: 0 };
  }

  componentDidMount() {
    this.update = setInterval(() => {
      if (
        this.state.sentence + 1 <
        this.props.localeJSON.index.hero.sentence.changing.length
      ) {
        this.setState({ sentence: this.state.sentence + 1 });
      } else {
        this.setState({ sentence: 0 });
      }
    }, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.update);
  }

  render() {
    const locale = this.props.localeJSON.index.hero;
    return (
      <div className={styles.text}>
        <h1>
          {parse(locale.header)}
        </h1>
        <p>
          {locale.sentence.static.subject}{" "}
          <span id="hero-verb">
            {locale.sentence.changing[this.state.sentence].verb}
          </span>
          <span className={styles.stuff}>
            {" "}
            {locale.sentence.static.stuff}
            {"™ "}
          </span>
          <span id="hero-object">
            {locale.sentence.changing[this.state.sentence].object}.
          </span>
          {locale.caption}
        </p>
      </div>
    );
  }
}
