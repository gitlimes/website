<script lang="ts">
	import Logotype from '$lib/components/Logotype.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';

	import * as m from '$lib/paraglide/messages.js';
</script>

<header>
	<nav>
		<ul>
			<li class="logo"><a href="/"><Logotype size={'1.25em'} /></a></li>
			<li><a href="/#stuff">{m.stuff()}</a></li>
			<li><a href="/#contact">{m.contact()}</a></li>

			<li class="lang-select">
				<LanguageSwitcher />
			</li>
		</ul>
	</nav>
</header>

<style>
	ul {
		display: flex;
		flex-flow: row nowrap;
		list-style: none;
		gap: 2rem;
		margin: 0;
		padding: 0;
	}

	li {
		margin: 0;
		padding: 0;
	}

	.lang-select {
		margin-left: auto;
	}

	@media screen and (max-width: 420px) {
		ul {
			gap: 1.1rem;
		}
	}

	@media screen and (max-width: 350px) {
		.logo {
			display: none;
		}
	}
</style>
