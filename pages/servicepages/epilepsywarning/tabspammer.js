import Head from "next/head";
import Link from "next/link";
import "98.css";
import React, { useEffect } from "react";

export default function Generator() {
  useEffect(() => {
    window.open("/servicepages/epilepsywarning/tabspammer");
  });
  return (
    <home>
      <Head>
        <title>Why</title>
      </Head>
      <div
        style={{
          background: "white",
          width: "100vw",
          height: "100vh",
          position: "absolute"
        }}
      ></div>
    </home>
  );
}
