export default async function stats(req, res) {
	const {
		query: { header, caption, button },
	} = req;
	const { createCanvas, loadImage, GlobalFonts } = require("@napi-rs/canvas");
	const canvas = createCanvas(960, 723);
	const ctx = canvas.getContext("2d");

	const renderText = {
		header: header || "",
		caption: caption || "",
		button: button || "OK",
	};

	function fillMultilineText(text, x, y, maxwidth, lineHeight) {
		const lines = text?.split("\n");
		for (let i = 0; i < lines?.length; i++) {
			ctx.fillText(lines[i], x, y + i * lineHeight, maxwidth);
		}
	}

	GlobalFonts.registerFromPath(
		`${__dirname}/../../../../../public/assets/fonts/rodin/FOTRodin Pro DB.otf`,
		"Rodin Bold"
	);

	await loadImage(
		`${__dirname}/../../../../../public/assets/images/3ds_errorcode_base.png`
	).then((image) => {
		ctx.drawImage(image, 0, 0);
	});

	ctx.font = '48px "Rodin Bold"';
	ctx.textAlign = "left";
	ctx.fillStyle = "#fff";
	ctx.fillText(renderText.header, 24, 55, 928);

	// center lines vertically
	const maxLines = 9;
	const slicedLines = renderText.caption.split("\n").slice(0, maxLines);
	const linesToBeAdded = maxLines - slicedLines.length;

	let extraY = 0;

	const linesToBeAddedPerSide = Math.floor(linesToBeAdded / 2);
	for (let i = 0; i < linesToBeAddedPerSide; i++) {
		slicedLines.unshift("");
		slicedLines.push("");
	}

	if (linesToBeAdded % 2 !== 0) {
		extraY = 24;
	}
	const finalCaption = slicedLines.join("\n");

	ctx.font = '48px "Rodin Bold"';
	ctx.fillStyle = "#28272a";

	fillMultilineText(finalCaption, 24, 138 + extraY, 928, 60);

	ctx.textAlign = "center";
	ctx.fillText(renderText.button, 480, 700, 928);

	const imageBuffer = canvas.toBuffer("image/png");

	res.writeHead(200, {
		"Content-Type": "image/png",
		"Content-Length": imageBuffer.length,
	});
	res.end(imageBuffer);
}
