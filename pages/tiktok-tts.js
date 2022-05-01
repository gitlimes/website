import Head from "next/head";
import { useState } from "react";
import classNames from "classnames";

import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const fallbackVoices = require("../fallbackVoices.json");

import GoHome from "../components/GoHome";
import Guide from "../components/Guide";
import OpenGraph from "../components/openGraph";
import styles from "../styles/TikTokTTS.module.css";

import { saveAs } from "file-saver";

export default function TikTokTTS() {
  const [voiceList, setVoiceList] = useState([]);
  const [notice, setNotice] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [text, setText] = useState();
  const [voiceBlob, setVoiceBlob] = useState();

  async function getVoices() {
    // we fetch the voice options from oscie's repo (thanks oscie), and we parse them to json
    const rawVoicesFetch = await fetch(
      "https://raw.githubusercontent.com/oscie57/tiktok-voice/main/codes.md"
    );
    // if fetch fails, use fallback
    if (!rawVoicesFetch.ok) {
      console.log(
        "[warn](tiktok-tts) voice fetch failed, using fallbackVoices"
      );
      return fallbackVoices;
    }

    let rawVoices = await rawVoicesFetch.text();

    // make each line its own string
    rawVoices = rawVoices.split("\n");

    // find the table header
    const headerRegex = /\| *Language *\| *Voice Code *\|/;
    const headerIndex =
      rawVoices.findIndex((line) => line.match(headerRegex)) + 2;

    // get everything from the header down
    rawVoices = rawVoices.splice(headerIndex);

    // remove empty lines
    const emptyLineRegex = /\| *\| *\|/;
    rawVoices = rawVoices.filter((line) => !line.match(emptyLineRegex));

    /* split each line into the columns, and clean it up.
       then, assign it to a { label, value } object in the voicelist array
    */
    let voiceList = rawVoices.map((line) => {
      const columns = line.split("|");
      const value = columns[2]?.trim().replace(/`/g, "");
      const label = `${columns[1]?.trim()} [${value}]`;

      return {
        label,
        value,
      };
    });

    // create the different voice categories
    const englishVoices = voiceList.filter((voice) =>
      voice.label?.includes("English")
    );
    const disneyVoices = voiceList.filter((voice) =>
      voice.label?.includes("Disney")
    );
    const otherVoices = voiceList.filter(
      (voice) =>
        !voice.label?.includes("English") && !voice.label?.includes("Disney")
    );

    // create the final voiceList object
    voiceList = [
      { label: "English", options: englishVoices },
      {
        label: "Disney",
        options: disneyVoices,
      },
      { label: "Other", options: otherVoices },
    ];

    // check the validity of the voiceList. if invalid, use fallback
    if (voiceList[0].options) {
      return voiceList;
    } else {
      console.log(
        "[warn](tiktok-tts) using fallback voices",
        "voicelist",
        voiceList
      );
      return fallbackVoices;
    }
  }

  getVoices().then(setVoiceList);

  const customDropdownStyles = {
    option: (provided, state) => ({
      ...provided,
      background:
        (state.isSelected && "var(--accent)") ||
        (state.isFocused && "rgba(0,0,0,0)"),
    }),
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      boxShadow: state.selectProps.menuIsOpen
        ? "0px 2px 4px 2px rgba(var(--secondaryrgb), 0.1), 0 0 0 2px var(--accent) !important"
        : "0px 2px 4px 2px rgba(var(--secondaryrgb), 0.1)",
      borderColor: "rgba(0,0,0,0) !important",
      outline: "none !important",
    }),
    input: (provided, _state) => ({
      ...provided,
      color: "var(--secondary) !important",
    }),
    placeholder: (provided, _state) => ({
      ...provided,
      color: "rgba(var(--secondaryrgb), 0.8) !important",
    }),
    singleValue: (provided, _state) => ({
      ...provided,
      color: "var(--secondary) !important",
    }),
  };

  async function getAudio() {
    const ttsurl = `https://api16-normal-useast5.us.tiktokv.com/media/api/text/speech/invoke/?text_speaker=${selectedVoice.value}&req_text=${text}&speaker_map_type=0`;
    const fetched = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(ttsurl)}`,
      {
        method: "POST",
      }
    );
    if (!fetched.ok) {
      console.log(fetched);
    }

    const jsondata = await fetched.json();
    const usableData = JSON.parse(jsondata.contents);

    // adapted from https://stackoverflow.com/a/27980815
    function b64toBlob(dataURI) {
      const byteString = atob(dataURI);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: "audio/mp3" });
    }

    if (usableData?.message === "success") {
      const v_str = usableData.data.v_str;

      const audioBlob = b64toBlob(v_str);
      console.log(audioBlob);

      saveAs(audioBlob, `${selectedVoice.label}.mp3`);

      setNotice("success");
    } else {
      setNotice(`Error: ${usableData.message}`);
      console.log("[warn](tiktok-tts) failed to get audio", usableData);
    }
  }

  return (
    <div>
      <Head>
        <title>TikTok TTS | Ash "Monty"</title>
        <OpenGraph />
      </Head>

      <div className={styles.wrapper} id="wrapper">
        <GoHome />

        <div className={styles.floatingContainer}>
          <div className={styles.projectHero}>
            <h1>
              TikTok <span className="accented">TTS</span>
            </h1>
            <p>Read text in TikTok's Text To Speech voices.</p>
          </div>

          <CreatableSelect
            className={styles.select}
            options={voiceList}
            isLoading={!voiceList}
            noOptionsMessage={() => "No results"}
            placeholder="Select a voice"
            menuPlacement="top"
            formatCreateLabel={(inputValue) =>
              `Try voice [${inputValue}] (untested)`
            }
            styles={customDropdownStyles}
            onChange={setSelectedVoice}
          />
          <textarea
            className={styles.textarea}
            placeholder="Type the text to be read"
            rows="3"
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className={styles.button}
            onClick={() => {
              if (selectedVoice && text) {
                setNotice("Downloading...");
                getAudio();
              } else {
                setNotice(
                  `Please${!selectedVoice ? " select a voice" : ""}${
                    !selectedVoice && !text ? " and" : ""
                  }${!text ? " enter some text" : ""}!`
                );
              }
            }}
          >
            Download
          </button>
          {notice === "success" ? (
            <p className={styles.notice}>
              Done! Make sure to check out the{" "}
              <span
                style={{ cursor: "pointer", color: "var(--accent)" }}
                onClick={() =>
                  document.querySelector("#credits button").click()
                }
              >
                awesome people who made this possible
              </span>
              !
            </p>
          ) : (
            <p
              className={styles.notice}
              style={{ visibility: notice ? "visible" : "hidden" }}
              dangerouslySetInnerHTML={{ __html: notice || "hi" }}
            />
          )}
        </div>

        <div id="credits" className={styles.guide}>
          <Guide icon="info">
            <h2>Credits</h2>
            <p>Huge thanks to all the people who made this possible:</p>
            <ul>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{ fontWeight: "bold" }}
                >
                  Me
                </a>
                , for making this page and finding some of the voices
              </li>
              <li>
                <a
                  href="https://github.com/oscie57"
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{ fontWeight: "bold" }}
                >
                  Oscie
                </a>
                , for making the{" "}
                <a
                  href="https://github.com/oscie57/tiktok-voice"
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{ fontWeight: "bold" }}
                >
                  tiktok-voice python script
                </a>
                , on which my code is heavily based on
              </li>
              <li>
                <a
                  href="https://twitter.com/xibwrangler"
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{ fontWeight: "bold" }}
                >
                  Spotlight
                </a>
                , for giving the initial idea for oscie's script
              </li>
              <li>
                <a
                  href="https://twitter.com/scanlime"
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{ fontWeight: "bold" }}
                >
                  Scanlime
                </a>
                , for providing some of the voice options
              </li>
            </ul>
          </Guide>
        </div>

        <div className={styles.footer}>
          Copyright 2022 - Ash "Monty" -{" "}
          <a
            href="https://github.com/ashmonty/website/blob/main/pages/tiktok-tts.js"
            target="_blank"
            rel="noopener"
          >
            Source code
          </a>
        </div>
      </div>
    </div>
  );
}