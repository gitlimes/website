export default async function stats(req, res) {
	const {
		query: {
			header,
			caption,
			button,
			supportHeader,
			version,
			model,
			serialNumber,
		},
	} = req;
	const { createCanvas, loadImage, GlobalFonts } = require("@napi-rs/canvas");
	const canvas = createCanvas(947, 595);
	const ctx = canvas.getContext("2d");

	const renderText = {
		header: header || "",
		caption: caption || "",
		button: button || "OK",
		supportInfo: `${supportHeader || "Support Information"}\n① ${
			version || "5.5.5 E"
		}\n② ${model || "WUP-101(03)"}\n③ ${
			serialNumber || "ASHM.DEV/WIIU"
		}\n④ offscreen`,
	};

	function fillMultilineText(text, x, y, maxwidth, lineHeight) {
		const lines = text?.split("\n");
		for (let i = 0; i < lines?.length; i++) {
			ctx.fillText(lines[i], x, y + i * lineHeight, maxwidth);
		}
	}

	GlobalFonts.registerFromPath(
		"public/assets/fonts/rodin/FOTRodin Pro DB.otf",
		"Rodin Bold"
	);

	await loadImage("public/assets/images/wiiu_errorcode_base.png").then(
		(image) => {
			ctx.drawImage(image, 0, 0);
		}
	);

	ctx.font = '40px "Rodin Bold"';
	ctx.textAlign = "center";
	ctx.fillStyle = "#fff";
	ctx.fillText(renderText.header, 473.5, 52, 720);

	ctx.font = '38px "Rodin Bold"';
	ctx.fillStyle = "#000";
	ctx.textAlign = "center";
	fillMultilineText(
		`${renderText.caption}\n\n${renderText.supportInfo}`,
		473.5,
		140,
		720,
		61
	);

	await loadImage("public/assets/images/wiiu_errorcode_fade.png").then(
		(image) => {
			ctx.drawImage(image, 0, 0);
		}
	);

	ctx.fillText(renderText.button, 473.5, 530.5, 500);

	const imageBuffer = canvas.toBuffer("image/png");

	res.writeHead(200, {
		"Content-Type": "image/png",
		"Content-Length": imageBuffer.length,
	});
	res.end(imageBuffer);
}
