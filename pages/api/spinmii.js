const { GIFEncoder, quantize, applyPalette, nearestColorIndex } = require("gifenc");
const { createCanvas, loadImage } = require("@napi-rs/canvas");

export default async function stats(req, res) {
	const {
		query: { data, axis },
	} = req;

	const generateRenderUrl = (degrees) => {
		let cameraRotate = "";

		switch (axis) {
			case "x":
				cameraRotate = `&cameraXRotate=${degrees}&cameraYRotate=0&cameraZRotate=0`;
				break;
			case "y":
				cameraRotate = `&cameraXRotate=0&cameraYRotate=${degrees}&cameraZRotate=0`;
				break;
			case "z":
				cameraRotate = `&cameraXRotate=0&cameraYRotate=0&cameraZRotate=${degrees}`;
				break;
			default:
				cameraRotate = `&cameraXRotate=0&cameraYRotate=0&cameraZRotate=0`;
				break;
		}

		return `https://studio.mii.nintendo.com/miis/image.png?type=face&expression=normal&width=512&bgColor=13173300&clothesColor=default${cameraRotate}&characterXRotate=0&characterYRotate=0&characterZRotate=0&lightXDirection=0&lightYDirection=0&lightZDirection=0&lightDirectionMode=none&instanceCount=1&instanceRotationMode=model&data=${encodeURIComponent(
			data
		)}`;
	};

	const gif = GIFEncoder();
	const canvas = createCanvas(512, 512);
	const ctx = canvas.getContext("2d");

	for (let i = 0; i < 18; i++) {
		ctx.clearRect(0, 0, 512, 512);

		const frame = generateRenderUrl(i * 20);
		await loadImage(frame).then((image) => {
			ctx.drawImage(image, 0, 0);
		});
		const { data, width, height } = ctx.getImageData(0, 0, 512, 512);

		const format = "rgba4444";

		const palette = quantize(data, 256, { format });
		const index = applyPalette(data, palette, format);

		const transparentIndex = nearestColorIndex(palette, [0, 0, 0, 0]);
		gif.writeFrame(index, width, height, {
			palette,
			transparent: true,
			transparentIndex,
			delay: 75,
		});
	}

	gif.finish();

	const gifBuffer = gif.bytes();

	res.writeHead(200, {
		"Content-Type": "image/gif",
		"Content-Length": gifBuffer.length,
	});
	res.end(gifBuffer);
}
