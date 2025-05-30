<script lang="ts">
	import { getLocale, setLocale } from '$lib/paraglide/runtime';

	const currentLang = getLocale();

	function switchToLanguage(newLocale: 'en' | 'it') {
		setLocale(newLocale)
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
