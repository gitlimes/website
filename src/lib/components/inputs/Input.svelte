<script lang="ts">
	let { value = $bindable(), id, placeholder, required, ariaLabel = '' } = $props();
</script>

<input bind:value {id} {placeholder} {required} aria-label={ariaLabel} />

<style>
	input {
		appearance: none;
		background: var(--input-bg, var(--input-bg-pink));
		border: var(--input-border, none);
		padding: 0.3rem 0.5rem;
		/*border-radius: 4px;*/
		color: inherit;
		font-size: inherit;
		font-family: inherit;
		position: relative;
		line-height: inherit;
		width: 100%;
		min-height: 2rem;
	}
</style>
