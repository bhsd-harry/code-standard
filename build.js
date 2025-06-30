/* eslint-env node */
'use strict';

const fs = require('fs'),
	path = require('path'),
	esbuild = require('esbuild');
const langs = fs.readdirSync(
	path.join(require.resolve('wikiparser-node'), '..', '..', 'i18n'),
).map(file => file.slice(0, -5));

const /** @type {esbuild.BuildOptions} */ options = {
	entryPoints: fs.readdirSync('src/').map(file => path.join('src', file)),
	charset: 'utf8',
	target: 'es2024',
	outdir: 'dist',
	define: {
		$LANGS: JSON.stringify(langs),
	},
	logLevel: 'info',
};

esbuild.buildSync({
	...options,
	format: 'cjs',
});
esbuild.buildSync({
	...options,
	format: 'esm',
	outExtension: {'.js': '.mjs'},
});
