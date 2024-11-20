#!/usr/bin/env node
'use strict';

const fs = require('fs'),
	{devDependencies, version} = require('@bhsd/common/package.json'),
	json = require(`${process.cwd()}/package.json`);

json.devDependencies = Object.fromEntries(
	[...Object.entries({...devDependencies, ...json.devDependencies, '@bhsd/common': `^${version}`})]
		.sort(([a], [b]) => a.localeCompare(b)),
);
fs.writeFileSync('package.json', `${JSON.stringify(json, null, '\t')}\n`);
