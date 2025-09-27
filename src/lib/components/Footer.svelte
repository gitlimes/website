<script lang="ts">
	import Logotype from './Logotype.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';

	import Gradient from './Gradient.svelte';

	import * as m from '$lib/paraglide/messages.js';

	const year = new Date().getFullYear();
</script>

<footer class="hero-footer">
	<Logotype height="4rem" width="auto" fillColor="var(--text-on-gradient)" />

	<div>
		<p>
			© {year} Limes Inc. -
			<a href="https://github.com/gitlimes/website">{m.source_code()}</a>{' - '}<LanguageSwitcher />
		</p>
		<p>{m.footer_text()}</p>
	</div>
	<!-- <Gradient /> -->
</footer>

<style>
	footer {
		display: flex;
		align-items: center;
		gap: 2rem;
		color: var(--text-on-gradient);
		background: var(--pink);
	}

	.hero-footer > :global(svg),
	footer > * {
		z-index: 2;
	}

	p {
		margin: 0;
	}

	@media screen and (max-width: 900px) {
		footer {
			flex-flow: column;
			align-items: start;
			gap: 1.5rem;
		}
	}
	@media screen and (max-width: 500px) {
		footer {
			flex-flow: column;
			align-items: start;
			gap: 1rem;
		}
	}
</style>
