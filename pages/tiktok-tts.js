import Head from "next/head";

import CreatableSelect from "react-select/creatable";

import GoHome from "../components/GoHome";
import Guide from "../components/Guide";
import OpenGraph from "../components/openGraph";
import Footer from "../components/Footer";

import styles from "../styles/stuffitempage.module.css";

export default function TikTokTTS({ darkMode }) {

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

	return (
		<div>
			<Head>
				<title>TikTok TTS | limes.pink</title>
				<meta property="og:title" content="TikTok TTS | limes.pink" />
				<meta property="twitter:title" content="TikTok TTS | limes.pink" />
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
						options={["I'm telling you it's broken"]}
						noOptionsMessage={() => "No results"}
						placeholder="Select a voice"
						menuPlacement="top"
						formatCreateLabel={(inputValue) =>
							`Try voice [${inputValue}] (untested)`
						}
						styles={
							darkMode ? customDropdownStyles.dark : customDropdownStyles.light
						}
					/>
					<textarea
						className={styles.textarea}
						placeholder="Type the text to be read"
						rows="3"
						maxLength="300"
					/>
					<button
						className={styles.button}
						onClick={(e) => {
							e.preventDefault();
						}}
					>
						Download
					</button>
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

				<Footer sourceCodeOverride="https://github.com/gitlimes/website/blob/main/pages/tiktok-tts.js" />
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
