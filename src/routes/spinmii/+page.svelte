<script>
	import { slide, fade } from 'svelte/transition';
	import Minifooter from '$lib/components/Minifooter.svelte';
	import * as m from '$lib/paraglide/messages.js';

	import { onMount } from 'svelte';

	import Select from '$lib/components/inputs/Select.svelte';
	import RadioHorizontal from '$lib/components/inputs/RadioHorizontal.svelte';
	import Input from '$lib/components/inputs/Input.svelte';
	import Number from '$lib/components/inputs/Number.svelte';
	import Button from '$lib/components/inputs/Button.svelte';

	import Modal from '$lib/components/Modal.svelte';

	import { GIFEncoder, quantize, applyPalette, nearestColorIndex } from 'gifenc';

	import { CaretDown, ArrowSquareOut } from 'phosphor-svelte';

	let dataparams = $state();
	let axis = $state('Y');
	let expression = $state('normal');
	let showAdvanced = $state(false);
	let frames = $state(24);
	let length = $state(75);
	let loading = $state('');

	let helpModal = $state(false);
	// the service for the help modal
	let service = $state('n');

	onMount(() => {
		dataparams = localStorage.getItem('dataparams');
	});

	const renderMii = () => {
		/* value check */
		if (!dataparams) {
			return;
		}

		const _generateQuery = (
			/** @type {string} */ expression,
			/** @type {string} */ axis,
			/** @type {number} */ degrees,
			/** @type {string} */ dataparams
		) => {
			const query = {
				type: 'face',
				expression: expression,
				width: 512,
				bgColor: 13173300,
				clothesColor: 'default',
				cameraXRotate: 0,
				cameraYRotate: 0,
				cameraZRotate: 0,
				characterXRotate: 0,
				characterYRotate: 0,
				characterZRotate: 0,
				lightXDirection: 0,
				lightYDirection: 0,
				lightZDirection: 0,
				lightDirectionMode: 'none',
				instanceCount: 1,
				instanceRotationMode: 'model',
				data: dataparams
			};

			// @ts-ignore, I know what I'm doing. I think I do, at least.
			query[`camera${axis}Rotate`] = degrees;

			// @ts-ignore
			return new URLSearchParams(query).toString();
		};

		async function createGif() {
			const gif = GIFEncoder();

			const canvas = document.createElement('canvas');
			canvas.width = 512;
			canvas.height = 512;
			const ctx = canvas.getContext('2d');

			for (let i = 0; i < frames; i++) {
				loading = ((i / frames) * 100).toFixed(1);

				ctx.clearRect(0, 0, 512, 512);

				const url = `https://studio.mii.nintendo.com/miis/image.png?=${_generateQuery(expression, axis, Math.round((i * 360) / frames), dataparams)}`;
				const corsUrl = `https://corsproxy.io/?${url}`;

				const img = new Image();
				img.crossOrigin = 'anonymous';
				img.src = corsUrl;
				await img.decode();

				ctx.drawImage(img, 0, 0);

				const { data, width, height } = ctx.getImageData(0, 0, 512, 512);

				const format = 'rgba4444';

				const palette = quantize(data, 256, { format });
				const index = applyPalette(data, palette, format);

				const transparentIndex = nearestColorIndex(palette, [0, 0, 0]);
				gif.writeFrame(index, width, height, {
					palette,
					transparent: true,
					transparentIndex,
					delay: length
				});
			}

			loading = '100';

			gif.finish();
			const gifBuffer = gif.bytes();
			const blob = new Blob([gifBuffer], { type: 'image/gif' });

			const filename =
				[...dataparams].filter((_, i) => (i + 1) % 3 === 0).join('') +
				axis.charCodeAt(0) +
				expression.charCodeAt(0) +
				expression.charCodeAt(1) +
				frames +
				length;

			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `spinmii.limes.pink-${filename.replace(/0+$/, '')}.gif`;

			a.click();
			URL.revokeObjectURL(url);
		}

		createGif();

		localStorage.setItem('dataparams', dataparams);

		loading = '0';
	};
