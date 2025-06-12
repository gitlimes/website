<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { languageTag } from '$lib/paraglide/runtime';

	const currentLang = languageTag();

	const cards = [
		{ n: 'msgithub', l: 'https://microsoftgithub.com/usage' },
		{ n: 'nint', l: 'https://nintendo.uk.net/usage' },
		{ n: 'dcbadge', l: 'https://github.com/gitlimes/dcbadge' },
		{ n: 'errors', l: '/errors', i: `errors_${currentLang}.svg` },
		{ n: 'spinmii', l: '/spinmii', i: 'spinmii.gif' },
		{ n: 'limespics', l: 'https://limes.pics' },
		{ n: 'limespink', l: '/' }
		/*{ n: 'pretendo', l: 'https://pretendo.network' }*/
	];

	const { stats } = $props();
</script>

<div class="cardswrap">
	{#each cards as card}
		<a class="card {card.n}"
			href={card.l}
			target={card.l.startsWith('https://') ? '_blank' : '_self'}
			rel="noreferrer noopener"
		>
			<div class="textwrap">
				<h2 style:color="var(--card-t-{card.n})">
					{(m as any)[`stuff_${card.n}_t`]()}
				</h2>
				<p>{(m as any)[`stuff_${card.n}_c`]({ val: stats?.[card.n] })}</p>
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
		--card-img-bg-nint: #ff1111;
		--card-img-bg-dcbadge: #0c1a2f;
		--card-img-bg-limespics: var(--green);
		--card-img-bg-errors: #99bfcc;
		--card-img-bg-spinmii: #aa8ed6;
		--card-img-bg-limespink: var(--pink);
		--card-img-bg-pretendo: #1b1f3b;

		--card-t-msgithub: #aa8ed6;
		--card-t-nint: #ff1111;
		--card-t-dcbadge: #a0a8f8;
		--card-t-limespics: var(--green);
		--card-t-errors: var(--blue);
		--card-t-spinmii: #ce60f2;
		--card-t-limespink: var(--pink);
		--card-t-pretendo: #9d6ff3;
	}

	.cardswrap {
		display: grid;
		grid-template-rows: repeat(7, 1fr);
		grid-template-columns: auto 1fr;
		gap: 2rem;
	}

	.card {
		display: grid;
		gap: 2rem;

		grid-column: 1 / 3;
		grid-template-columns: subgrid;

		background: var(--card-bg-pink);
		/*border-radius: 0.5rem;*/
		padding: 2rem;
		border: var(--card-border, none);
		box-shadow: inset 0 0 0 0 var(--pink);
		transition:
			transform 200ms,
			box-shadow 200ms;
	}

	.card:hover {
		box-shadow: inset 0 0 0 0.25rem var(--pink);
		transform: scale(1.05);
	}
	.textwrap h2 {
		font-size: 2rem;
		margin: 0 0 1rem;
		text-decoration: underline;
		grid-column: 1;
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
