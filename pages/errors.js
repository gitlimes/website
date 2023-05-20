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
	const [console, setConsole] = useState("wiiu");

	const renderURL = `/api/errorgen/${console}?header=${encodeURIComponent(
		header
	)}&caption=${encodeURIComponent(caption)}&button=${encodeURIComponent(
		button
	)}`;

	return (
		<div>
			<Head>
				<title>Console error gen | limes.pink</title>
				<meta property="og:title" content="Console error gen | limes.pink" />
				<meta
					property="twitter:title"
					content="Console error gen | limes.pink"
				/>
				<meta
					property="og:description"
					content="Render a custom Wii U/3DS error dialog!"
				/>
				<meta
					property="twitter:description"
					content="Render a custom Wii U/3DS error dialog!"
				/>
				<meta
					property="og:image"
					content="https://limes.pink/api/errorgen/3ds?header=limes.pink%2Ferrors&caption=Render%20a%20custom%20Wii%20U%2F3DS%20error%20dialog!&button=Cool!"
				/>
				<meta
					name="twitter:image"
					content="https://limes.pink/api/errorgen/3ds?header=limes.pink%2Ferrors&caption=Render%20a%20custom%20Wii%20U%2F3DS%20error%20dialog!&button=Cool!"
				/>
				<OpenGraph />
			</Head>

			<div className={styles.wrapper} id="wrapper">
				<GoHome />

				<div className={styles.floatingContainer}>
					<div className={styles.projectHero}>
						<h1>
							<span className="accented">Console</span> error gen
						</h1>
						<p>
							Render a custom{" "}
							<span
								onClick={(e) => {
									e.preventDefault();
									setConsole("wiiu");
								}}
								style={{
									background: console === "wiiu" ? "var(--accent)" : "none",
									color:
										console === "wiiu" ? "var(--background)" : "var(--text)",
									borderRadius: "2px",
									cursor: "pointer",
								}}
							>
								Wii U
							</span>
							<span>/</span>
							<span
								onClick={(e) => {
									e.preventDefault();
									setConsole("3ds");
								}}
								style={{
									background: console === "3ds" ? "var(--accent)" : "none",
									color:
										console === "3ds" ? "var(--background)" : "var(--text)",
									borderRadius: "2px",
									cursor: "pointer",
								}}
							>
								3DS
							</span>{" "}
							error dialog
						</p>
					</div>

					<div className={styles.elWithSideIcon} style={{ marginTop: "2rem" }}>
						{console === "wiiu" && (
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
						)}
						{console === "3ds" && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 18"
								width="36px"
								style={{ fill: "rgba(var(--accentrgb), 0.2)" }}
							>
								<path
									style={{ fill: "rgba(var(--accentrgb), 0.2)" }}
									d="M0 4h24v10H0z"
								/>
								<path d="M0 14h24v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1v-3z" />
								<path
									d="M0 0h24v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V0z"
									transform="rotate(180 12 2)"
									style={{ fill: "var(--accent)" }}
								/>
							</svg>
						)}

						<input
							type="text"
							required={true}
							placeholder="Error Code: 123-4567"
							onChange={(e) => setHeader(e.target.value)}
							className={styles.styled}
						/>
					</div>

					<div className={styles.elWithSideIcon} style={{ marginTop: "1rem" }}>
						{console === "wiiu" && (
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
						)}
						{console === "3ds" && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 18"
								width="36px"
							>
								<path style={{ fill: "var(--accent)" }} d="M0 4h24v10H0z" />
								<path
									d="M0 14h24v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1v-3z"
									style={{ fill: "rgba(var(--accentrgb), 0.2)" }}
								/>
								<path
									d="M0 0h24v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V0z"
									transform="rotate(180 12 2)"
									style={{ fill: "rgba(var(--accentrgb), 0.2)" }}
								/>
							</svg>
						)}
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
						{console === "wiiu" && (
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
						)}
						{console === "3ds" && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 18"
								width="36px"
							>
								<path
									style={{ fill: "rgba(var(--accentrgb), 0.2)" }}
									d="M0 4h24v10H0z"
								/>
								<path
									d="M0 14h24v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1v-3z"
									style={{ fill: "var(--accent)" }}
								/>
								<path
									d="M0 0h24v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V0z"
									transform="rotate(180 12 2)"
									style={{ fill: "rgba(var(--accentrgb), 0.2)" }}
								/>
							</svg>
						)}
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
						rel="noopener noreferrer"
					>
						<button className={styles.styled}>Render</button>
					</a>
				</div>

				<Footer sourceCodeOverride="https://github.com/gitlimes/website/blob/main/pages/api/errorgen/" />
			</div>
		</div>
	);
}
