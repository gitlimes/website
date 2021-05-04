import Head from "next/head";
import Link from "next/link";
import "98.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Terminal() {
  const router = useRouter();
  useEffect(() => {
    router.push("/close/12");
  });

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
        <p>Ok this should work</p>
      </section>
    </home>
  );
}
