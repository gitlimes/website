<script>
	import Minifooter from '$lib/components/Minifooter.svelte';
	import * as m from '$lib/paraglide/messages.js';

	import Select from '$lib/components/inputs/Select.svelte';
	import Input from '$lib/components/inputs/Input.svelte';
	import Textarea from '$lib/components/inputs/Textarea.svelte';

	import Error from '$lib/components/Error/Error.svelte';

	import Button from '$lib/components/inputs/Button.svelte';

	import { GameController, QrCode } from 'phosphor-svelte';

	import { page } from '$app/state';

	let consoleQuery = page.url.searchParams.get('console');

	let gameConsole = $state(consoleQuery || 'switch2');
	let header = $state('Error Code 123-4567');
	let body = $state(
		'Whoopsies! You have been permanently banned from Nintendo Network.\nYou got games on your phone?'
	);
	let button = $state('OK');
	let qr = $state('https://www.nintendo.uk.net/en-gb/Support/Nintendo-Switch/How-to-Find-Error-Code-Information-and-Support-1513788.html');

	let errorDownload;
</script>

<svelte:head>
	<title>{m.stuff_errors_t()} - limes.pink</title>
	<meta property="og:title" content="{m.stuff_errors_t()} - limes.pink" />
	<meta property="twitter:title" content="{m.stuff_errors_t()} - limes.pink" />
	<meta name="description" content={m.errors_c()} />
	<meta property="twitter:description" content={m.errors_c()} />
	<meta property="og:description" content={m.errors_c()} />
	<meta property="og:image" content="https:/limes.pink/img/social.png" />
	<meta property="twitter:image" content="https:/limes.pink/img/social.png" />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:image:alt" content="" />
	<meta property="og:image:alt" content="" />
</svelte:head>

