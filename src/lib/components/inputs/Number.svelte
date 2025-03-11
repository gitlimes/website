<script lang="ts">
	let { value = $bindable(), id, min = undefined, max = undefined } = $props();

	import { CaretDown } from 'phosphor-svelte';
</script>

<div class="numberwrapper">
	<input {id} type="number" bind:value {min} {max} />
	<div class="caretwrapper large">
		<button class="up" tabindex="-1" onclick={() => value++}
			><span><CaretDown size={18} /></span></button
		>
		<button class="down" tabindex="-1" onclick={() => value--}
			><span><CaretDown size={18} /></span></button
		>
	</div>
	<div class="caretwrapper small">
		<button class="up" tabindex="-1" onclick={() => value++}
			><span><CaretDown size={14} /></span></button
		>
		<button class="down" tabindex="-1" onclick={() => value--}
			><span><CaretDown size={14} /></span></button
		>
	</div>
</div>

<style>
	input {
		appearance: none;
		background: var(--input-bg, var(--input-bg-pink));
		border: none;
		padding: 0.3rem 0.5rem;
		border-radius: 4px;
		color: inherit;
		font-size: inherit;
		font-family: inherit;
		position: relative;
		line-height: inherit;
		width: 100%;
		min-height: calc(2rem);
	}

	/* https://stackoverflow.com/a/45396364 */
	input[type='number'] {
		-webkit-appearance: textfield;
		-moz-appearance: textfield;
		appearance: textfield;
	}
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
	}

	div.numberwrapper {
		position: relative;
		width: 100%;
	}

	.caretwrapper {
		position: absolute;
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		background: var(--accent, var(--pink));
		height: calc(100% - 0.3rem);
		margin: 0.16rem;
		border-radius: 2px;
		aspect-ratio: 1;
		right: 0;
		top: 0;
	}
	.caretwrapper button {
		appearance: none;
		border: none;
		background: none;
		color: inherit;
		width: 100%;
		height: 50%;
		padding-bottom: 2px;
		border-radius: 2px;
		cursor: pointer;
	}
	.caretwrapper button:hover {
		background: rgba(255, 255, 255, 0.3);
	}
	.caretwrapper button.up {
		transform: scaleY(-1);
	}
	.caretwrapper button span {
		position: relative;
		top: -2px;
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

		.caretwrapper button span {
			position: relative;
			top: -1px;
		}
	}
</style>
