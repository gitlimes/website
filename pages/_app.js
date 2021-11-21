import "../styles/global.css";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

export default function App({ Component, pageProps }) {
  return (
    <SimpleBar style={{ maxHeight: "100vh" }}>
      <Component {...pageProps} />
    </SimpleBar>
  );
}
