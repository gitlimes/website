import Head from "next/head";
import { useState } from "react";
import GoHome from "../components/GoHome";
import OpenGraph from "../components/openGraph";
import Footer from "../components/Footer";

import styles from "../styles/stuffitempage.module.css";

export default function WiiUerrgen() {
	const [header, setHeader] = useState("");
	const [caption, setCaption] = useState("");
	const [button, setButton] = useState("");

	const renderURL = `/api/errorgen/wiiu?header=${encodeURIComponent(
		header
	)}&caption=${encodeURIComponent(caption)}&button=${encodeURIComponent(
		button
	)}`;

	return (
		<div>
			<Head>
				<title>Wii U error gen | ash</title>
				<OpenGraph />
			</Head>

			<div className={styles.wrapper} id="wrapper">
				<GoHome />

				<div className={styles.floatingContainer}>
					<div className={styles.projectHero}>
						<h1>
							<span className="accented">Wii U</span> error gen
						</h1>
						<p>Render a custom Wii U error dialog</p>
					</div>

					<div className={styles.elWithSideIcon} style={{ marginTop: "2rem" }}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 18"
							width="36px"
						>
							<path
								d="M24 4H0V2.5A2.5 2.5 0 0 1 2.5 0h19A2.5 2.5 0 0 1 24 2.5V4z"
								style={{ fill: "var(--accent)" }}
							/>
							<path
								d="M21.5 18h-19A2.5 2.5 0 0 1 0 15.5V4h24v11.5a2.5 2.5 0 0 1-2.5 2.5z"
								style={{ fill: "rgba(var(--accentrgb), 0.2)" }}
							/>
							<rect
								x="2"
								y="12"
								width="20"
								height="4"
								rx="1"
								ry="1"
								style={{ fill: "rgba(var(--accentrgb), 0.2)" }}
							/>
						</svg>
						<input
							type="text"
							required={true}
							placeholder="Error Code: 123-4567"
							onChange={(e) => setHeader(e.target.value)}
							className={styles.styled}
						/>
					</div>

					<div className={styles.elWithSideIcon} style={{ marginTop: "1rem" }}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 18"
							width="36px"
						>
							<path
								d="M24 4H0V2.5A2.5 2.5 0 0 1 2.5 0h19A2.5 2.5 0 0 1 24 2.5V4z"
								style={{ fill: "rgba(var(--accentrgb), 0.2)" }}
							/>
							<path
								d="M21.5 18h-19A2.5 2.5 0 0 1 0 15.5V4h24v11.5a2.5 2.5 0 0 1-2.5 2.5z"
								style={{ fill: "var(--accent)" }}
							/>
							<rect
								x="2"
								y="12"
								width="20"
								height="4"
								rx="1"
								ry="1"
								style={{ fill: "rgba(var(--accentrgb), 0.2)" }}
							/>
						</svg>
						<textarea
							type="text"
							required={true}
							rows="3"
							placeholder={"Lorem Ipsum, dolor\nsit amet.\nBlah blah blah."}
							onChange={(e) => setCaption(e.target.value)}
							className={styles.styled}
						/>
					</div>

					<div className={styles.elWithSideIcon} style={{ marginTop: "1rem" }}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 18"
							width="36px"
						>
							<path
								d="M24 4H0V2.5A2.5 2.5 0 0 1 2.5 0h19A2.5 2.5 0 0 1 24 2.5V4z"
								style={{ fill: "rgba(var(--accentrgb), 0.2)" }}
							/>
							<path
								d="M21.5 18h-19A2.5 2.5 0 0 1 0 15.5V4h24v11.5a2.5 2.5 0 0 1-2.5 2.5z"
								style={{ fill: "rgba(var(--accentrgb), 0.2)" }}
							/>
							<rect
								x="2"
								y="12"
								width="20"
								height="4"
								rx="1"
								ry="1"
								style={{ fill: "var(--accent)" }}
							/>
						</svg>
						<input
							type="text"
							required={true}
							placeholder="OK"
							onChange={(e) => setButton(e.target.value)}
							className={styles.styled}
						/>
					</div>

					<a
						href={renderURL}
						target="_blank"
						className={!header || !caption || !button ? styles.disabled : null}
					>
						<button className={styles.styled}>Render</button>
					</a>
				</div>

				<Footer sourceCodeOverride="https://github.com/ashmonty/website/blob/main/pages/api/errorgen/wiiu.js" />
			</div>
		</div>
	);
}
