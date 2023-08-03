/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				secBlack: "#0D1117",
				mainBlack: "#010409",
				thirdBlack: "#161B22",
				borderMain: "#30363D",
			},
		},
	},
	plugins: [],
};
