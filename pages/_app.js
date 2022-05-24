import { useState, useEffect } from "react";

import "../styles/global.css";

export default function App({ Component, pageProps }) {
  // we set the state to the darkMode value from localStorage
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // if there is no value in localStorage, we set it
    if (!localStorage.getItem("darkMode")) {
      localStorage.setItem("darkMode", true);
    }
    // we set the state to the value in localStorage
    setDarkMode(localStorage.getItem("darkMode") === "true");
  }, []);

  async function setThemeAttr() {
    document.querySelector("body").classList.add("refresh");
    setTimeout(function () {
      document
        .querySelector("html")
        .setAttribute("data-theme", darkMode ? "dark" : "light");
    }, 250);

    localStorage.setItem("darkMode", darkMode);

    setTimeout(function () {
      document.querySelector("body").classList.remove("refresh");
    }, 500);
  }

  // we set the data-theme attribute to the body element
  // depending on the state of the darkMode variable
  useEffect(() => {
    setThemeAttr();
  }, [darkMode]);

  useEffect(() => {
    setThemeAttr();
  });

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="https://use.typekit.net/koi7dba.css" />
      <Component {...pageProps} darkMode={darkMode} setDarkMode={setDarkMode} />
    </>
  );
}
