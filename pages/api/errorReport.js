export default async function errorReport(req, res) {
  const { url, errorCode, userAgent, timestamp, moreInfo } = req.body;

  const embedData = {
    content: `New error report - HTTP ${errorCode}`,
    embeds: [
      {
        color: 11238348,
        fields: [
          {
            name: "URL",
            value: url,
          },
          {
            name: "Error code",
            value: errorCode,
          },
          {
            name: "User Agent",
            value: userAgent,
          },
          {
            name: "Timestamp",
            value: timestamp,
          },
          {
            name: "More info",
            value: moreInfo || "No more info provided.",
          },
        ],
      },
    ],
  };

  const webhookPost = await fetch(process.env.DISCORD_ERROR_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(embedData),
  });
  if (webhookPost.ok) {
    res.status(200).send("OK");
  } else {
    res.status(500).send("Internal server error");
  }
}
