import Head from "next/head";

export async function getServerSideProps() {
  const age = Math.floor(
    (new Date() - new Date("April 13, 2004")) / (1000 * 60 * 60 * 24 * 365)
  ); // There's no way I'm gonna remember to update it myself, so here's a lazy workaround.
  return {
    props: { age },
  };
}

export default function Home({ age }) {
  return (
    <home
      style={{
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "90%",
        margin: "auto",
        marginTop: "10vh",
      }}
    >
      <Head>
        <title>Ash (Monty)</title>
      </Head>
      I'm Ash, {age}, and I'm redesigning this website for the second time in a
      row. I swear I'll be done at some point. <br /> In the meanwhile, check
      out this cool tweet. It's not mine, it's just a mood honestly.
      <blockquote class="twitter-tweet" data-dnt="true" data-theme="dark">
        <p lang="und" dir="ltr">
          <a href="https://t.co/UcN7CYQti2">pic.twitter.com/UcN7CYQti2</a>
        </p>
        &mdash; twist (@twistCMYK){" "}
        <a href="https://twitter.com/twistCMYK/status/1436850694842105857?ref_src=twsrc%5Etfw">
          September 12, 2021
        </a>
      </blockquote>{" "}
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
      ></script>
    </home>
  );
}
