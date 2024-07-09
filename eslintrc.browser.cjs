'use strict';

const config = require('@bhsd/common/eslintrc.cjs');

module.exports = {
	...config,
	env: {
		...config.env,
		browser: true,
	},
	plugins: [
		...config.plugins,
		'es-x',
	],
	rules: {
		...config.rules,
		'prefer-object-has-own': 0,
		'es-x/no-array-prototype-at': 2,
		'es-x/no-global-this': 2,
		'es-x/no-object-fromentries': 2,
		'es-x/no-object-hasown': 2,
		'es-x/no-regexp-lookbehind-assertions': 2,
		'es-x/no-string-prototype-at': 2,
		'es-x/no-string-prototype-matchall': 2,
		'es-x/no-string-prototype-replaceall': 2,
	},
	settings: {
		...config.settings,
		'es-x': {
			aggressive: true,
		},
	},
};
