import Head from "next/head";
import { useState } from "react";

import CreatableSelect from "react-select/creatable";

const fallbackVoices = require("../public/assets/json/tiktokVoices.json");

import GoHome from "../components/GoHome";
import Guide from "../components/Guide";
import OpenGraph from "../components/openGraph";
import Footer from "../components/Footer";

import styles from "../styles/stuffitempage.module.css";

import { saveAs } from "file-saver";
import absoluteUrl from "next-absolute-url";

export async function getServerSideProps() {
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
		rawVoices = rawVoices.filter(
			(line) => !line.match(emptyLineRegex) && line !== ""
		);

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
		const englishVoices = voiceList.filter(
			(voice) =>
				voice.label?.includes("English") || voice.label?.includes("Narrator")
		);
		const disneyVoices = voiceList.filter((voice) =>
			voice.label?.includes("Disney")
		);
		const singingVoices = voiceList.filter((voice) =>
			voice.label?.includes("singing")
		);
		const otherVoices = voiceList.filter(
			(voice) =>
				!voice.label?.includes("English") &&
				!voice.label?.includes("Disney") &&
				!voice.label?.includes("Narrator") &&
				!voice.label?.includes("singing")
		);

		// create the final voiceList object
		voiceList = [
			{ label: "English", options: englishVoices },
			{ label: "Singing", options: singingVoices },
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

	const voices = await getVoices();

	return {
		props: {
			voices,
		},
	};
}

export default function TikTokTTS({ voices, darkMode }) {
	const [notice, setNotice] = useState("");
	const [selectedVoice, setSelectedVoice] = useState(null);
	const [text, setText] = useState();

	const customDropdownStyles = {
		light: {
			option: (provided, state) => ({
				...provided,
				background: state.isSelected ? "var(--accent)" : "rgba(0,0,0,0)",

				":active, :active:hover": {
					background: "var(--accent)",
					color: "#fff",
				},

				":hover": {
					background: state.isSelected
						? "var(--accent)"
						: "rgba(var(--accentrgb), 0.75)",
					color: "#fff",
				},
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
			input: (provided) => ({
				...provided,
				color: "var(--secondary) !important",
			}),
			placeholder: (provided) => ({
				...provided,
				color: "rgba(var(--secondaryrgb), 0.8) !important",
			}),
			singleValue: (provided) => ({
				...provided,
				color: "var(--secondary) !important",
			}),
		},
		dark: {
			option: (provided, state) => ({
				...provided,
				background: state.isSelected ? "var(--accent)" : "rgba(0,0,0,0)",

				":active, :active:hover": {
					background: "var(--accent)",
					color: "#fff",
				},

				":hover": {
					background: state.isSelected
						? "var(--accent)"
						: "rgba(var(--accentrgb), 0.75)",
					color: "#fff",
				},
			}),
			control: (provided, state) => ({
				...provided,
				background: "rgba(var(--secondaryrgb), 0.15)",
				boxShadow: state.selectProps.menuIsOpen
					? "0 0 0 2px var(--accent) !important"
					: "",
				borderColor: "rgba(0,0,0,0) !important",
				outline: "none !important",
			}),
			menu: (provided) => ({
				...provided,
				background: "#2f3159",
			}),
			input: (provided) => ({
				...provided,
				color: "var(--secondary) !important",
			}),
			placeholder: (provided) => ({
				...provided,
				color: "rgba(var(--secondaryrgb), 0.8) !important",
			}),
			singleValue: (provided) => ({
				...provided,
				color: "var(--secondary) !important",
			}),
		},
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
				<title>TikTok TTS | ash</title>
				<meta property="og:title" content="TikTok TTS | ash" />
				<meta property="twitter:title" content="TikTok TTS | ash" />
				<meta
					property="og:description"
					content="Read text in TikTok's Text To Speech voices. (Indefinitely broken)"
				/>
				<meta
					property="twitter:description"
					content="Read text in TikTok's Text To Speech voices. (Indefinitely broken)"
				/>
				<meta
					property="og:image"
					content="https://limes.pink/assets/images/twimg.png"
				/>
				<meta
					name="twitter:image"
					content="https://limes.pink/assets/images/twimg.png"
				/>
				<OpenGraph />
			</Head>

			<div className={styles.wrapper} id="wrapper">
				<GoHome />

				<div
					className={styles.floatingContainer}
					style={{ opacity: 0.3, pointerEvents: "none" }}
				>
					<div className={styles.projectHero}>
						<h1>
							TikTok <span className="accented">TTS</span>
						</h1>
						<p>Read text in TikTok's Text To Speech voices.</p>
					</div>

					<CreatableSelect
						className={styles.select}
						options={voices}
						noOptionsMessage={() => "No results"}
						placeholder="Select a voice"
						menuPlacement="top"
						formatCreateLabel={(inputValue) =>
							`Try voice [${inputValue}] (untested)`
						}
						styles={
							darkMode ? customDropdownStyles.dark : customDropdownStyles.light
						}
						onChange={setSelectedVoice}
					/>
					<textarea
						className={styles.textarea}
						placeholder="Type the text to be read"
						rows="3"
						onChange={(e) => setText(e.target.value)}
						maxLength="300"
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

				<Footer sourceCodeOverride="https://github.com/ashmonty/website/blob/main/pages/tiktok-tts.js" />
			</div>

			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					background: "var(--secondary)",
					color: "var(--background)",
					padding: "8px 16px",
					textAlign: "center",
					borderRadius: "8px",
					width: "100%",
					maxWidth: "60vw",
				}}
			>
				<p>
					This tool is no longer supported, as TikTok now requires
					authentication to access the endpoint.
					<br />
					Thank you for your interest!
				</p>
			</div>
		</div>
	);
}
