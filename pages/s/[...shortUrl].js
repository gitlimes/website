const urlList = require("../../shorturls.json");

export async function getServerSideProps(c) {
  const { shortUrl } = c.params;
  const target = urlList[shortUrl] || "/";

  return {
    redirect: {
      destination: target,
      permanent: false,
    },
  };
}

export default function shortUrlRedirect() {
  return null;
}
