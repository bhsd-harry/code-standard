'use strict';

module.exports = {
	root: true,
	env: {
		browser: true,
		es2024: true,
	},
	plugins: ['es-x'],
	extends: ['plugin:es-x/restrict-to-es2019'],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		'es-x/no-global-this': 0,
		'es-x/no-import-meta': 0,
		'es-x/no-promise-all-settled': 0,
		'es-x/no-regexp-lookbehind-assertions': 2,
		'es-x/no-string-prototype-matchall': 0,
	},
	settings: {
		'es-x': {
			aggressive: true,
		},
	},
};
