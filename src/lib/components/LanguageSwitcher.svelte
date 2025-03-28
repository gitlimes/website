<script lang="ts">
	import type { AvailableLanguageTag } from '$lib/paraglide/runtime';
	import { i18n } from '$lib/i18n';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { languageTag } from '$lib/paraglide/runtime';

	const currentLang = languageTag();

	function switchToLanguage(newLanguage: AvailableLanguageTag) {
		const canonicalPath = i18n.route(page.url.pathname);
		const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);
		goto(localisedPath + page.url.search);
	}
</script>

<span>
	<button
		class={{ selected: currentLang === 'en' }}
		onclick={() => switchToLanguage('en')}
		aria-label="Switch to English">en</button
	>{' | '}
	<button
		class={{ selected: currentLang === 'it' }}
		onclick={() => switchToLanguage('it')}
		aria-label="Passa a Italiano">it</button
	>
</span>

<style>
	button {
		display: inline-block;
		border: none;
		padding: 0;
		margin: 0;
		text-decoration: none;
		background: none;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		cursor: pointer;
		text-align: center;
		transition:
			background 250ms ease-in-out,
			transform 150ms ease;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
	}

	button.selected {
		font-weight: 700;
	}
</style>
