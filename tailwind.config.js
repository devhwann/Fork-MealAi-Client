/** @type {import('tailwindcss').Config} */

export default {
	purge: ['./*.html', './src/**/*.{vue,js,ts,jsx,tsx,css}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [require('daisyui')],
};
