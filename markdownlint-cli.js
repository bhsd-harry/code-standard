#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import {styleText} from 'util';
import {lint, readConfig} from 'markdownlint/sync';

const [,, cwd = ''] = process.argv;
if (cwd) {
	process.chdir(cwd);
}

const ignoreFile = '.markdownlintignore',
	configFile = '.markdownlint.json',
	exclude = fs.existsSync(ignoreFile)
		? fs.readFileSync(ignoreFile, 'utf8').split('\n').filter(Boolean)
		: ['node_modules/**'],
	files = fs.globSync('**/*.md', {exclude}),
	config = fs.existsSync(configFile) ? readConfig(configFile) : undefined,
	results = lint({files, config});
let nErr = 0;
for (const file in results) {
	const problems = results[file];
	if (problems.length === 0) {
		continue;
	}
	nErr += problems.length;
	console.error('\n%s', styleText('underline', path.join(cwd, file)));
	const maxLineChars = String(Math.max(...problems.map(({lineNumber}) => lineNumber))).length,
		maxMessageChars = Math.max(...problems.map(({ruleDescription: {length}}) => length));
	for (const {ruleNames, ruleDescription, lineNumber} of problems) {
		console.error(
			' %s  %s  %s  %s',
			styleText('dim', String(lineNumber).padStart(maxLineChars)),
			styleText('red', 'error'),
			ruleDescription.padEnd(maxMessageChars),
			styleText('dim', ruleNames.at(-1)),
		);
	}
}
if (nErr) {
	console.error(styleText(['red', 'bold'], '\n✖ %s\n'), `${nErr} error${nErr === 1 ? '' : 's'}`);
	process.exitCode = 1;
}
