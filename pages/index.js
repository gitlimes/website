import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { toHumanString } from "human-readable-numbers";

import Navbar from "../components/Navbar";
import StuffCard from "../components/stuffCard";
import OpenGraph from "../components/openGraph";
import Footer from "../components/Footer";

import rawcards from "/cards.json";

import { renderToString } from "react-dom/server";
import LoadingBar from "../components/eastereggs/LoadingBar";
import NotARickroll from "../components/eastereggs/NotARickroll";

import styles from "../styles/Home.module.css";
import cardStyles from "../styles/components/stuffcard.module.css";

import secondaryPic from "../public/assets/images/blahaj-dev.png";

export async function getServerSideProps() {
	let mdbadgeStats;

	mdbadgeStats = {
		user: 803443,
		server: 13047542,
		total: 13850985,
		sourceCode: "https://github.com/gitlimes/vercel-stats",
		cached: true,
		cachedOn: 1688917961,
	};

	const microsoftgithubStatsFetch = await fetch(
		"https://microsoftgithub.com/api/stats"
	);
	const microsoftgithubStatsJson = await microsoftgithubStatsFetch.json();
	const microsoftgithubStats = microsoftgithubStatsJson.rickrolled;

	const cards = JSON.parse(
		JSON.stringify(rawcards.cards)
			.replace("${requests}", toHumanString(mdbadgeStats.total))
			.replace("${dailyrequests}", toHumanString(mdbadgeStats.total / 365))
			.replace("${microsoftgithubusers}", `${microsoftgithubStats.kusers}k`)
	);

	return {
		props: { cards },
	};
}

