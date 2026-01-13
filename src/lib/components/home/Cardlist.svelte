<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime';

	const currentLang = getLocale();

	const cards = [
		{ n: 'msgithub', l: 'https://microsoftgithub.com/usage' },
		{ n: 'nint', l: 'https://nintendo.uk.net/usage' },
		{ n: 'dcbadge', l: 'https://github.com/gitlimes/dcbadge' },
		{ n: 'errors', l: localizeHref('/errors'), i: `errors_${currentLang}.svg` },
		{ n: 'spinmii', l: localizeHref('/spinmii'), i: 'spinmii.gif' },
		{ n: 'limespics', l: '#pics' }
		/* { n: 'limespink', l: localizeHref('/') } */
		/*{ n: 'pretendo', l: 'https://pretendo.network' }*/
	];

	const { stats } = $props();
</script>

<div class="cardswrap">
	{#each cards as card}
		<a
			class="card {card.n}"
			style="--card-accent: var(--card-t-{card.n})"
			href={card.l}
			target={card.l.startsWith('https://') ? '_blank' : '_self'}
			rel="noreferrer noopener"
		>
			<div class="textwrap">
				<h2>
					{(m as any)[`stuff_${card.n}_t`]()}
				</h2>
				<!-- quick and dirty fix for supabase dying, i am way to tired to do this properly and my website isn't mission critical -->
				<p>
					{@html (m as any)
						[`stuff_${card.n}_c`]({ val: stats?.[card.n] })
						}
				</p>
			</div>
			<div class="imgwrap" style:background="var(--card-img-bg-{card.n})">
				<img src={card.i ? `/img/${card.i}` : `/img/${card.n}.svg`} alt="" />
			</div>
		</a>
	{/each}
</div>

<style>
	:root {
		/* card image background colors */
		--card-img-bg-msgithub: #0d1117;
		--card-img-bg-nint: #ff3333;
		--card-img-bg-dcbadge: #0c1a2f;
		--card-img-bg-limespics: var(--green);
		--card-img-bg-errors: #99bfcc;
		--card-img-bg-spinmii: #aa8ed6;
		--card-img-bg-limespink: var(--pink);
		--card-img-bg-pretendo: #1b1f3b;

		--card-t-msgithub: #aa8ed6;
		--card-t-nint: #ff3333;
		--card-t-dcbadge: #a0a8f8;
		--card-t-limespics: var(--green);
		--card-t-errors: var(--blue);
		--card-t-spinmii: #ce60f2;
		--card-t-limespink: var(--pink);
		--card-t-pretendo: #9d6ff3;
	}

	.cardswrap {
		display: grid;
		grid-template-rows: repeat(6, 1fr);
		grid-template-columns: auto 1fr;
		gap: 2rem;
	}

	.card {
		display: grid;
		gap: 2rem;

		position: relative;
		z-index: 2;

		grid-column: 1 / 3;
		grid-template-columns: subgrid;

		background: var(--card-bg-pink);
		/*border-radius: 0.5rem;*/
		padding: 2rem;
		border: var(--card-border, none);
		box-shadow: inset 0 0 0 0 var(--card-accent, var(--pink));
		transition:
			transform 200ms,
			box-shadow 200ms;
	}

	.card:hover,
	.card:focus {
		box-shadow: inset 0 0 0 0.25rem var(--card-accent, var(--pink));
		transform: scale(1.02);
	}

	.card::before {
		content: '';
		position: absolute;
		top: 100%;
		left: 0;
		background: color-mix(in oklab, var(--card-accent, var(--pink)) 50%, var(--bg-pink));

		width: 100%;
		height: 0;
		z-index: -1;

		transform: skewX(70deg) translate(1px, -0.5px);
		transform-origin: top left;
		transition: height 200ms;

		pointer-events: none;
	}
	.card:hover::before,
	.card:focus::before {
		height: max(100vw, 100vh);
	}
	.card::after {
		content: '';
		position: absolute;
		top: 0;
		left: 100%;
		background: var(--card-accent, var(--pink));

		width: 0;
		height: 100%;
		z-index: -1;

		transform: skewY(20deg) translate(-0.5px, 0);
		transform-origin: top left;
		transition: width 200ms;

		pointer-events: none;
	}
	.card:hover::after,
	.card:focus::after {
		width: max(100vw, 100vh);
	}

	.textwrap h2 {
		font-size: 2rem;
		margin: 0 0 1rem;
		text-decoration: underline;
		grid-column: 1;
		color: var(--card-accent);
	}
	a {
		transition: color 200ms;
		text-decoration: none;
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

	.imgwrap {
		max-height: 100%;
		height: 100%;
		width: auto;
		padding: 1.5rem;
		grid-column: 2;

		display: flex;
		align-items: center;
		justify-content: center;
		/*border-radius: 0.5rem;*/
	}

	.card.spinmii .imgwrap {
		padding: 0;
		align-items: end;
	}

	.card.spinmii img {
		max-height: 321px;
		transform-origin: bottom center;
	}

	@media screen and (max-width: 1080px) {
		.imgwrap img {
			width: 100%;
			min-width: 14rem;
		}

		.card.msgithub img {
			max-width: 164px;
			min-width: unset;
		}

		.card {
			gap: 1.5rem;
			padding: 1.25rem;
		}
		.cardswrap {
			gap: 1.5rem;
		}
	}

	@media screen and (max-width: 900px) {
		.imgwrap img {
			min-width: 7rem;
		}

		.imgwrap {
			padding: 1rem;
		}

		.textwrap h2 {
			font-size: 1.5rem;
		}
	}

	@media screen and (max-width: 700px) {
		.imgwrap {
			display: none;
		}

		.cardswrap {
			display: flex;
			flex-flow: column;
		}
		/*
		.limespics img,
		.limespink img,
		.pretendo img {
			transform: rotate(90deg) scale(1.75);
		}*/
	}

	@media screen and (max-width: 560px) {
		/*
		.card {
			gap: 1rem;
			padding: 1rem;
			grid-auto-flow: column;
		}

		.cardswrap {
			gap: 1rem;
		}*/
	}
</style>
