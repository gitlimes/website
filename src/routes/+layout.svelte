<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import type { PageServerLoad } from './$types';
	import { localizeHref } from '$lib/paraglide/runtime';

	export const load: PageServerLoad = () => {
		redirect(302, localizeHref('/'));
	};

	import '../global.css';

	import '@fontsource-variable/space-grotesk';
	import '@fontsource/space-mono';

	let { children } = $props();
</script>

{@render children()}
