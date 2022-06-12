import styles from "../styles/errorPage.module.css";
import SendErrorReportDialog from "../components/SendErrorReportDialog";
import OpenGraph from "../components/openGraph";

import Head from "next/head";
import { useState } from "react";

export default function Custom404() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>500 - Internal server error</title>
        <OpenGraph />
      </Head>
      <div className={styles.container}>
        <h1>500</h1>
        <h2>Internal server error. Whoops!</h2>
        <p>
          Do not fret though! Here's a button that lets you report the incident
          with the click of a button (or two).
        </p>
        <p>
          To start, click the "Send report" button: you will be prompted to
          check the info, and confirm (or deny) that you want to send it.
        </p>
        <div className={styles.buttonWrapper}>
          <a href="/" className={styles.homepageLink} rel="noreferrer noopener">
            Go to the homepage
          </a>
          <button onClick={() => setShowDialog(true)}>Send report</button>
        </div>
      </div>
      {showDialog && (
        <SendErrorReportDialog errorCode="500" setShowDialog={setShowDialog} />
      )}
    </div>
  );
}
