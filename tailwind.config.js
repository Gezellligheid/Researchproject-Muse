const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: [
		'./src/**/*.{html,js,jsx,ts,tsx}',
		'./public/**/*.{html,js,jsx,ts,tsx}'
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	variants: { extend: { scrollbar: ['rounded', 'width'] } },
	plugins: [require('tailwind-scrollbar')]
}
