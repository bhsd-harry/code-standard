#!/usr/bin/env node
'use strict';

const fs = require('fs'),
	{devDependencies, version} = require('@bhsd/common/package.json'),
	json = require(`${process.cwd()}/package.json`);
const {name: n, dependencies, optionalDependencies} = json,
	others = {[n]: '', ...dependencies, ...optionalDependencies},
	dev = Object.fromEntries(
		Object.entries({...json.devDependencies, ...devDependencies}).filter(([k]) => !(k in others))
			.sort(([a], [b]) => a.localeCompare(b)),
	);
(dependencies && '@bhsd/common' in dependencies ? dependencies : dev)['@bhsd/common'] = `^${version}`;
json.devDependencies = dev;
fs.writeFileSync('package.json', `${JSON.stringify(json, null, '\t')}\n`);
