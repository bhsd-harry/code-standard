'use strict';

module.exports = {
	root: true,
	env: {
		browser: true,
		es2024: true,
	},
	plugins: ['es-x'],
	extends: ['plugin:es-x/restrict-to-es2020'],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		'es-x/no-regexp-lookbehind-assertions': 2,
		'es-x/no-regexp-unicode-property-escapes-2020': 2,
	},
	settings: {
		'es-x': {
			aggressive: true,
		},
	},
};
