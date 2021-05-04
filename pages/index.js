import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import "98.css";

export default function Home() {
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
        <div
          style={{
            width: 300,
          }}
          className="window monty"
        >
          <div className="title-bar">
            <div className="title-bar-text">monty.exe</div>
            <div className="title-bar-controls">
              <Link href="/close">
                <button aria-label="Close" />
              </Link>
            </div>
          </div>

          <div className="window-body">
            <h3 style={{ textAlign: "center" }}>Welcome!</h3>
            <p style={{ textAlign: "center" }}>Here's some of my projects:</p>

            <div className="field-row" style={{ justifyContent: "center" }}>
              <Link href="https://croissant.ga">
                <button style={{ width: "350%", height: "35px" }}>
                  croissant.ga
                </button>
              </Link>
              <Link href="https://github.com/montylion/croissant">
                <button
                  style={{ width: "100%", height: "35px" }}
                  title="Source code"
                >
                  <Image
                    src="https://win98icons.alexmeub.com/icons/png/network_drive_cool-5.png"
                    height="25px"
                    width="25px"
                    alt="GitHub"
                  />
                </button>
              </Link>
            </div>
            <div className="field-row" style={{ justifyContent: "center" }}>
              <Link href="/aytolmao">
                <button style={{ width: "350%", height: "35px" }}>
                  ay to lmao
                </button>
              </Link>
              <Link href="https://github.com/montylion/website/blob/main/pages/aytolmao.js">
                <button
                  style={{ width: "100%", height: "35px" }}
                  title="Source code"
                >
                  <Image
                    src="https://win98icons.alexmeub.com/icons/png/network_drive_cool-5.png"
                    height="25px"
                    width="25px"
                    alt="GitHub"
                  />
                </button>
              </Link>
            </div>
            <div className="field-row" style={{ justifyContent: "center" }}>
              <Link href="/embed/generator">
                <button style={{ width: "350%", height: "35px" }}>
                  Discord Embed Generator
                </button>
              </Link>
              <Link href="https://github.com/montylion/website/blob/main/pages/embed/generator.js">
                <button
                  style={{ width: "100%", height: "35px" }}
                  title="Source code"
                >
                  <Image
                    src="https://win98icons.alexmeub.com/icons/png/network_drive_cool-5.png"
                    height="25px"
                    width="25px"
                    alt="GitHub"
                  />
                </button>
              </Link>
            </div>
            <div className="field-row" style={{ justifyContent: "center" }}>
              <Link href="https://github.com/BotSauce/BotSauce">
                <button style={{ width: "350%", height: "35px" }}>
                  BotSauce (no longer in development)
                </button>
              </Link>
              <Link href="https://github.com/BotSauce/BotSauce">
                <button
                  style={{ width: "100%", height: "35px" }}
                  title="Source code"
                >
                  <Image
                    src="https://win98icons.alexmeub.com/icons/png/network_drive_cool-5.png"
                    height="25px"
                    width="25px"
                    alt="GitHub"
                  />
                </button>
              </Link>
            </div>
            <div className="field-row" style={{ justifyContent: "center" }}>
              <Link href="/aboutme">
                <button style={{ width: "350%", height: "35px" }}>
                  About me
                </button>
              </Link>
              <Link href="https://github.com/montylion">
                <button
                  style={{ width: "100%", height: "35px" }}
                  title="My GitHub profile"
                >
                  <Image
                    src="https://win98icons.alexmeub.com/icons/png/address_book_user.png"
                    height="25px"
                    width="25px"
                    alt="GitHub"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </home>
  );
}
