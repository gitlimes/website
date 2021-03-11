import Head from 'next/head';
import Link from 'next/link';
import "98.css";

export default function AboutMe() {

  function dateDiff(dateold, datenew) {
    var ynew = datenew.getFullYear();
    var mnew = datenew.getMonth();
    var dnew = datenew.getDate();
    var yold = dateold.getFullYear();
    var mold = dateold.getMonth();
    var dold = dateold.getDate();
    var diff = ynew - yold;
    if (mold > mnew) diff--;
    else {
      if (mold == mnew) {
        if (dold > dnew) diff--;
      }
    }
    return diff;
  }

  function age() {
    var today = new Date();
    var olday = new Date("13 April 2004");
    const age = dateDiff(olday, today)
    return age
  }

  return (
    <home>
      <Head>
        <title>monty.exe</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />

      </Head>
      <section>
        <div style={{ width: 300 }} className="window monty" >
          <div className="title-bar">
            <div className="title-bar-text">monty.exe</div>
            <div className="title-bar-controls" >
              <Link href="/">
                <button aria-label="Close" />
              </Link>
            </div>
          </div>

          <div className="window-body">
            <h3 style={{ textAlign: "center" }}>Hi! I'm Monty!</h3>
            <p style={{ textAlign: "center" }}>I'm {age()}, and I live in Piedmont, Italy.</p>
            <p style={{ textAlign: "center" }}>I make spaghetti code (probably because I'm italian)</p>
            <p style={{ textAlign: "center" }}>That's it I guess</p>
            <div className="field-row" style={{ justifyContent: "center" }}>
              <Link href="https://github.com/montylion">
                <button>GitHub</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </home>
  )
}