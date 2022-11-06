import Head from "next/head";

import { useState } from "react";
import TwitterApi from "twitter-api-v2";
import Cookies from "cookies";
import absoluteUrl from "next-absolute-url";

import Login from "/components/twitter64/login";
import Tweet from "/components/twitter64/tweet";

import GoHome from "/components/GoHome";
import OpenGraph from "/components/openGraph";
import Footer from "/components/Footer";

import styles from "/styles/stuffitempage.module.css";

export async function getServerSideProps({ req, res }) {
	const { origin: currentDomain } = absoluteUrl(req);
	const cookies = new Cookies(req, res);
	let authUrl = null;

	// Check if the user is already logged in
	const accessToken = cookies.get("_twitterAPI_accessToken") || null;
	const loggedIn = Boolean(accessToken);

	if (!loggedIn) {
		const client = new TwitterApi({
			clientId: process.env.TWITTER_CLIENT_ID,
			clientSecret: process.env.TWITTER_CLIENT_SECRET,
		});
		const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
			`${currentDomain}/twitter64/callback`,
			{ scope: ["tweet.read", "tweet.write", "users.read"] }
		);

		authUrl = url;
		cookies.set("_twitterAPI_codeVerifier", codeVerifier);
		cookies.set("_twitterAPI_state", state);
	}

	return {
		props: {
			loggedIn,
			authUrl,
			accessToken,
		},
	};
}

export default function Home({ loggedIn, authUrl, accessToken }) {
	const [notice, setNotice] = useState("");

	return (
		<div>
			<Head>
				<title>Twitter 64 | ash</title>
				<meta property="og:title" content="Twitter 64 | ash" />
				<meta property="twitter:title" content="Twitter 64 | ash" />
				<meta
					property="og:description"
					content='Tweet from "Twitter for Nintendo™ 64"'
				/>
				<meta
					property="twitter:description"
					content='Tweet from "Twitter for Nintendo™ 64"'
				/>
				<meta
					property="og:image"
					content="https://ashm.dev/assets/images/twitter64-twimg.png"
				/>
				<meta
					name="twitter:image"
					content="https://ashm.dev/assets/images/twitter64-twimg.png"
				/>
				<OpenGraph />
			</Head>

			<div className={styles.wrapper} id="wrapper">
				<GoHome />

				<div className={styles.floatingContainer}>
					<div className={styles.projectHero}>
						<h1>
							Twitter <span className="accented">64</span>
						</h1>
						<p>Tweet from "Twitter for Nintendo™ 64"</p>
					</div>

					{!loggedIn ? (
						<Login authUrl={authUrl} />
					) : (
						<Tweet accessToken={accessToken} setNotice={setNotice} />
					)}

					<p
						className={styles.notice}
						style={{ visibility: notice ? "visible" : "hidden" }}
						dangerouslySetInnerHTML={{ __html: notice || "hi" }}
					/>
				</div>

				<Footer sourceCodeOverride="https://github.com/ashmonty/website/blob/main/pages/twitter64/index.js" />
			</div>
		</div>
	);
}
