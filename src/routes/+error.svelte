<script lang="ts">
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages.js';

	import Error from '$lib/components/Error/Error.svelte';
</script>

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
