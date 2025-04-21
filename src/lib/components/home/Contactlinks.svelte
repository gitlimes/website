<script lang="ts">
	import {
		GithubLogo,
		DiscordLogo,
		Butterfly,
		FediverseLogo,
		MatrixLogo,
		InstagramLogo,
		Envelope,
		TipJar
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
			<a
				href="https://discord.gg/GghPVAKMKs"
				target="_blank"
				rel="noreferrer noopener">@limes.pink</a
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
			<MatrixLogo size="1em" aria-label="matrix" />
			<a href="https://matrix.to/#/@limes:limes.pink" target="_blank" rel="noreferrer noopener"
				>@limes:limes.pink</a
			>
		</h2>
		<p>{m.contact_matrix()}</p>
	</div>
	<div>
		<h2>
			<InstagramLogo size="1em" aria-label="instagram" />
			<a href="https://www.instagram.com/limes.pink/" target="_blank" rel="noreferrer noopener"
				>@limes.pink</a
			>
		</h2>
		<p>{m.contact_instagram()}</p>
	</div>
	<div>
		<h2>
			<Envelope size="1em" aria-label="email" />
			<a href="mailto:hey@limes.pink" target="_blank" rel="noreferrer noopener">hey@limes.pink</a>
		</h2>
		<p>{m.contact_email()}</p>
	</div>
	<div>
		<h2>
			<TipJar size="1em" aria-label="ko-fi" />
			<a href="https://ko-fi.com/limesdotpink" target="_blank" rel="noreferrer noopener">@limesdotpink</a
			>
		</h2>
		<p>{m.contact_donate()}</p>
	</div>
</div>

<h1 style:color="var(--green)">{m.photo_header()}</h1>

<div class="linkwrapper photos">
	<div class="doublewidth">
		<h2>
			<span>
				<Butterfly size="1em" aria-label="bluesky" />
				<a href="https://bsky.app/profile/limes.pics" target="_blank" rel="noreferrer noopener"
					>@limes.pics</a
				>{' / '}</span
			><span
				><InstagramLogo size="1em" aria-label="instagram" />
				<a href="htps://instagram.com/limes.pics" target="_blank" rel="noreferrer noopener"
					>@limes.pics</a
				></span
			>
		</h2>
		<p>{m.photos_social_only_notice()}</p>
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
