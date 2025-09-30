<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';

	import Logotype from '../Logotype.svelte';
</script>

<div>
	<h1>
		<span class="logotype"><Logotype size="1.25em" hero fillColor="var(--text-on-gradient)" /></span
		><br />
		{m.hero_maker()}<span><span class="pink">{m.stuff()}</span>,</span><br />
		{m.hero_destroyer()}<span><span class="pink">&lt;{m.hero_code()} /&gt;</span>.</span>
	</h1>
</div>

<style>
	/*
	div {
		min-height: 100vh;
	}
	*/

	span.pink {
		color: var(--pink);
		background: var(--text-on-gradient);

		/*display: inline-block;*/
		height: 1em;
	}

	span.logotype {
		position: relative;
		bottom: -0.75rem;
	}

	span {
		white-space: nowrap;
	}

	h1 {
		margin: 2rem 0;
		line-height: 1.5;
		color: var(--text-on-gradient);
	}
</style>
