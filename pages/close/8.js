import Head from "next/head";
import Link from "next/link";
import "98.css";

export default function Close1() {
  return (
    <home>
      <Head>
        <title>monty.exe</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <section>
        <div style={{ width: 300 }} className="window monty">
          <div className="title-bar">
            <div className="title-bar-text">monty.exe</div>
            <div className="title-bar-controls">
              <Link href="/close/9">
                <button aria-label="Close" />
              </Link>
            </div>
          </div>
          <div className="window-body">
            <h3 style={{ textAlign: "center" }}>Huh...</h3>
            <p style={{ textAlign: "center" }}>
              What do you mean that didn't work...?
            </p>
          </div>
        </div>
      </section>
    </home>
  );
}
