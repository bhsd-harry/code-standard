import {jsDoc, node, extend} from './eslint.js';

export default extend(
	'module',
	jsDoc,
	...node,
);
