/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.jsx",
        "./resources/**/*.js",
    ],
    theme: {
    	extend: {
    		fontFamily: {
    			'plus-jakarta': [
    				'plus-jakarta',
    				'sans-serif'
    			],
    			'inter': [
    				'inter',
    				'sans-serif'
    			],
    			'satoshi': [
    				'satoshi',
    				'sans-serif'
    			]
    		},
    		fontSize: {
    			sm: '0.8rem',
    			base: '1rem',
    			xl: '1.25rem',
    			'2xl': '1.563rem',
    			'3xl': '1.953rem',
    			'4xl': '2.441rem',
    			'5xl': '3.052rem'
    		},
    	}
    },
    plugins: [require("tailwindcss-animate")],
};
