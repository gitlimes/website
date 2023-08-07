import Head from "next/head";
import { useState, useEffect, Fragment } from "react";
import GoHome from "../components/GoHome";
import Guide from "../components/Guide";
import OpenGraph from "../components/openGraph";
import Footer from "../components/Footer";
import { saveAs } from "file-saver";

const {
	GIFEncoder,
	quantize,
	applyPalette,
	nearestColorIndex,
} = require("gifenc");

import classNames from "classnames";

import styles from "../styles/stuffitempage.module.css";

export default function SpinMii() {
	const [axis, setAxis] = useState("y");
	const [expression, setExpression] = useState("normal");
	const [miiData, setmiiData] = useState("");
	const [loading, setLoading] = useState(false);
	const [loadProgress, setLoadProgress] = useState(0);
	const [frames, setFrames] = useState(24);
	const [delay, setDelay] = useState(75);

	useEffect(() => {
		if (miiData) {
			localStorage.setItem("miiData", miiData);
		}
	}, [miiData]);

	useEffect(() => {
		setmiiData(localStorage.getItem("miiData"));
	}, []);

	async function render() {
		setLoading(true);
		const generateRenderUrl = (degrees) => {
			let cameraRotate = "";

			switch (axis) {
				case "x":
					cameraRotate = `&cameraXRotate=${degrees}&cameraYRotate=0&cameraZRotate=0`;
					break;
				case "y":
					cameraRotate = `&cameraXRotate=0&cameraYRotate=${degrees}&cameraZRotate=0`;
					break;
				case "z":
					cameraRotate = `&cameraXRotate=0&cameraYRotate=0&cameraZRotate=${degrees}`;
					break;
				default:
					cameraRotate = `&cameraXRotate=0&cameraYRotate=0&cameraZRotate=0`;
					break;
			}

			return `https://studio.mii.nintendo.com/miis/image.png?type=face&expression=${encodeURIComponent(
				expression || normal
			)}&width=512&bgColor=13173300&clothesColor=default${cameraRotate}&characterXRotate=0&characterYRotate=0&characterZRotate=0&lightXDirection=0&lightYDirection=0&lightZDirection=0&lightDirectionMode=none&instanceCount=1&instanceRotationMode=model&data=${encodeURIComponent(
				miiData
			)}`;
		};

		const gif = GIFEncoder();

		const canvas = document.createElement("canvas");
		canvas.width = 512;
		canvas.height = 512;
		const ctx = canvas.getContext("2d");

		for (let i = 0; i < frames; i++) {
			ctx.clearRect(0, 0, 512, 512);

			const frame = `https://corsproxy.org/?${encodeURIComponent(
				generateRenderUrl(Math.round((i * 360) / frames))
			)}`;
			const img = new Image();
			img.crossOrigin = "anonymous";
			img.src = frame;
			await img.decode();

			ctx.drawImage(img, 0, 0);
			setLoadProgress((i + 1) / frames);

			const { data, width, height } = ctx.getImageData(0, 0, 512, 512);

			const format = "rgba4444";

			const palette = quantize(data, 256, { format });
			const index = applyPalette(data, palette, format);

			const transparentIndex = nearestColorIndex(palette, [0, 0, 0, 0]);
			gif.writeFrame(index, width, height, {
				palette,
				transparent: true,
				transparentIndex,
				delay,
			});
		}

		gif.finish();

		const gifBuffer = gif.bytes();

		const blob = new Blob([gifBuffer], { type: "image/gif" });

		setLoading(false);
		setLoadProgress(0);

		// here we generate a pseudorandom filename
		const secretNumber = parseInt(miiData, 16) / (8 * 9 * 9 * 13 * 1 * 19 * 8 * 9 * 6 * 25 * 15 * 21 * 18 * 5 * 18 * 5 * 1 * 4 * 9 * 14 * 7 * 20 * 8 * 9 * 19 * 9 * 23 * 15 * 21 * 12 * 4 * 12 * 9 * 11 * 5 * 20 * 15 * 12 * 5 * 20 * 25 * 15 * 21 * 11 * 14 * 15 * 23 * 20 * 8 * 1 * 20 * 9 * 1 * 13 * 22 * 5 * 18 * 25 * 20 * 18 * 1 * 14 * 19) * axis.charCodeAt(0) * expression.charCodeAt(0) * expression.charCodeAt(1) * frames * delay;
		const secretString = parseInt(BigInt(secretNumber).toString().padEnd(24, "0").substring(0, 24)).toString(16).replace(/0+$/, '');

		saveAs(blob, `spinmii.limes.pink-${secretString}.gif`);
	}

	return (
		<div>
			<Head>
				<title>SpinMii | limes.pink</title>
				<meta property="og:title" content="spinmii | limes.pink" />
				<meta property="twitter:title" content="spinmii | limes.pink" />
				<meta
					property="og:description"
					content="Make your mii spin 360°, 'cause why not I suppose."
				/>
				<meta
					property="twitter:description"
					content="Make your mii spin 360°, 'cause why not I suppose."
				/>
				<meta
					property="og:image"
					content="https:/limes.pink/assets/images/spinmii.gif"
				/>
				<meta
					name="twitter:image"
					content="https:/limes.pink/assets/images/spinmii.gif"
				/>
				<OpenGraph />
			</Head>

			<div className={styles.wrapper} id="wrapper">
				<GoHome />

				<div className={styles.floatingContainer}>
					<div className={styles.projectHero}>
						<h1>
							Spin<span className="accented">Mii</span>
						</h1>
						<p>Make your mii spin 360°, 'cause why not I suppose.</p>
					</div>

					<label htmlFor="miiData">
						Your Mii's Mii Studio <code>data-params</code> (check ? at the top
						right of this page)
					</label>
					<input
						type="text"
						required={true}
						value={miiData}
						placeholder="Mii Studio data-params"
						onChange={(e) => setmiiData(e.target.value)}
					/>
					<label htmlFor="axis" style={{ marginTop: "1.5rem" }}>
						Spin axis
					</label>
					<fieldset
						name="axis"
						className={styles.three}
						onChange={(e) => setAxis(e.target.value)}
					>
						<input type="radio" id="x" name="spin" value="x" />
						<label htmlFor="x">X</label>
						<input type="radio" id="y" name="spin" value="y" defaultChecked />
						<label htmlFor="y">Y</label>
						<input type="radio" id="z" name="spin" value="z" />
						<label htmlFor="z">Z</label>
					</fieldset>

					<label htmlFor="expressions" style={{ marginTop: "1.5rem" }}>
						Expression
					</label>
					<fieldset
						name="expressions"
						className={styles.four}
						onChange={(e) => setExpression(e.target.value)}
					>
						{[
							"normal",
							"smile",
							"anger",
							"sorrow",
							"surprise",
							"blink",
							"frustrated",
							"wink_left",
						].map((expression, i) => (
							<Fragment key={i}>
								<input
									type="radio"
									id={expression}
									name="expression"
									value={expression}
									defaultChecked={expression === "normal"}
								/>
								<label htmlFor={expression}>
									{expression
										.replace("_", " ")
										.replace(expression[0], expression[0].toUpperCase())}
								</label>
							</Fragment>
						))}
					</fieldset>

					<details style={{ marginTop: "1.5rem" }}>
						<summary style={{ cursor: "pointer" }}>Advanced</summary>
						<div className={styles.sideBySide}>
							<div>
								<label htmlFor="frames" style={{ marginTop: "1.5rem" }}>
									Number of frames
								</label>
								<input
									type="number"
									min="1"
									max="360"
									placeholder="Frames"
									className={styles.styled}
									value={frames}
									onChange={(e) => setFrames(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor="timePerFrame" style={{ marginTop: "1.5rem" }}>
									Time per frame (ms)
								</label>
								<input
									type="number"
									min="1"
									max="1000"
									placeholder="Time per frame"
									value={delay}
									className={styles.styled}
									onChange={(e) => setDelay(e.target.value)}
								/>
							</div>
						</div>
					</details>

					<a target="_blank" className={!miiData ? styles.disabled : null}>
						<button
							className={classNames(styles.styled, {
								[styles.loading]: loading,
							})}
							style={{ marginTop: "2rem", "--load-progress": loadProgress }}
							onClick={(e) => {
								e.preventDefault();
								render();
							}}
						>
							<p>
								{loading
									? `Rendering... ${(loadProgress * 100).toFixed(2)}%`
									: "Render"}
							</p>
						</button>
					</a>
				</div>

				<div className={styles.guide}>
					<div id="credits">
						<Guide icon="info">
							<h2>Credits</h2>
							<p>Huge thanks to all the people who made this possible:</p>
							<ul>
								<li>
									<a
										href="https://github.com/darcellapy/SpinMii"
										target="_blank"
										rel="noreferrer noopener"
										style={{ fontWeight: "bold" }}
									>
										NovaLeHacker
									</a> (pictured below), for having the original idea 
									<img
										src="/assets/images/NovaLeHacker.png"
										alt="A drawing showing NovaLeHacker wearing cool sunglasses; she is smiling."
									/>
									
								</li>
								<li>
									<a
										href="#"
										target="_blank"
										rel="noreferrer noopener"
										style={{ fontWeight: "bold" }}
									>
										Me
									</a>
									, for building the implementation on this page
								</li>
							</ul>
						</Guide>
					</div>
					<div
						id="help"
						style={{
							position: "absolute",
							top: "0",
							right: "calc(24px + 1rem)",
							maxWidth: "calc(90vw - 24px - 1rem)",
						}}
					>
						<Guide icon="help">
							<h2>
								How do I get my Mii's <code>data-params</code>?
							</h2>
							<h3>Nintendo Network</h3>
							<ol>
								<li>
									Open Mii Studio (login{" "}
									<a
										href="https://accounts.nintendo.com/login?post_login_redirect_uri=https%3A%2F%2Faccounts.nintendo.com%2Fmii_studio"
										target="_blank"
										rel="noreferrer noopener"
										style={{ fontWeight: "bold" }}
									>
										here
									</a>
									)
								</li>
								<li>Click on the Mii {">"} Edit</li>
								<li>
									Open your browser's console, and paste this:{" "}
									<code>
										console.log(document.body.attributes["data-params"].textContent)
									</code>
								</li>
								<li>
									The console will spit out your mii's <code>data-params</code>!
								</li>
							</ol>

							<h3>Pretendo Network</h3>
							<ol>
								<li>
									Open the Mii editor (login{" "}
									<a
										href="https://pretendo.network/account/miieditor"
										target="_blank"
										rel="noreferrer noopener"
										style={{ fontWeight: "bold" }}
									>
										here
									</a>
									)
								</li>
								<li>
									Open your browser's console, and paste this:{" "}
									<code>
										console.log(document.querySelector(".new-mii-wrapper{">"}
										img.new-mii").src.split("&data=")[1])
									</code>
								</li>
								<li>
									The console will spit out your mii's <code>data-params</code>!
								</li>
							</ol>
						</Guide>
					</div>
				</div>

				<Footer sourceCodeOverride="https://github.com/gitlimes/website/blob/main/pages/spinmii.js" />
			</div>
		</div>
	);
}