export default function Home({ cards, darkMode, setDarkMode }) {
	let timestampArray = [];
	let oldTimestamp = 0;

	function mouseLeave(e) {
		// Filter out child elements
		if (e.target.tagName !== "A") return;

		// Push to the array the difference between the time the mouse left the last time and the time the mouse left this time
		let currentTimestamp = e.timeStamp;
		timestampArray.push({
			key: Number(e.target.id.split("-")[1]),
			timestamp: currentTimestamp - oldTimestamp,
		});

		// Get the last n timestamps
		const n = 15;
		const ntyTimestamps = timestampArray.slice(-n);
		if (ntyTimestamps.length !== n) return;

		// Check if all the last n timestamps are from the same element, return if not

		// NOTE: I am aware that this sometimes doesn't return even if the timestamps are from different elements, but I don't care.
		// It works for the most part, and even when it doesn't it takes a little bit of time to get the right combination so the average is still very high.

		const keySum = ntyTimestamps.reduce((a, b) => a + b.key, 0);
		if (keySum % n !== 0) return;

		// Calculate the average
		let sum = ntyTimestamps.reduce((a, b) => a + b.timestamp, 0);
		let avrg = sum / n;

		// If the average is less than 100, then it's a bug.
		if (avrg < 200) {
			cardBug(e);
		}

		//Sets the old timestamp to be the new timestamp
		oldTimestamp = currentTimestamp;
	}

	// Disable the card when the bug is found
	let disabledCards = 0;
	function cardBug(e) {
		const element = e.target;
		if (!element.className.includes("disabledCard"))
			element.className += " disabledCard";
		disabledCards += 1;
		if (disabledCards === 4 /* all the cards is too much */) {
			loadingBarEasterEgg(e);
		}

		// Do that instantly for testing
		// loadingBarEasterEgg();
	}

	// The haha 169% loading bar easter egg
	function loadingBarEasterEgg(e) {
		document.querySelector("#stuff").innerHTML = renderToString(<LoadingBar />);
		setTimeout(function () {
			document.querySelector("#stuff").innerHTML = renderToString(
				<NotARickroll />
			);
		}, 19000);
	}

	//console.log(document.querySelector("body").dataset.darkMode)

	return (
		<div>
			<Head>
				<title>limes.pink</title>
				<OpenGraph />
			</Head>

			<div className={styles.wrapper} id="wrapper">
				<Navbar home="true" darkMode={darkMode} setDarkMode={setDarkMode} />
				<div className={styles.hero}>
					<div className={styles.imgWrapper}>
						<img
							src="/assets/images/pinklime.png"
							alt="A vector drawing of a pink lime on a pink background. The line art is white."
							width="100%"
							height="100%"
							loading="lazy"
							/*style={{ imageRendering: "pixelated" }}*/
						/>
					</div>
					<div className={styles.text} id="hero-text">
						<h1>
							Hey, I'm <span>ash</span>!
						</h1>
						<p id="hero-caption">
							I make <span className="stuff">stuff™</span>
						</p>
					</div>
				</div>

				<div className={styles.aboutWrapper} id="about">
					<h1>Who?</h1>
					<div className={styles.about}>
						<div className={styles.paragraph}>
							<p>
								I'm ash, a 20 year old gal who makes{" "}
								<span className="stuff">stuff™</span>!<br />
								What <i>is</i> <span className="stuff">stuff™</span>? I'll tell
								you in a sec, but first: let me waste some of your time with
								some personal information that you're probably going to forget
								in the next 5 to 10 seconds!
							</p>
							<p>
								I love playing the piano, despite not really being that good at
								it, but I make up for it by being quite possibly the best kazoo
								player to ever exist on this cruel Earth. I also love tinkering
								with stuff, which is why I use linux.
							</p>
							<p>
								As you may have realized by now, I am excruciatingly funny
								(especially when sleep deprived)! Such funniness can be seen in
								the{" "}
								<Link
									href="https://pretendo.network/nso-legacy-pack"
									target="_blank"
									rel="noopener noreferrer"
									className={styles.link}
								>
									Pretendo Network April Fools' joke of 2022
								</Link>
								. What? You don't find it that funny? Damn, too bad. This is my
								about me, I'll write what I want.
							</p>
						</div>
						<div className={styles.imgWrapper}>
							<Image
								src={secondaryPic}
								alt="A picture of a Blåhaj (a stuffed shark plush from IKEA) wearing headphones and sitting at a desk. The shark appears to be working on some code on their main monitor, and they have this website open on their secondary monitor"
								placeholder="blur"
								quality={74}
								fill
								sizes="40vw"
								style={{
									objectFit: "cover",
								}}
							/>
						</div>
					</div>
				</div>

				<div className={styles.stuff} id="stuff">
					<h1>
						<span className={styles.stuff}>Stuff™</span>.{" "}
						<span className={styles.stuff}>Stuff™</span>?{" "}
						<span className={styles.stuff}>Stuff™</span>!
					</h1>
					<div className={styles.infiniteScrollWrapper}>
						<span className={styles.infiniteScroll}>
							{Array.apply(null, { length: 20 }).map((_e, i) => (
								<span key={`${i}`} aria-hidden={i}>
									<span className={styles.stuff} key={`${i}0`}>
										Stuff™
									</span>{" "}
									is the very fabric of reality.{" "}
									<span className={styles.stuff} key={`${i}1`}>
										Stuff™
									</span>{" "}
									is everything.{" "}
									<span className={styles.stuff} key={`${i}2`}>
										Stuff™
									</span>{" "}
									is nothing.{" "}
									<span className={styles.stuff} key={`${i}3`}>
										Stuff™
									</span>{" "}
									is the beginning.{" "}
									<span className={styles.stuff} key={`${i}4`}>
										Stuff™
									</span>{" "}
									is the end.{" "}
									<span className={styles.stuff} key={`${i}5`}>
										Stuff™
									</span>{" "}
									is the ἀρχή.{" "}
									<span className={styles.stuff} key={`${i}6`}>
										Stuff™
									</span>{" "}
									is the shape.{" "}
									<span className={styles.stuff} key={`${i}7`}>
										Stuff™
									</span>{" "}
									is the matter.{" "}
									<span className={styles.stuff} key={`${i}8`}>
										Stuff™
									</span>{" "}
									is the ἄπειρον.{" "}
								</span>
							))}
						</span>
					</div>

					<div className={styles.list} id="stufflist">
						{cards.map((card, index) => {
							return (
								<StuffCard
									key={index}
									index={index}
									title={card.title}
									caption={card.caption}
									link={card.link}
									hideOnMobile={card.hideOnMobile}
									samePage={card.samePage}
									onMouseOut={(e) => mouseLeave(e)}
								/>
							);
						})}

						<a
							className={cardStyles.card}
							href="https://github.com/gitlimes?tab=repositories"
							onMouseOut={(e) => mouseLeave(e)}
							id="stuffCard-7"
						>
							View more
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className={styles.viewMore}
								alt=""
							>
								<line x1="5" y1="12" x2="19" y2="12"></line>
								<polyline points="12 5 19 12 12 19"></polyline>
							</svg>
						</a>
					</div>
				</div>

				<div className={styles.contact} id="contact">
					<h1>Contact me</h1>
					<p>
						Feel free to reach out to me for anything, unless I owe you money.
					</p>
					<div className={styles.list}>
						<a
							rel="me"
							href="https://matrix.to/#/@limes:limes.pink"
							target="_blank"
							className={styles.contactCard + " " + styles.matrix}
						>
							<svg
								role="img"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Matrix</title>
								<path d="M.632.55v22.9H2.28V24H0V0h2.28v.55zm7.043 7.26v1.157h.033c.309-.443.683-.784 1.117-1.024.433-.245.936-.365 1.5-.365.54 0 1.033.107 1.481.314.448.208.785.582 1.02 1.108.254-.374.6-.706 1.034-.992.434-.287.95-.43 1.546-.43.453 0 .872.056 1.26.167.388.11.716.286.993.53.276.245.489.559.646.951.152.392.23.863.23 1.417v5.728h-2.349V11.52c0-.286-.01-.559-.032-.812a1.755 1.755 0 0 0-.18-.66 1.106 1.106 0 0 0-.438-.448c-.194-.11-.457-.166-.785-.166-.332 0-.6.064-.803.189a1.38 1.38 0 0 0-.48.499 1.946 1.946 0 0 0-.231.696 5.56 5.56 0 0 0-.06.785v4.768h-2.35v-4.8c0-.254-.004-.503-.018-.752a2.074 2.074 0 0 0-.143-.688 1.052 1.052 0 0 0-.415-.503c-.194-.125-.476-.19-.854-.19-.111 0-.259.024-.439.074-.18.051-.36.143-.53.282-.171.138-.319.337-.439.595-.12.259-.18.6-.18 1.02v4.966H5.46V7.81zm15.693 15.64V.55H21.72V0H24v24h-2.28v-.55z" />
							</svg>
							matrix (@limes:limes.pink)
						</a>
						<a
							rel="me"
							href="https://fedi.limes.pink/@limes"
							target="_blank"
							className={styles.contactCard + " " + styles.mastodon}
						>
							<svg
								role="img"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Mastodon</title>
								<path d="M23.193 7.88c0-5.207-3.411-6.733-3.411-6.733C18.062.357 15.108.025 12.041 0h-.076c-3.069.025-6.02.357-7.74 1.147 0 0-3.412 1.526-3.412 6.732 0 1.193-.023 2.619.015 4.13.124 5.092.934 10.11 5.641 11.355 2.17.574 4.034.695 5.536.612 2.722-.15 4.25-.972 4.25-.972l-.09-1.975s-1.945.613-4.13.54c-2.165-.075-4.449-.234-4.799-2.892a5.5 5.5 0 0 1-.048-.745s2.125.52 4.818.643c1.646.075 3.19-.097 4.758-.283 3.007-.359 5.625-2.212 5.954-3.905.517-2.665.475-6.508.475-6.508zm-4.024 6.709h-2.497v-6.12c0-1.29-.543-1.944-1.628-1.944-1.2 0-1.802.776-1.802 2.313v3.349h-2.484v-3.35c0-1.537-.602-2.313-1.802-2.313-1.085 0-1.628.655-1.628 1.945v6.119H4.831V8.285c0-1.29.328-2.314.987-3.07.68-.759 1.57-1.147 2.674-1.147 1.278 0 2.246.491 2.886 1.474L12 6.585l.622-1.043c.64-.983 1.608-1.474 2.886-1.474 1.104 0 1.994.388 2.674 1.146.658.757.986 1.781.986 3.07v6.305z" />
							</svg>
							fedi (@limes@limes.pink)
						</a>
						<a
							href="https://discord.com/users/406125028065804289"
							target="_blank"
							rel="noopener"
							className={styles.contactCard + " " + styles.discord}
						>
							<svg
								role="img"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Discord</title>
								<path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
							</svg>
							discord (@limes.pink)
						</a>
						<a
							href="https://github.com/gitlimes"
							target="_blank"
							rel="noopener"
							className={styles.contactCard + " " + styles.github}
						>
							<svg
								role="img"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>GitHub</title>
								<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
							</svg>
							github (@gitlimes)
						</a>
						<a
							href="mailto:hey@limes.pink"
							target="_blank"
							rel="noopener"
							className={styles.contactCard + " " + styles.mail}
						>
							<svg
								role="img"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Mail</title>
								<path d="M15.61 12c0 1.99-1.62 3.61-3.61 3.61-1.99 0-3.61-1.62-3.61-3.61 0-1.99 1.62-3.61 3.61-3.61 1.99 0 3.61 1.62 3.61 3.61M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12c2.424 0 4.761-.722 6.76-2.087l.034-.024-1.617-1.879-.027.017A9.494 9.494 0 0 1 12 21.54c-5.26 0-9.54-4.28-9.54-9.54 0-5.26 4.28-9.54 9.54-9.54 5.26 0 9.54 4.28 9.54 9.54a9.63 9.63 0 0 1-.225 2.05c-.301 1.239-1.169 1.618-1.82 1.568-.654-.053-1.42-.52-1.426-1.661V12A6.076 6.076 0 0 0 12 5.93 6.076 6.076 0 0 0 5.93 12 6.076 6.076 0 0 0 12 18.07a6.02 6.02 0 0 0 4.3-1.792 3.9 3.9 0 0 0 3.32 1.805c.874 0 1.74-.292 2.437-.821.719-.547 1.256-1.336 1.553-2.285.047-.154.135-.504.135-.507l.002-.013c.175-.76.253-1.52.253-2.457 0-6.617-5.383-12-12-12" />
							</svg>
							email (hey@limes.pink)
						</a>
						<a
							href="https://liberapay.com/limes"
							target="_blank"
							rel="noopener"
							className={styles.contactCard + " " + styles.liberapay}
						>
							<svg
								role="img"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>liberapay</title>
								<path d="M2.32 0A2.321 2.321 0 0 0 0 2.32v19.36A2.321 2.321 0 0 0 2.32 24h19.36A2.32 2.32 0 0 0 24 21.68V2.32A2.32 2.32 0 0 0 21.68 0zm9.208 3.98l-2.27 9.405a2.953 2.953 0 0 0-.073.539.853.853 0 0 0 .09.432.7.7 0 0 0 .334.302c.157.077.378.126.661.147l-.49 2.008c-.772 0-1.38-.1-1.82-.3-.441-.203-.757-.477-.947-.826a2.391 2.391 0 0 1-.278-1.2c.005-.452.068-.933.188-1.445l2.074-8.67zm3.9 3.888c.61 0 1.135.092 1.576.277.44.185.802.438 1.085.76.283.32.493.696.629 1.126.136.43.204.89.204 1.379v.001c0 .794-.13 1.52-.392 2.179a5.16 5.16 0 0 1-1.086 1.706 4.84 4.84 0 0 1-1.665 1.118c-.648.267-1.353.4-2.114.4-.37 0-.74-.033-1.11-.098l-.735 2.956H9.403l2.71-11.298c.435-.13.934-.248 1.494-.351a10.045 10.045 0 0 1 1.821-.155zm-.31 2.041a4.67 4.67 0 0 0-.98.098l-1.143 4.752c.185.044.413.065.685.065.425 0 .812-.079 1.16-.237a2.556 2.556 0 0 0 .89-.661c.244-.283.435-.623.571-1.02a4.03 4.03 0 0 0 .204-1.315c0-.468-.104-.865-.31-1.192-.207-.326-.566-.49-1.077-.49z" />
							</svg>
							liberapay (@limes)
						</a>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
}
