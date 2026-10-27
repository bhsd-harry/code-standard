import {jsDoc, node, extend, getOxlintConfig} from './eslint.js';

const config = getOxlintConfig(extend(
	'module',
	jsDoc,
	...node,
));

export default config;
