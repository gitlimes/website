<script>
	// Shamelessly stolen from https://svelte.dev/playground/modal?version=5.22.2
	let { showModal = $bindable(), header = () => {}, children } = $props();

	import Button from './inputs/Button.svelte';

	let dialog = $state(); // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog.showModal();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<div>
		{@render header?.()}
		{#if header()}<hr />{/if}
		{@render children?.()}
		<hr />
		<Button onclick={() => dialog.close()}>Ok</Button>
	</div>
</dialog>

<style>
	dialog {
		max-width: min(32em, 90vw);
		border-radius: 0.4em;
		border: 1px solid #606060;
		padding: 0;
		background: #242424;
		color: var(--text-color);
	}
	@media (prefers-color-scheme: light) {
		dialog {
			background-color: #fff;
		}
	}
	hr {
		color: rgba(0, 0, 0, 0);
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
