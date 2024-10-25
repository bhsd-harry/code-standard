'use strict';

const config = require('./eslintrc.browser.cjs');

module.exports = {
	...config,
	overrides: [
		...config.overrides,
		{
			files: '**/*.cjs',
			env: {
				node: true,
			},
		},
	],
};
