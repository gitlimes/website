<script lang="ts">
	import {
		GithubLogo,
		DiscordLogo,
		Butterfly,
		FediverseLogo,
		MatrixLogo,
		InstagramLogo,
		Envelope,
		TipJar,
		TumblrLogo

	} from 'phosphor-svelte';

	import * as m from '$lib/paraglide/messages.js';
</script>

<h1>{m.contact_header()}</h1>

<div class="linkwrapper">
	<div>
		<h2>
			<GithubLogo size="1em" aria-label="github" />
			<a href="https://github.com/gitlimes" target="_blank" rel="noreferrer noopener">@gitlimes</a>
		</h2>
		<p>{m.contact_github()}</p>
	</div>
	<div>
		<h2>
			<DiscordLogo size="1em" aria-label="discord" />
			<a href="https://discord.gg/GghPVAKMKs" target="_blank" rel="noreferrer noopener"
				>@limes.pink</a
			>
		</h2>
		<p>{m.contact_discord()}</p>
	</div>
	<div class="doublewidth">
		<h2>
			<span>
				<Butterfly size="1em" aria-label="bluesky" />

				<a href="https://bsky.app/profile/limes.pink" target="_blank" rel="noreferrer noopener"
					>@limes.pink</a
				>{' / '}</span
			><span
				><FediverseLogo size="1em" aria-label="fediverse" />
				<a href="https://fedi.limes.pink/@limes" target="_blank" rel="noreferrer noopener"
					>@limes@limes.pink</a
				></span
			>
		</h2>
		<p>{m.contact_microblog()}</p>
	</div>
	<div>
		<h2>
			<TumblrLogo size="1em" aria-label="tumblr" />
			<a href="https://limesdotpink.tumblr.com/" target="_blank" rel="noreferrer noopener"
				>@limesdotpink</a
			>
		</h2>
		<p>{m.contact_tumblr()}</p>
	</div>
	<div>
		<h2>
			<MatrixLogo size="1em" aria-label="matrix" />
			<a href="https://matrix.to/#/@limes:limes.pink" target="_blank" rel="noreferrer noopener"
				>@limes:limes.pink</a
			>
		</h2>
		<p>{m.contact_matrix()}</p>
	</div>
	<div>
		<h2>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				fill="currentColor"
				viewBox="0 0 128 128"
				stroke-miterlimit="10"
				style="shape-rendering:geometricPrecision; fill-rule:evenodd"
				aria-label="wikipedia"
			>
				<path
					d="M 120.85,29.21 C 120.85,29.62 120.72,29.99 120.47,30.33 C 120.21,30.66 119.94,30.83 119.63,30.83 C 117.14,31.07 115.09,31.87 113.51,33.24 C 111.92,34.6 110.29,37.21 108.6,41.05 L 82.8,99.19 C 82.63,99.73 82.16,100 81.38,100 C 80.77,100 80.3,99.73 79.96,99.19 L 65.49,68.93 L 48.85,99.19 C 48.51,99.73 48.04,100 47.43,100 C 46.69,100 46.2,99.73 45.96,99.19 L 20.61,41.05 C 19.03,37.44 17.36,34.92 15.6,33.49 C 13.85,32.06 11.4,31.17 8.27,30.83 C 8,30.83 7.74,30.69 7.51,30.4 C 7.27,30.12 7.15,29.79 7.15,29.42 C 7.15,28.47 7.42,28 7.96,28 C 10.22,28 12.58,28.1 15.05,28.3 C 17.34,28.51 19.5,28.61 21.52,28.61 C 23.58,28.61 26.01,28.51 28.81,28.3 C 31.74,28.1 34.34,28 36.6,28 C 37.14,28 37.41,28.47 37.41,29.42 C 37.41,30.36 37.24,30.83 36.91,30.83 C 34.65,31 32.87,31.58 31.57,32.55 C 30.27,33.53 29.62,34.81 29.62,36.4 C 29.62,37.21 29.89,38.22 30.43,39.43 L 51.38,86.74 L 63.27,64.28 L 52.19,41.05 C 50.2,36.91 48.56,34.23 47.28,33.03 C 46,31.84 44.06,31.1 41.46,30.83 C 41.22,30.83 41,30.69 40.78,30.4 C 40.56,30.12 40.45,29.79 40.45,29.42 C 40.45,28.47 40.68,28 41.16,28 C 43.42,28 45.49,28.1 47.38,28.3 C 49.2,28.51 51.14,28.61 53.2,28.61 C 55.22,28.61 57.36,28.51 59.62,28.3 C 61.95,28.1 64.24,28 66.5,28 C 67.04,28 67.31,28.47 67.31,29.42 C 67.31,30.36 67.15,30.83 66.81,30.83 C 62.29,31.14 60.03,32.42 60.03,34.68 C 60.03,35.69 60.55,37.26 61.6,39.38 L 68.93,54.26 L 76.22,40.65 C 77.23,38.73 77.74,37.11 77.74,35.79 C 77.74,32.69 75.48,31.04 70.96,30.83 C 70.55,30.83 70.35,30.36 70.35,29.42 C 70.35,29.08 70.45,28.76 70.65,28.46 C 70.86,28.15 71.06,28 71.26,28 C 72.88,28 74.87,28.1 77.23,28.3 C 79.49,28.51 81.35,28.61 82.8,28.61 C 83.84,28.61 85.38,28.52 87.4,28.35 C 89.96,28.12 92.11,28 93.83,28 C 94.23,28 94.43,28.4 94.43,29.21 C 94.43,30.29 94.06,30.83 93.32,30.83 C 90.69,31.1 88.57,31.83 86.97,33.01 C 85.37,34.19 83.37,36.87 80.98,41.05 L 71.26,59.02 L 84.42,85.83 L 103.85,40.65 C 104.52,39 104.86,37.48 104.86,36.1 C 104.86,32.79 102.6,31.04 98.08,30.83 C 97.67,30.83 97.47,30.36 97.47,29.42 C 97.47,28.47 97.77,28 98.38,28 C 100.03,28 101.99,28.1 104.25,28.3 C 106.34,28.51 108.1,28.61 109.51,28.61 C 111,28.61 112.72,28.51 114.67,28.3 C 116.7,28.1 118.52,28 120.14,28 C 120.61,28 120.85,28.4 120.85,29.21 z"
				/>
			</svg>
			<a
				href="https://en.wikipedia.org/wiki/User:Wikilimes"
				target="_blank"
				rel="noreferrer noopener">User:Wikilimes</a
			>
		</h2>
		<p>{m.contact_wikipedia()}</p>
	</div>
	<div>
		<h2>
			<Envelope size="1em" aria-label="email" />
			<a href="mailto:hey@limes.pink" target="_blank" rel="noreferrer noopener">hey@limes.pink</a>
		</h2>
		<p>{m.contact_email()}</p>
	</div>
	<div class="doublewidth">
		<h2>
			<TipJar size="1em" aria-label="ko-fi" />
			<a href="https://ko-fi.com/limesdotpink" target="_blank" rel="noreferrer noopener"
				>@limesdotpink</a
			>
		</h2>
		<p>{m.contact_donate()}</p>
	</div>
