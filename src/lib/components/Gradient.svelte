<script>
	import { onMount } from 'svelte';

	let canvas = $state();

	let props = $props();

	onMount(() => {
		const ctx = canvas.getContext('2d');
		/**
		 * @type {number}
		 */
		let frame;

		(function loop() {
			frame = requestAnimationFrame(loop);

			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

			for (let p = 0; p < imageData.data.length; p += 4) {
				const i = p / 4;
				const x = i % canvas.width;
				const y = (i / canvas.height) >>> 0;

				const t = window.performance.now();

				const r = 192 + Math.floor(64 * Math.cos(((x - y) * (x + y)) / 200 + t / 400));
				const g = 192 + Math.floor(64 * Math.sin(((x + y) * t) / 40000 / 3000));
				const b =
					192 +
					Math.floor(
						64 * Math.sin(((x - y) * (x + y) * Math.cos(((x - y) * (x + y)) / 200)) / 200 + t / 400)
					);

				imageData.data[p + 0] = r;
				imageData.data[p + 1] = g;
				imageData.data[p + 2] = b;
				imageData.data[p + 3] = 255;
			}

			ctx.putImageData(imageData, 0, 0);
		})();

		return () => {
			cancelAnimationFrame(frame);
		};
	});
</script>

<!-- TODO: add fallback -->
<canvas width={32} height={32} {...props} class="gradient" alt="" bind:this={canvas}></canvas>

<style>
	.gradient {
		width: 100%;
		height: 100%;

		position: absolute;
		top: 0;
		left: 0;

		/* gradient fallback for no js */
		background-repeat: no-repeat;
		background-size: cover;
		background-image: url('data:image/png;base64,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');
	}
</style>
