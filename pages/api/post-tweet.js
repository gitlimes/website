import TwitterApi from "twitter-api-v2";

export default async function handler(req, res) {
  const authToken = req.headers.authorization.replace("Bearer ", "");
  const text = JSON.parse(req.body).text;

  const client = new TwitterApi(authToken);

  let code = 200;

  try {
    await client.v2.tweet(text);
  } catch (error) {
    code = 403;
  }

  res.status(code).send("Tweeted!");
}
