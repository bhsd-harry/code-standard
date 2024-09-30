'use strict';

const config = require('./eslintrc.cjs');

module.exports = {
	...config,
	env: {
		...config.env,
		node: true,
	},
	extends: [
		...config.extends,
		'plugin:n/recommended-script',
	],
	rules: {
		...config.rules,
		'n/exports-style': [
			2,
			'module.exports',
		],
		'n/no-missing-import': 2,
		'n/no-missing-require': 2,
		'n/no-mixed-requires': 2,
		'n/no-new-require': 2,
		'n/no-path-concat': 2,
	},
	settings: {
		...config.settings,
		n: {
			tryExtensions: [
				'.js',
				'.json',
				'.ts',
			],
		},
	},
};