</div>

<h1 style:color="var(--green)">{m.photo_header()}</h1>

<div class="linkwrapper photos" id="pics">
	<div class="doublewidth">
		<h2>
			<span>
				<Butterfly size="1em" aria-label="bluesky" />
				<a href="https://bsky.app/profile/limes.pics" target="_blank" rel="noreferrer noopener"
					>@limes.pics</a
				>{' / '}</span
			><span>
				<TumblrLogo size="1em" aria-label="tumblr" />
			<a href="https://limesdotpics.tumblr.com/" target="_blank" rel="noreferrer noopener"
				>@limesdotpics</a
			>
			</span>
		</h2>
		<p>{m.photos_social_only_notice()}</p>
	</div>
	<div class="doublewidth">
		<h2>
			<span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 50 50"
					aria-label="wikimedia commons"
					height="1em"
					><defs><circle id="a" cx="18.242" cy="18.242" r="18.242" /></defs><g
						fill="none"
						fill-rule="evenodd"
						transform="translate(2)"
						><circle cx="23.062" cy="31.525" r="6.121" fill="currentColor" fill-rule="nonzero" /><g
							transform="translate(4.82 13.284)"
							><mask id="b" fill="#fff"><use xlink:href="#a" /></mask><g
								fill="currentColor"
								fill-rule="nonzero"
								mask="url(#b)"
								><path stroke="#006499" stroke-width="1.347" d="M18.278 36.606V29.26" /><path
									d="m15.609 29.566 2.632-4.591 2.632 4.591z"
								/><path stroke="#006499" stroke-width="1.347" d="m5.282 31.253 5.194-5.194" /><path
									d="m8.372 24.388 5.108-1.385-1.386 5.107z"
								/><path stroke="#006499" stroke-width="1.347" d="M-.124 18.278h7.346" /><path
									d="m6.916 15.609 4.591 2.632-4.591 2.632z"
								/><path stroke="#006499" stroke-width="1.347" d="m5.23 5.283 5.195 5.194" /><path
									d="m12.096 8.373 1.385 5.108-5.108-1.385z"
								/><path stroke="#006499" stroke-width="1.347" d="m31.201 31.253-5.194-5.194" /><path
									d="m28.11 24.388-5.107-1.385 1.386 5.107z"
								/><path stroke="#006499" stroke-width="1.347" d="M36.607 18.278h-7.346" /><path
									d="m29.567 15.609-4.591 2.632 4.591 2.632z"
								/><path stroke="#006499" stroke-width="1.347" d="m31.253 5.283-5.195 5.194" /><path
									d="m24.387 8.373-1.385 5.108 5.108-1.385z"
								/></g
							></g
						><path
							stroke="currentColor"
							stroke-width="5.142"
							d="M11.982 20.444c-6.12 6.12-6.12 16.042 0 22.162 6.12 6.12 16.042 6.12 22.162 0 6.12-6.12 6.12-16.042 0-22.162-4.329-4.328-10.865-2.12-12.164-11.644"
						/><path
							fill="currentColor"
							fill-rule="nonzero"
							d="M21.655 0s-2.204 8.264-4.898 11.325c-2.693 3.06 7.101-3.796 10.407-.306C30.469 14.508 21.654 0 21.654 0z"
						/></g
					></svg
				>
				<a
					href="https://commons.wikimedia.org/w/index.php?title=Special:ListFiles/Wikilimes&ilshowall=1"
					target="_blank"
					rel="noreferrer noopener">User:Wikilimes</a
				></span
			>
		</h2>
		<p>{m.photos_contact_wikimedia()}</p>
	</div>
</div>

<style>
	.linkwrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem 4rem;
	}

	h1 {
		color: var(--pink);
	}

	h2 {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--pink);
		margin: 0;
	}

	.photos h2 {
		color: var(--green);
	}

	a {
		text-decoration: underline;
		transition: color 200ms;
	}

	a:hover,
	a:focus {
		color: #fff;
	}

	@media (prefers-color-scheme: light) {
		a:hover,
		a:focus {
			color: #291523;
		}
	}

	.doublewidth {
		grid-column: 1 / 3;
	}

	.doublewidth span {
		display: flex;
		flex-flow: row;
		align-items: center;
		gap: 0.5rem;
	}

	@media screen and (max-width: 860px) {
		.linkwrapper {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.doublewidth {
			grid-column: unset;
		}

		.doublewidth h2 {
			display: flex;
			flex-flow: column;
			align-items: start;
		}
	}

	@media screen and (max-width: 630px) {
		.linkwrapper {
			font-size: 1rem;
			gap: 1rem;
		}
	}
</style>
