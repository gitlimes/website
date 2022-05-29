// TODO: fix animation running on page load

import { useState, useEffect } from "react";

import "../styles/global.css";

export default function App({ Component, pageProps }) {
  // we set the state to the darkMode value from localStorage
  const [darkMode, setDarkMode] = useState(true);

  let isFirstLoad = true;

  useEffect(() => {
    // if there is no value in localStorage, we set it
    if (!localStorage.getItem("darkMode")) {
      localStorage.setItem("darkMode", true);
    }
    // we set the state to the value in localStorage
    setDarkMode(localStorage.getItem("darkMode") === "true");
  }, []);

  async function setThemeAttr(first) {
    if (isFirstLoad || first) {
      document.querySelector("body").classList.add("refresh");
      setTimeout(function () {
        document.querySelector("body").classList.remove("refresh");
      }, 500);

      isFirstLoad = false;
    }
    setTimeout(function () {
      document
        .querySelector("html")
        .setAttribute("data-theme", darkMode ? "dark" : "light");
    }, 250);

    localStorage.setItem("darkMode", darkMode);
  }

  // we set the data-theme attribute to the body element
  // depending on the state of the darkMode variable
  useEffect(() => {
    setThemeAttr();
  }, [darkMode]);

  useEffect(() => {
    setThemeAttr(true);
  });

  return (
    <Component {...pageProps} darkMode={darkMode} setDarkMode={setDarkMode} />
  );
}
