import styles from "../styles/errorReportDialog.module.css";

import { useState } from "react";

export default function SendErrorReportDialog({ setShowDialog, errorCode }) {
  const [customMessage, setCustomMessage] = useState(false);
  const [moreInfo, setMoreInfo] = useState("");

  const report = {
    url: window.location.href,
    errorCode: errorCode,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
    moreInfo: moreInfo,
  };

  const send404Report = async () => {
    const postReport = await fetch(
      `${window.location.origin}/api/errorReport`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(report),
      }
    );

    if (postReport.ok) {
      setCustomMessage({
        title: "Woohoo!",
        message:
          "Thank you for reporting this incident! I'll make sure to look into it.",
      });
    } else {
      setCustomMessage({
        title: "Oops.",
        message:
          "Something went wrong, could you do me a favor and try again, please?",
      });
    }
  };

  return (
    <div className={styles.dialog}>
      <div className={styles.windowWrapper}>
        <div className={styles.window}>
          {!customMessage ? (
            <>
              <h1>{errorCode} error report.</h1>
              <p>
                Thanks for taking the time to report this mishap! Just to be
                entirely transparent, here's all the data that will be sent (pro
                tip: the <code>moreInfo</code> field is editable, so you can add
                more info if you want):
              </p>

              <code className={styles.code}>
                {"{"}
                <br />
                {"  "}"url": <span>"{report.url}"</span>,
                <br />
                {"  "}"errorCode": <span>"{report.errorCode}"</span>,
                <br />
                {"  "}"userAgent": <span>"{report.userAgent}"</span>,
                <br />
                {"  "}"timestamp": <span>"{report.timestamp}"</span>,
                <br />
                {"  "}"moreInfo":{" "}
                <span>
                  <span
                    className={styles.moreInfo}
                    onInput={(e) => {
                      setMoreInfo(e.target.innerText);
                    }}
                    contentEditable="true"
                  >
                    not provided (feel free to edit)
                  </span>
                </span>
                <br />
                {"}"}
              </code>

              <p>Are you ok with sharing this information with me?</p>
              <div className={styles.buttonWrapper}>
                <button
                  onClick={() =>
                    setCustomMessage({
                      title: "Oh :(",
                      message:
                        "Just kidding, that's fine too! If you ever change your mind, just click the button again.",
                    })
                  }
                  className={styles.deny}
                >
                  No, don't send :(
                </button>
                <button onClick={send404Report} className={styles.confirm}>
                  Yes, send it! :)
                </button>
              </div>
            </>
          ) : (
            <>
              <h1>{customMessage.title}</h1>
              <p style={{ paddingBottom: "2rem" }}>{customMessage.message}</p>
              <div className={styles.buttonWrapper}>
                <button onClick={() => setShowDialog(false)}>Close</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
