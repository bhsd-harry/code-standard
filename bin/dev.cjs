#!/usr/bin/env node
'use strict';

const fs = require('fs'),
	{devDependencies, version} = require('@bhsd/common/package.json'),
	json = require(`${process.cwd()}/package.json`);
const {dependencies} = json,
	dev = Object.fromEntries(
		[...Object.entries({...devDependencies, ...json.devDependencies})].sort(([a], [b]) => a.localeCompare(b)),
	);
('@bhsd/common' in dependencies ? dependencies : dev)['@bhsd/common'] = `^${version}`;
json.devDependencies = dev;
fs.writeFileSync('package.json', `${JSON.stringify(json, null, '\t')}\n`);