</script>

<svelte:head>
	<title>{m.stuff_spinmii_t()} - limes.pink</title>
	<meta property="og:title" content="{m.stuff_spinmii_t()} - limes.pink" />
	<meta property="twitter:title" content="{m.stuff_spinmii_t()} - limes.pink" />
	<meta name="description" content={m.spinmii_c()} />
	<meta property="twitter:description" content={m.spinmii_c()} />
	<meta property="og:description" content={m.spinmii_c()} />
	<meta property="og:image" content="https:/limes.pink/img/spinmii.gif" />
	<meta property="twitter:image" content="https:/limes.pink/img/spinmii.gif" />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:image:alt" content="" />
	<meta property="og:image:alt" content="" />
</svelte:head>

<div class="wrapper">
	<div class="formwrapper">
		<div class="inner">
			<div class="text">
				<h1>{m.stuff_spinmii_t()}</h1>
				<p>{m.spinmii_c()}</p>
			</div>
			<form class="form">
				<div class="inputgroup">
					<label for="dataparams"
						>data-params <button class="help" onclick={() => (helpModal = true)}
							>{m.spinmii_datap_what()}</button
						></label
					>
					<Input
						bind:value={dataparams}
						id="dataparams"
						placeholder="435259262c2b2f33091124292f323832374449505b626c74838e95a6aeb6daafb4bcbeb1b9b1b9b8bcbfc6d3dedfde"
						required
					/>
				</div>
				<div class="inputgroup">
					<label for="axis">{m.spinmii_axis()}</label>

					<RadioHorizontal
						options={[
							{ n: 'X', v: 'X' },
							{ n: 'Y', v: 'Y' },
							{ n: 'Z', v: 'Z' }
						]}
						bind:group={axis}
						id="axis"
					/>
				</div>
				<div class="inputgroup">
					<label for="expression">{m.spinmii_e()}</label>
					<Select
						options={[
							{ n: m.spinmii_e_normal(), v: 'normal' },
							{ n: m.spinmii_e_smile(), v: 'smile' },
							{ n: m.spinmii_e_anger(), v: 'anger' },
							{ n: m.spinmii_e_sorrow(), v: 'sorrow' },
							{ n: m.spinmii_e_surprise(), v: 'surprise' },
							{ n: m.spinmii_e_blink(), v: 'blink' },
							{ n: m.spinmii_e_frustrated(), v: 'frustrated' },
							{ n: m.spinmii_e_wink(), v: 'wink_left' }
						]}
						bind:value={expression}
						id="expression"
					/>
				</div>
				<button
					class={['advanced', { active: showAdvanced }]}
					onclick={() => {
						showAdvanced = !showAdvanced;
					}}><span class="caret"><CaretDown /></span><span>{m.spinmii_advanced()}</span></button
				>
				{#if showAdvanced}
					<div class="advanced" transition:slide>
						<div class="inputgroup">
							<label for="frames">{m.spinmii_frames()}</label>
							<Number id="frames" bind:value={frames} min="1" max="360" />
						</div>
						<div class="inputgroup">
							<label for="length">{m.spinmii_length()}</label>
							<Number id="length" bind:value={length} />
						</div>
					</div>
				{/if}
				<Button disabled={!dataparams} onclick={renderMii}
					>{m.download()} {loading ? `(${loading}%)` : ''}</Button
				>
			</form>
		</div>
	</div>

	<Minifooter logoColor="var(--accent)" bgColor="var(--background)" />

	<Modal bind:showModal={helpModal}>
		<RadioHorizontal
			options={[
				{ n: 'Nintendo Network', v: 'n' },
				{ n: 'Pretendo Network', v: 'p' }
			]}
			bind:group={service}
			id="service"
		/>

		{#if service === 'n'}
			<ol class="help-steps">
				<li>
					{m.spinmii_help_open() + ' '}<a
						href="https://accounts.nintendo.com/login?post_login_redirect_uri=https%3A%2F%2Faccounts.nintendo.com%2Fmii_studio"
						target="_blank"
						>Mii Studio<span class="outarrow"><ArrowSquareOut size={20} weight="bold" /></span></a
					>
				</li>
				<li>
					{m.spinmii_help_n2() + ' '}
				</li>

				<li>{m.spinmii_help_console()}</li>
				<li>{m.spinmii_help_paste()}:</li>
				<code> console.log(document.body.attributes["data-params"].textContent) </code>
				<li>{m.spinmii_help_done()}</li>
			</ol>
		{:else if service === 'p'}
			<ol class="help-steps">
				<li>
					{m.spinmii_help_open() + ' '}<a
						href="https://pretendo.network/account/miieditor"
						target="_blank"
						>Mii Editor<span class="outarrow"><ArrowSquareOut size={20} weight="bold" /></span></a
					>
				</li>

				<li>{m.spinmii_help_console()}</li>
				<li>{m.spinmii_help_paste()}:</li>
				<code>
					console.log(document.querySelector(".new-mii-wrapper>img.new-mii").src.split("&data=")[1])
				</code>
				<li>{m.spinmii_help_done()}</li>
			</ol>
		{/if}
	</Modal>
</div>

<style>
	:root {
		--accent: var(--purple);
		--background: var(--bg-purple);
		--input-bg: var(--input-bg-purple);
	}

	.wrapper {
		width: 100%;
		min-height: 100vh;
		display: grid;
		grid-template-rows: 1fr auto;
		background: var(--background);
		font-size: 0.8rem;
	}
	.formwrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.inner {
		width: min(21rem, 90%);
	}

	.form {
		display: flex;
		flex-flow: column;
		color: var(--text);
	}
	.form > * {
		margin-bottom: 0.8rem;
	}
	.form .inputgroup {
		display: flex;
		flex-flow: column;
		gap: 0.3rem;
		width: 100%;
	}

	button.help {
		appearance: none;
		background: none;
		border: none;
		padding: none;
		/*border-radius: none;*/
		color: inherit;
		font-size: inherit;
		font-family: inherit;
		position: relative;
		line-height: inherit;
		width: unset;
		font-size: 0.6rem;

		text-decoration: underline;
		cursor: pointer;
		color: var(--text-muted);
		transition: 200ms color;
	}
	button.help:hover,
	button.help:focus {
		color: var(--text);
	}

	/*h2.modal-header {
		color: var(--accent);
		font-size: 1.5rem;
		padding: 0;
		margin: 0;
	}*/
	.help-steps a {
		font-weight: bold;
		text-decoration: underline;
	}
	.help-steps li {
		margin: 0.25rem 0;
	}
	.help-steps li .outarrow {
		position: relative;
		bottom: -0.1rem;
		left: 0.2rem;
	}
	.help-steps code {
		display: block;
		padding: 0.3rem 0.5rem;
		background: #000;
		color: #fff;
		font-family: var(--monospace-font);
		/*border-radius: 4px;*/
	}

	div.text > * {
		margin: 0;
	}
	div.text h1 {
		color: var(--accent);
		margin-left: -0.2rem;
	}
	@media screen and (max-width: 480px) {
		div.text h1 {
			font-size: 3.5rem;
		}
	}
	div.text {
		margin-bottom: 2rem;
	}

	div.advanced {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	button.advanced {
		display: flex;
		align-items: center;
		appearance: none;
		border: none;
		background: none;
		color: inherit;
		font-size: inherit;
		font-family: inherit;
		position: relative;
		line-height: inherit;
		width: fit-content;
		cursor: pointer;
	}
	button.advanced span {
		margin-left: 0.2rem;
	}
	button.advanced span.caret {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: -0.25rem;
		transition: transform 300ms;
	}
	button.advanced.active span.caret {
		transform: rotate(180deg);
	}
</style>
