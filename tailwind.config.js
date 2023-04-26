/** @type {import('tailwindcss').Config} */

export default {
	purge: ['./*.html', './src/**/*.{vue,js,ts,jsx,tsx,css}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {
			primary_120: '#8e5b25',
			primary_110: '#be7a31',
			primary_100: '#ed983d',
		},
	},
	plugins: [require('daisyui')],
};
