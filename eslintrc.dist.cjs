'use strict';

module.exports = {
	root: true,
	env: {
		browser: true,
		es2022: true,
	},
	plugins: ['es-x'],
	extends: ['plugin:es-x/restrict-to-es2018'],
	parserOptions: {
		ecmaVersion: 13,
	},
	rules: {
		'es-x/no-array-prototype-flat': 0,
		'es-x/no-regexp-lookbehind-assertions': 2,
		'es-x/no-string-prototype-trimstart-trimend': 0,
	},
	settings: {
		'es-x': {
			aggressive: true,
		},
	},
};
