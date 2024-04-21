import { useState, useEffect } from "react";

import "../styles/global.css";

export default function App({ Component, pageProps }) {
	// we set the state to the darkMode value from localStorage
	const [darkMode, setDarkMode] = useState(true);

	useEffect(() => {
		const _mtm = (window._mtm = window._mtm || []);
		_mtm.push({ "mtm.startTime": new Date().getTime(), event: "mtm.Start" });
		(function () {
			const d = document,
				g = d.createElement("script"),
				s = d.getElementsByTagName("script")[0];
			g.async = true;
			g.src = "https://matomo.limes.pink/js/container_8X80wgnH.js";
			s.parentNode.insertBefore(g, s);
		})();
	});

	// setup
	useEffect(() => {
		// if there is no value in localStorage, we set it
		if (!localStorage.getItem("darkMode")) {
			localStorage.setItem("darkMode", true);
		}
		// we set the state to the value in localStorage
		setDarkMode(localStorage.getItem("darkMode") === "true");
	}, []);

	// runs on every theme change
	function onThemeChange() {
		document
			.querySelector("html")
			.setAttribute("data-theme", darkMode ? "dark" : "light");

		localStorage.setItem("darkMode", darkMode);
	}

	// we set the data-theme attribute to the body element
	// depending on the state of the darkMode variable
	useEffect(() => {
		onThemeChange();
	}, [darkMode]);

	return (
		<Component {...pageProps} darkMode={darkMode} setDarkMode={setDarkMode} />
	);
}