<div class="wrapper">
	<div class="formwrapper">
		<div class="inner">
			<div class="text">
				<h1>{m.stuff_errors_t()}</h1>
				<p>{m.errors_c()}</p>
			</div>
			<div class="editor {gameConsole === '3ds' ? 'threeds' : gameConsole}">
				<form class="form">
					<div class="inputgroup">
						<label for="gameConsole"><GameController size="2rem" weight="fill" /></label>

						<Select
							options={[
								{ n: 'Wii', v: 'wii' },
								{ n: '3DS', v: '3ds' },
								{ n: 'Wii U', v: 'wiiu' },
								{ n: 'Switch', v: 'switch' },
								{ n: 'Switch 2', v: 'switch2' }
							]}
							bind:value={gameConsole}
							id="gameConsole"
						/>
					</div>
					{#if gameConsole !== 'wii'}
						<div class="inputgroup">
							<label for="header"
								>{#if gameConsole === 'wiiu'}<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 18"
										height="1.5rem"
									>
										<path
											d="M24 4H0V2.5A2.5 2.5 0 0 1 2.5 0h19A2.5 2.5 0 0 1 24 2.5V4z"
											style="fill: var(--accent)"
										/>
										<path
											d="M21.5 18h-19A2.5 2.5 0 0 1 0 15.5V4h24v11.5a2.5 2.5 0 0 1-2.5 2.5z"
											style="fill: var(--input-bg)"
										/>
										<rect
											x="2"
											y="12"
											width="20"
											height="4"
											rx="1"
											ry="1"
											style="fill: var(--input-bg)"
										/>
									</svg>{:else}<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 18"
										height="1.5rem"
										style="fill: var(--input-bg)"
									>
										<path style="fill: var(--input-bg)" d="M0 4h24v10H0z" />
										<path d="M0 14h24v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1v-3z" />
										<path
											d="M0 0h24v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V0z"
											transform="rotate(180 12 2)"
											style="fill: var(--accent)"
										/>
									</svg>{/if}</label
							>
							<Input
								bind:value={header}
								id="header"
								ariaLabel="header"
								placeholder="Error Code 123-4567"
								required
							/>
						</div>
					{/if}

					<div class="inputgroup">
						<label for="bodyinput"
							>{#if gameConsole === 'wiiu'}<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 18"
									height="1.5rem"
								>
									<path
										d="M24 4H0V2.5A2.5 2.5 0 0 1 2.5 0h19A2.5 2.5 0 0 1 24 2.5V4z"
										style="fill: var(--input-bg)"
									/>
									<path
										d="M21.5 18h-19A2.5 2.5 0 0 1 0 15.5V4h24v11.5a2.5 2.5 0 0 1-2.5 2.5z"
										style="fill: var(--accent)"
									/>
									<rect
										x="2"
										y="12"
										width="20"
										height="4"
										rx="1"
										ry="1"
										style="fill: var(--input-bg)"
									/>
								</svg>{:else if gameConsole === 'wii'}<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 18"
									height="1.5rem"
								>
									<path
										d="M24 4H0V2.5A2.5 2.5 0 0 1 2.5 0h19A2.5 2.5 0 0 1 24 2.5V4z"
										style="fill: var(--accent)"
									/>
									<path
										d="M21.5 18h-19A2.5 2.5 0 0 1 0 15.5V4h24v11.5a2.5 2.5 0 0 1-2.5 2.5z"
										style="fill: var(--accent)"
									/>
									<rect
										x="6"
										y="12"
										width="12"
										height="4"
										rx="2"
										ry="2"
										style="fill: var(--input-bg)"
									/>
								</svg>{:else}<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 18"
									height="1.5rem"
									style="fill: var(--input-bg)"
								>
									<path style="fill: var(--accent)" d="M0 4h24v10H0z" />
									<path d="M0 14h24v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1v-3z" />
									<path
										d="M0 0h24v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V0z"
										transform="rotate(180 12 2)"
										style="fill: var(--input-bg)"
									/>
								</svg>{/if}</label
						>
						<Textarea
							bind:value={body}
							id="bodyinput"
							placeholder="computer james"
							ariaLabel="body"
							required
							rows={3}
						/>
					</div>

					<div class="inputgroup">
						<label for="buttoninput"
							>{#if gameConsole === 'wiiu'}<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 18"
									height="1.5rem"
								>
									<path
										d="M24 4H0V2.5A2.5 2.5 0 0 1 2.5 0h19A2.5 2.5 0 0 1 24 2.5V4z"
										style="fill: var(--input-bg)"
									/>
									<path
										d="M21.5 18h-19A2.5 2.5 0 0 1 0 15.5V4h24v11.5a2.5 2.5 0 0 1-2.5 2.5z"
										style="fill: var(--input-bg)"
									/>
									<rect
										x="2"
										y="12"
										width="20"
										height="4"
										rx="1"
										ry="1"
										style="fill: var(--accent)"
									/>
								</svg>{:else if gameConsole === 'wii'}<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 18"
									height="1.5rem"
								>
									<path
										d="M24 4H0V2.5A2.5 2.5 0 0 1 2.5 0h19A2.5 2.5 0 0 1 24 2.5V4z"
										style="fill: var(--input-bg)"
									/>
									<path
										d="M21.5 18h-19A2.5 2.5 0 0 1 0 15.5V4h24v11.5a2.5 2.5 0 0 1-2.5 2.5z"
										style="fill: var(--input-bg)"
									/>
									<rect
										x="6"
										y="12"
										width="12"
										height="4"
										rx="2"
										ry="2"
										style="fill: var(--accent)"
									/>
								</svg>{:else}<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 18"
									height="1.5rem"
									style="fill: var(--accent)"
								>
									<path style="fill: var(--input-bg)" d="M0 4h24v10H0z" />
									<path d="M0 14h24v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1v-3z" />
									<path
										d="M0 0h24v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V0z"
										transform="rotate(180 12 2)"
										style="fill: var(--input-bg)"
									/>
								</svg>{/if}</label
						>
						<Input
							bind:value={button}
							id="buttoninput"
							placeholder="OK"
							ariaLabel="button"
							required
						/>
					</div>

					{#if gameConsole === 'switch2'}
						<div class="inputgroup">
							<label for="qrinput"><QrCode size="2rem" /></label>

							<Input
								bind:value={qr}
								id="qrinput"
								placeholder="https://support.nintendo.uk.net/"
								ariaLabel="qrinput"
								required
							/>
						</div>
					{/if}

					<Button disabled={!header || !body || !button} onclick={() => errorDownload.download()}
						>{m.download()}</Button
					>
				</form>
				<div class="canvaswrapper">
					<Error {gameConsole} {header} {body} {button} {qr} bind:this={errorDownload} />
				</div>
			</div>
		</div>
	</div>

	<Minifooter logoColor="var(--accent)" bgColor="var(--background)" />
</div>

<style>
	:root {
		--accent: var(--blue);
		--background: var(--bg-blue);
		--input-bg: var(--input-bg-blue);
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
		gap: 2rem;
	}

	.editor {
		display: grid;
		gap: 2rem;
		grid-template-columns: auto auto;
		grid-template-rows: 1fr;
		align-items: center;
	}

	.formwrapper :global(canvas) {
		height: 15rem;
		/*border-radius: 4px;*/
		transition: width 150ms;
	}

	.formwrapper .wiiu :global(canvas) {
		width: 23.873rem;
	}

	.formwrapper .threeds :global(canvas) {
		width: 20rem;
	}
	.formwrapper .wii :global(canvas) {
		width: 21.778rem;
	}

	.formwrapper .switch :global(canvas) {
		width: 23.873rem;
		height: auto;
	}

	.formwrapper .switch2 :global(canvas) {
		width: 22rem;
		height: auto;
	}

	.canvaswrapper {
		display: flex;
		transition: width 200ms;
	}

	.form {
		display: flex;
		flex-flow: column;
		color: var(--text);
		margin-left: 3rem;
		min-width: 16rem;
	}
	.form > * {
		margin-bottom: 0.8rem;
	}
	.form .inputgroup {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: 1rem;
		width: calc(100% + 3rem);
		margin-left: -3rem;
	}

	.form .inputgroup label {
		height: 1.5rem;
		display: flex;
		align-items: center;
		color: var(--accent);
	}

	div.text > * {
		margin: 0;
	}
	div.text h1 {
		color: var(--accent);
		margin-left: -0.2rem;
	}
	@media screen and (max-width: 970px) {
		.editor {
			grid-template-columns: 1fr;
			grid-template-rows: auto auto;
		}

		.form {
			order: 1;
		}

		.canvaswrapper {
			order: 0;
		}
	}

	@media screen and (max-width: 480px) {
		div.text h1 {
			font-size: 3.5rem;
		}

		.inner {
			max-width: 90%;
		}

		.formwrapper .wiiu :global(canvas),
		.formwrapper .threeds :global(canvas) {
			width: 100%;
			height: auto;
		}

		.formwrapper .switch2 :global(canvas) {
			width: 100%;
			height: auto;
		}

		.form {
			min-width: unset;
		}
	}
	div.text {
		margin-bottom: 2rem;
	}
</style>
