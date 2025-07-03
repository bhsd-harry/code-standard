'use strict';

const config = require('./eslintrc.cjs');

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
		'es-x/no-array-prototype-findlast-findlastindex': 2,
		'es-x/no-array-prototype-toreversed': 2,
		'es-x/no-array-prototype-tosorted': 2,
		'es-x/no-array-prototype-tospliced': 2,
		'es-x/no-array-prototype-with': 2,
		'es-x/no-error-cause': 2,
		'es-x/no-map-groupby': 2,
		'es-x/no-math-f16round': 2,
		'es-x/no-object-groupby': 2,
		'es-x/no-object-hasown': 2,
		'es-x/no-promise-any': 2,
		'es-x/no-promise-try': 2,
		'es-x/no-promise-withresolvers': 2,
		'es-x/no-regexp-d-flag': 2,
		'es-x/no-regexp-escape': 2,
		'es-x/no-regexp-lookbehind-assertions': 2,
		'es-x/no-regexp-v-flag': 2,
		'es-x/no-set-prototype-difference': 2,
		'es-x/no-set-prototype-intersection': 2,
		'es-x/no-set-prototype-isdisjointfrom': 2,
		'es-x/no-set-prototype-issubsetof': 2,
		'es-x/no-set-prototype-issupersetof': 2,
		'es-x/no-set-prototype-symmetricdifference': 2,
		'es-x/no-set-prototype-union': 2,
		'es-x/no-string-prototype-at': 2,
		'es-x/no-string-prototype-iswellformed': 2,
		'es-x/no-string-prototype-replaceall': 2,
		'es-x/no-string-prototype-towellformed': 2,
	},
	settings: {
		...config.settings,
		'es-x': {
			aggressive: true,
		},
	},
};
