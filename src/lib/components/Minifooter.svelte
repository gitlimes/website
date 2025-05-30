<script lang="ts">
	import Logotype from './Logotype.svelte';
	
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import { localizeHref } from '$lib/paraglide/runtime';

	import * as m from '$lib/paraglide/messages.js';

	const year = new Date().getFullYear();

	const props = $props();
	const { logoColor, bgColor } = props;

	let hover = $state(false);
</script>

<div class="footerwrapper">
	<footer>
		<p>
			© {year}
			<a
				href={localizeHref("/")}
				onmouseover={() => (hover = true)}
				onfocus={() => (hover = true)}
				onmouseout={() => (hover = false)}
				onblur={() => (hover = false)}
				><Logotype fillColor={logoColor} {bgColor} size={'1.25rem'} /></a
			>{' - '}
			<a href="https://github.com/gitlimes/website">{m.source_code()} </a>{' - '}<LanguageSwitcher
			/>
		</p>
	</footer>
</div>

<style>
	.footerwrapper {
		position: relative;
		padding: 1rem;
	}

	footer {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		font-size: inherit;
	}

	p,
	a {
		display: flex;
		align-items: center;
		margin: 0;
		gap: 0.3rem;
	}
</style>
