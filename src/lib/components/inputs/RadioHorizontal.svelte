<script lang="ts">
	let { group = $bindable(), id, options } = $props();
</script>

<div class="radiowrapper">
	{#each options as o}
		<input type="radio" value={o.v} bind:group id="{id}{o.v}" />
		<label for="{id}{o.v}">{o.n}</label>
	{/each}
</div>

<style>
	/* display:none-ing this makes tab focus not work, so we hide it as best as we can and just style the label */
	input[type='radio'] {
		appearance: none;
		width: 0px;
		height: 0px;
		padding: 0;
		margin: 0;
		position: absolute;
		overflow: hidden;
	}
	input[type='radio']:focus {
		appearance: none;
		border: none;
		outline: none;
	}
	input[type='radio'] + label {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: calc(2rem - 0.3rem);
		border-radius: 2px;
		cursor: pointer;
	}
	input[type='radio']:checked + label {
		background: var(--accent, var(--pink));
		font-weight: 700;
	}
	/* fake focus */
	input[type='radio']:focus + label {
		outline: 1px solid #fff;
		box-shadow: inset 0 0 0 2px #26f;
	}
	input[type='radio'] + label::after {
		content: '';
		position: absolute;
		left: -1px;
		height: 70%;
		width: 1px;
		background: rgba(255, 255, 255, 0.25);
	}
	input[type='radio']:checked + label::after {
		display: none;
	}
	/* css crimes */
	input[type='radio']:checked + label + input[type='radio'] + label::after {
		display: none;
	}
	input[type='radio']:first-child + label::after {
		display: none;
	}
	div.radiowrapper {
		display: grid;
		width: 100%;
		grid-auto-columns: 1fr;
		grid-auto-flow: column;
		padding: 0.16rem;
		border-radius: 4px;
		background: var(--input-bg, var(--input-bg-pink));
	}
</style>
