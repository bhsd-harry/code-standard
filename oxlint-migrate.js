import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const [,, file, sub] = process.argv;
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
delete data.rules['unicorn/no-immediate-mutation'];
Object.assign(
	data,
	{
		$schema: path.relative(
			path.dirname(file),
			path.join(fileURLToPath(import.meta.resolve('oxlint')), '..', '..', 'configuration_schema.json'),
		),
	},
	Boolean(sub) || {
		options: {
			reportUnusedDisableDirectives: 'warn',
			respectEslintDisableDirectives: false,
		},
	},
);
fs.writeFileSync(file, JSON.stringify(data, null, '\t'), 'utf8');
