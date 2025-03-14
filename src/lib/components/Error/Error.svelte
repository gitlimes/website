<script>
	const {
		gameConsole,
		header,
		body,
		button,
		supportInfo = '\n\nSupport Information\n① 5.5.5 E\n② WUP-101(03)\n③ LIMES.PINK/ERRORS' /* only used for Wii U */
	} = $props();

	import { onMount } from 'svelte';

	/**
	 * @type {HTMLCanvasElement}
	 */
	let canvas;

	import * as templateWiiU from './templates/wiiu.json';
	import * as template3DS from './templates/3ds.json';
	import * as templateWii from './templates/wii.json';

	const templates = {
		wiiu: templateWiiU,
		'3ds': template3DS,
		wii: templateWii
	};

	let template = $derived(templates[gameConsole]);

	let fontsLoaded = $state(false);

	onMount(async () => {
		const rodinMedium = new FontFace('Rodin', 'url(/res/errors/Rodin.otf)', {
			weight: 'normal'
		});
		await rodinMedium.load();
		document.fonts.add(rodinMedium);

		const Greco = new FontFace('Greco', 'url(/res/errors/Greco.ttf)', {
			weight: 'normal'
		});
		await Greco.load();
		document.fonts.add(Greco);

		fontsLoaded = true;
	});

	$effect(() => {
		if (fontsLoaded) {
			const ctx = canvas.getContext('2d');

			// workaround to get this to actually reload when state changes
			const _deps = [header, body, button, supportInfo, gameConsole];

			loadImage(template.baseImageUrl).then((img) => {
				ctx.drawImage(img, 0, 0);

				// header text
				printTextArea(ctx, template.headerArea, header);

				// body text
				printTextArea(ctx, template.bodyArea, gameConsole === 'wiiu' ? body + supportInfo : body);

				if (template.fadeImageUrl) {
					loadImage(template.fadeImageUrl).then((img) => {
						ctx.drawImage(img, 0, 0);

						printTextArea(ctx, template.buttonArea, button);

						/*loadImage('/res/errors/dev/ref_wiiu.png').then((img) => {
							ctx.drawImage(img, 0, 0);
						});*/
					});
				} else {
					printTextArea(ctx, template.buttonArea, button);

					/*loadImage('/res/errors/dev/ref_3ds.png').then((img) => {
						ctx.drawImage(img, 0, 0);
					});*/
					/*
					loadImage('/res/errors/dev/ref_wii.png').then((img) => {
						ctx.drawImage(img, 0, 0);
					})*/
				}
			});
		}
	});

	// utility function which renders the text
	function printTextArea(ctx, area, text) {
		if (!area) return;

		ctx.font = `${area.fontSize}px ${area.fontFamily}`;
		ctx.textAlign = area?.textAlign || "left";
		ctx.fillStyle = area.fill;

		const lines = getLines(ctx, text, area.w);

		if (area?.alignContent !== 'center') {
			for (let i = 0; i < Math.min(lines.length, area.maxLines || 1); i++) {
				ctx.fillText(
					lines[i],
					area.textAlign === 'center' ? area.x + area.w / 2 : area.x,
					area.y + area?.fontSize + i * area?.fontSize * (area?.lineHeight || 1),
					area.w
				);
			}
		} else {
			const lineCount = Math.min(lines.length, area.maxLines || 1);
			const areaOccupiedByText = area?.fontSize * area.lineHeight * lineCount;
			let startY = area.y + (area.h - areaOccupiedByText) / 2;

			// aligns the text to the background stripes
			if (lineCount % 2 === 1) {
				startY += area?.oddVerticalOffset || 0;
			} else {
				startY += area?.evenVerticalOffset || 0;
			}

			for (let i = 0; i < Math.min(lines.length, area.maxLines || 2); i++) {
				ctx.fillText(
					lines[i],
					area.textAlign === 'center' ? area.x + area.w / 2 : area.x,
					startY + area?.fontSize + i * area?.fontSize * (area?.lineHeight || 1),
					area.w
				);
			}
		}
	}

	/**
	 * @param {string} url
	 */
	function loadImage(url) {
		return new Promise((resolve, reject) => {
			const image = new Image();

			image.src = url;

			image.onload = () => resolve(image);
			image.onerror = () => reject(`Image failed to load: ${url}`);
		});
	}

	// adapted from https://stackoverflow.com/a/16599668 to also respect newline chars
	function getLines(ctx, text, maxWidth) {
		const groups = text.split('\n');

		let lines = [];

		groups.forEach((group) => {
			const words = group.split(' ');

			let currentLine = words[0];

			for (let i = 1; i < words.length; i++) {
				const word = words[i];
				let width = ctx.measureText(currentLine + ' ' + word).width;
				if (width < maxWidth) {
					currentLine += ' ' + word;
				} else {
					lines.push(currentLine);
					currentLine = word;
				}
			}
			lines.push(currentLine);
		});

		return lines;
	}

	export function download() {
		const anchor = document.createElement('a');
		anchor.href = canvas.toDataURL('image/png');

		const headerHex = Array.from(header)
			.map((c) => c.charCodeAt(0))
			.reduce((a, b) => a + b, 1)
			.toString(16);
		const bodyHex = Array.from(body)
			.map((c) => c.charCodeAt(0))
			.reduce((a, b) => a + b, 1)
			.toString(16);
		const buttonHex = Array.from(button)
			.map((c) => c.charCodeAt(0))
			.reduce((a, b) => a + b, 1)
			.toString(16);

		const filenameGibberish = headerHex + bodyHex + gameConsole[0] + buttonHex;

		anchor.download = `errors.limes.pink-${filenameGibberish}.png`;
		anchor.click();
	}
</script>

<svelte:head>
	<link
		rel="preload"
		href="/res/errors/wii_base.png"
		as="image"
		type="image/png"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/res/errors/3ds_base.png"
		as="image"
		type="image/png"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/res/errors/wiiu_base.png"
		as="image"
		type="image/png"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/res/errors/wiiu_fade.png"
		as="image"
		type="image/png"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/res/errors/Rodin.otf"
		as="font"
		type="font/otf"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/res/errors/Greco.otf"
		as="font"
		type="font/ttf"
		crossorigin="anonymous"
	/>
</svelte:head>

<canvas bind:this={canvas} width={template.canvasArea.w} height={template.canvasArea.h}
	>no canvas :/</canvas
>
