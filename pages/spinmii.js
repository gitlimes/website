import Head from "next/head";
import { useState } from "react";
import GoHome from "../components/GoHome";
import Guide from "../components/Guide";
import OpenGraph from "../components/openGraph";
import Footer from "../components/Footer";
import { saveAs } from "file-saver";
import { Fragment } from "react";

import classNames from "classnames";

import styles from "../styles/stuffitempage.module.css";

export default function SpinMii() {
	const [axis, setAxis] = useState("y");
	const [expression, setExpression] = useState("normal");
	const [miiData, setmiiData] = useState("");
	const [loading, setLoading] = useState(false);

	const renderURL = `/api/spinmii?data=${encodeURIComponent(
		miiData
	)}&axis=${encodeURIComponent(axis)}&expression=${encodeURIComponent(
		expression
	)}`;

	const downloadRender = () => {
		setLoading(true);
		fetch(renderURL)
			.then((res) => res.blob())
			.then((blob) => {
				saveAs(blob, "spinmii.gif");
				setLoading(false);
			});
	};

	return (
		<div>
			<Head>
				<title>SpinMii | limes.pink</title>
				<meta property="og:title" content="spinmii | limes.pink" />
				<meta property="twitter:title" content="spinmii | limes.pink" />
				<meta
					property="og:description"
					content="Make your mii spin 360° to your heart's content!"
				/>
				<meta
					property="twitter:description"
					content="Make your mii spin 360° to your heart's content!"
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
						<p>Make your mii spin 360° to your heart's content!</p>
					</div>

					<label htmlFor="miiData">
						Your Mii's Mii Studio <code>data-params</code> (check ? at the top
						right of this page)
					</label>
					<input
						type="text"
						required={true}
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

					<a target="_blank" className={!miiData ? styles.disabled : null}>
						<button
							className={classNames(styles.styled, {
								[styles.loading]: loading,
							})}
							style={{ marginTop: "2rem" }}
							onClick={(e) => {
								e.preventDefault();
								downloadRender();
							}}
						>
							{loading ? "Rendering..." : "Render"}
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
										le hacker !
									</a>
									<img
										src="/assets/images/le hacker!.png"
										alt="A drawing of le hacker! with a red circle and arrows pointing at their face. Top right, text that reads: 'the dumbass who had the idea'"
										style={{ width: "100%" }}
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
							maxWidth: "calc(90vw - 24px - 1rem)"
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

				<Footer sourceCodeOverride="https://github.com/ashmonty/website/blob/main/pages/api/spinmii.js" />
			</div>
		</div>
	);
}
