import TwitterApi from "twitter-api-v2";
import absoluteUrl from "next-absolute-url";
import Cookies from "cookies";

export async function getServerSideProps({ req, res, query }) {
  const { origin: currentDomain } = absoluteUrl(req);
  const cookies = new Cookies(req, res);

  // Exact state and code from query string
  const { state, code } = query;
  // Get the saved oauth_token_secret from session
  const codeVerifier = cookies.get("_twitterAPI_codeVerifier");
  const sessionState = cookies.get("_twitterAPI_state");

  // Catch-all for errors, just returns back to the home page
  if (
    !codeVerifier ||
    !state ||
    !sessionState ||
    !code ||
    state !== sessionState
  ) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const client = new TwitterApi({
    clientId: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
  });
  const { accessToken } = await client.loginWithOAuth2({
    code,
    codeVerifier,
    redirectUri: `${currentDomain}/twitter64/callback`,
  });

  // Save the access token as a cookie
  cookies.set("_twitterAPI_accessToken", accessToken);

  /*const { data: createdTweet } = await loggedClient.v2.tweet('just testing some stuff, ignore this');
  console.log('Tweet', createdTweet.id, ':', createdTweet.text);*/

  // Redirect to the home page
  return {
    redirect: {
      destination: "/twitter64",
      permanent: false,
    },
  };
}

export default function Callback() {}
