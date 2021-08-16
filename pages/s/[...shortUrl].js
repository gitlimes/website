import { useRouter } from "next/router";
import { useEffect } from "react";
export default function shortUrlRedirect() {
  const router = useRouter();
  const shortUrlList = require("../../shorturls.json");
  const shortUrl = router.query.shortUrl;
  const fullUrl = shortUrlList[shortUrl] || "https://montylion.dev";

  //console.log(`shortUrl: ${shortUrl}\nfullUrl: ${fullUrl}`);

  useEffect(() => window.location.replace(fullUrl));
  return null;
}
