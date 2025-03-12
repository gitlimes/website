<script lang="ts">
	let { value = $bindable(), id, placeholder, required, rows, ariaLabel = '' } = $props();
</script>

<textarea bind:value {id} {placeholder} {required} {rows} aria-label={ariaLabel}></textarea>

<style>
	textarea {
		appearance: none;
		background: var(--input-bg, var(--input-bg-pink));
		border: var(--input-border, none);
		padding: 0.3rem 0.5rem;
		border-radius: 4px;
		color: inherit;
		font-size: inherit;
		font-family: inherit;
		position: relative;
		line-height: inherit;
		width: 100%;
		min-height: 2rem;
		resize: none;
	}
</style>
