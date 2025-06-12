<script lang="ts">
	import { CaretDown } from 'phosphor-svelte';

	let { value = $bindable(), id, options } = $props();
</script>

<div class="selectwrapper">
	<select bind:value {id}>
		{#each options as o}
			<option value={o.v}>
				{o.n}
			</option>
		{/each}
	</select>
	<div class="caretwrapper large">
		<CaretDown size={28} />
	</div>
	<div class="caretwrapper small">
		<CaretDown size={18} />
	</div>
</div>

<style>
	select {
		appearance: none;
		background: var(--input-bg, var(--input-bg-pink));
		border: var(--input-border, none);
		padding: 0.3rem 0.5rem;
		/*border-radius: 4px;*/
		color: inherit;
		font-size: inherit;
		font-family: inherit;
		line-height: inherit;
		position: relative;
		width: 100%;
		min-height: 2rem;
		cursor: pointer;
	}

	/* fake focus */
	select:focus {
		outline: 1px solid #fff;
		box-shadow: inset 0 0 0 2px #26f;
	}
	div.selectwrapper {
		position: relative;
		width: 100%;
	}

	option {
		font-family: inherit;
		background-color: var(--input-bg, var(--input-bg-pink));
	}

	.caretwrapper {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--accent, var(--pink));
		height: calc(100% - 8px);
		margin: 4px;
		/*border-radius: 2px;*/
		aspect-ratio: 1;
		right: 0;
		top: 0;
		pointer-events: none;
	}
	@media (prefers-color-scheme: light) {
		.caretwrapper {
			color: #fff;
		}
	}

	.caretwrapper.small {
		display: none;
	}

	@media screen and (max-width: 560px) {
		.caretwrapper.large {
			display: none;
		}

		.caretwrapper.small {
			display: flex;
		}
	}
</style>
