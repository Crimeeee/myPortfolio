import type { Config } from "tailwindcss";

export default {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./server/**/*.{js,ts}",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
		"./app.vue",
	],
	theme: {
		extend: {
			colors: {
				twitter: "#1D9BF0",
				discord: "#5865F2",
			},
		},
		fontFamily: {
			poppins: ["Poppins", "sans-serif"],
		},
	},
} satisfies Config;
