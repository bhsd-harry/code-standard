import {jsDoc, node, extend} from './eslint.js';

const config = extend(
	'module',
	jsDoc,
	...node,
);

export default config;
