<script lang="ts">
	import '../global.css';

	import '@fontsource-variable/space-grotesk';
	import '@fontsource/space-mono';

	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>
