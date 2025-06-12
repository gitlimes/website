<script lang="ts">
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages.js';

	import Error from '$lib/components/Error/Error.svelte';
</script>

<svelte:head>
	<title>{page.status} - limes.pink</title>
	<meta property="og:title" content="{page.status} - limes.pink" />
	<meta property="twitter:title" content="{page.status} - limes.pink" />
	<meta name="description" content="Maker of stuff™, destroyer of code." />
	<meta property="twitter:description" content="Maker of stuff™, destroyer of code." />
	<meta property="og:description" content="Maker of stuff™, destroyer of code." />
	<meta property="og:site_name" content="limes.pink" />
	<meta property="og:image" content="https://limes.pink/img/social.png" />
	<meta name="twitter:image" content="https://limes.pink/img/social.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image:alt" content="" />
	<meta name="og:image:alt" content="" />
</svelte:head>

<div class="errorwrapper">
	<a
		href="/"
		alt={`${m.meta_error_header()}: ${page.status}, ${page.error.message}. ${m.meta_error_message()} ${m.meta_error_button()}?`}
		title={`${m.meta_error_header()}: ${page.status}, ${page.error.message}. ${m.meta_error_message()} ${m.meta_error_button()}?`}
	>
		<Error
			gameConsole="wii"
			header={``}
			body={`${m.meta_error_header()}: ${page.status} ${page.error.message}\n\n${m.meta_error_message()}`}
			button={m.meta_error_button()}
		/>
	</a>
</div>

<style>
	.errorwrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
	.errorwrapper a :global(canvas) {
		max-width: 90vw;
		max-height: 90vh;
	}
</style>
