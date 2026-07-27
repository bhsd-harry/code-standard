import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import promise from 'eslint-plugin-promise';
import regexp from 'eslint-plugin-regexp';
import unicorn from 'eslint-plugin-unicorn';
import jsdoc from 'eslint-plugin-jsdoc';
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments';
import jsonc from 'eslint-plugin-jsonc';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import n from 'eslint-plugin-n';
import esX from 'eslint-plugin-es-x';
import yml from 'eslint-plugin-yml';
import globals from 'globals';

const tsRecommended = typescriptEslint.configs['flat/recommended-type-checked'],
	files = ['**/*.ts'];
const off = (rules, ruleNames = []) => {
	const newRules = {...rules},
		offRules = [
			...ruleNames,
			'no-iterator-prototype-every',
			'no-iterator-prototype-filter',
			'no-iterator-prototype-find',
			'no-iterator-prototype-flatmap',
			'no-iterator-prototype-foreach',
			'no-iterator-prototype-map',
			'no-iterator-prototype-reduce',
			'no-iterator-prototype-some',
		];
	for (const ruleName of offRules) {
		const name = `es-x/${ruleName}`;
		if (!(name in newRules)) {
			throw new RangeError(`Rule ${name} does not exist!`);
		}
		delete newRules[name];
	}
	return newRules;
};
const getConfig = (rules, ecmaVersion) => ({
	languageOptions: {
		globals: globals.browser,
		...ecmaVersion && {ecmaVersion},
	},
	plugins: {'es-x': esX},
	rules,
	settings: {
		'es-x': {
			aggressive: true,
		},
	},
});
export const ignores = {
		ignores: [
			'**/dist/',
			'**/build/',
		],
	},
	unicornConfigs = {
		plugins: {unicorn},
		rules: {
			'unicorn/catch-error-name': [
				2,
				{
					name: 'e',
				},
			],
			'unicorn/class-reference-in-static-methods': 2,
			'unicorn/consistent-assert': 2,
			'unicorn/consistent-conditional-object-spread': 2,
			'unicorn/consistent-date-clone': 2,
			'unicorn/consistent-empty-array-spread': 2,
			'unicorn/consistent-existence-index-check': 2,
			'unicorn/consistent-export-decorator-position': 2,
			'unicorn/consistent-function-scoping': [
				2,
				{
					checkArrowFunctions: false,
				},
			],
			'unicorn/consistent-template-literal-escape': 2,
			'unicorn/default-export-style': 2,
			'unicorn/empty-brace-spaces': 2,
			'unicorn/error-message': 2,
			'unicorn/explicit-length-check': 2,
			'unicorn/explicit-timer-delay': 2,
			'unicorn/iteration-fallback-style': 2,
			'unicorn/new-for-builtins': 2,
			'unicorn/no-abusive-eslint-disable': 2,
			'unicorn/no-accessor-recursion': 2,
			'unicorn/no-array-callback-reference': 2,
			'unicorn/no-array-fill-with-reference-type': 2,
			'unicorn/no-boolean-sort-comparator': 2,
			'unicorn/no-for-each': 2,
			'unicorn/no-array-from-fill': 2,
			'unicorn/no-array-method-this-argument': 2,
			'unicorn/no-array-reduce': 2,
			'unicorn/no-await-in-promise-methods': 2,
			'unicorn/no-chained-comparison': 2,
			'unicorn/no-confusing-array-splice': 2,
			'unicorn/no-constant-zero-expression': 2,
			'unicorn/no-declarations-before-early-exit': 2,
			'unicorn/no-double-comparison': 2,
			'unicorn/no-duplicate-if-branches': 2,
			'unicorn/no-duplicate-logical-operands': 2,
			'unicorn/no-duplicate-loops': 2,
			'unicorn/no-duplicate-set-values': 2,
			'unicorn/no-exports-in-scripts': 2,
			'unicorn/no-immediate-mutation': 2,
			'unicorn/no-incorrect-query-selector': 2,
			'unicorn/no-incorrect-template-string-interpolation': 2,
			'unicorn/no-instanceof-builtins': 2,
			'unicorn/no-invalid-character-comparison': 2,
			'unicorn/no-invalid-fetch-options': 2,
			'unicorn/no-invalid-remove-event-listener': 2,
			'unicorn/no-invalid-well-known-symbol-methods': 2,
			'unicorn/no-late-current-target-access': 2,
			'unicorn/no-late-event-control': 2,
			'unicorn/no-lonely-if': 2,
			'unicorn/no-loop-iterable-mutation': 2,
			'unicorn/no-mismatched-map-key': 2,
			'unicorn/no-misrefactored-assignment': 2,
			'unicorn/no-named-default': 2,
			'unicorn/no-negated-comparison': [
				2,
				{
					checkLogicalExpressions: true,
				},
			],
			'unicorn/no-negated-condition': 2,
			'unicorn/no-negation-in-equality-check': 2,
			'unicorn/no-new-array': 2,
			'unicorn/no-object-as-default-parameter': 2,
			'unicorn/no-object-methods-with-collections': 2,
			'unicorn/no-redundant-comparison': 2,
			'unicorn/no-return-array-push': 2,
			'unicorn/no-selector-as-dom-name': 2,
			'unicorn/no-single-promise-in-promise-methods': 2,
			'unicorn/no-static-only-class': 2,
			'unicorn/no-subtraction-comparison': 2,
			'unicorn/no-this-assignment': 2,
			'unicorn/no-top-level-side-effects': 2,
			'unicorn/no-typeof-undefined': 2,
			'unicorn/no-uncalled-method': 2,
			'unicorn/no-undeclared-class-members': 2,
			'unicorn/no-unnecessary-array-flat-depth': 2,
			'unicorn/no-unnecessary-array-splice-count': 2,
			'unicorn/no-unnecessary-await': 2,
			'unicorn/no-unnecessary-boolean-comparison': 2,
			'unicorn/no-unnecessary-fetch-options': 2,
			'unicorn/no-unnecessary-global-this': 2,
			'unicorn/no-unnecessary-splice': 2,
			'unicorn/no-unsafe-buffer-conversion': 2,
			'unicorn/no-unsafe-promise-all-settled-values': 2,
			'unicorn/no-unsafe-string-replacement': 2,
			'unicorn/no-unused-array-method-return': 2,
			'unicorn/no-unused-properties': 2,
			'unicorn/no-useless-boolean-cast': 2,
			'unicorn/no-useless-coercion': 2,
			'unicorn/no-useless-collection-argument': 2,
			'unicorn/no-useless-compound-assignment': 2,
			'unicorn/no-useless-concat': 2,
			'unicorn/no-useless-continue': 2,
			'unicorn/no-useless-delete-check': 2,
			'unicorn/no-useless-fallback-in-spread': 2,
			'unicorn/no-useless-length-check': 2,
			'unicorn/no-useless-logical-operand': 2,
			'unicorn/no-useless-override': 2,
			'unicorn/no-useless-promise-resolve-reject': 2,
			'unicorn/no-useless-recursion': 2,
			'unicorn/no-useless-spread': 2,
			'unicorn/no-useless-switch-case': 2,
			'unicorn/no-useless-template-literals': 2,
			'unicorn/number-literal-case': 2,
			'unicorn/numeric-separators-style': 2,
			'unicorn/operator-assignment': 2,
			'unicorn/prefer-add-event-listener-options': 2,
			'unicorn/prefer-array-find': 2,
			'unicorn/prefer-array-flat': 2,
			'unicorn/prefer-array-flat-map': 2,
			'unicorn/prefer-array-from-map': 2,
			'unicorn/prefer-array-index-of': 2,
			'unicorn/prefer-array-iterable-methods': 2,
			'unicorn/prefer-array-last-methods': 2,
			'unicorn/prefer-array-some': 2,
			'unicorn/prefer-at': 2,
			'unicorn/prefer-await': 2,
			'unicorn/prefer-bigint-literals': 2,
			'unicorn/prefer-block-statement-over-iife': 2,
			'unicorn/prefer-boolean-return': 2,
			'unicorn/prefer-class-fields': 2,
			'unicorn/prefer-classlist-toggle': 2,
			'unicorn/prefer-code-point': 2,
			'unicorn/prefer-continue': [
				2,
				{
					maximumStatements: 2,
				},
			],
			'unicorn/prefer-default-parameters': 2,
			'unicorn/prefer-direct-iteration': 2,
			'unicorn/prefer-dispose': 2,
			'unicorn/prefer-else-if': 2,
			'unicorn/prefer-export-from': [
				2,
				{
					checkUsedVariables: false,
				},
			],
			'unicorn/prefer-flat-math-min-max': 2,
			'unicorn/prefer-global-this': 2,
			'unicorn/prefer-has-check': 2,
			'unicorn/prefer-hoisting-branch-code': 2,
			'unicorn/prefer-import-meta-properties': 2,
			'unicorn/prefer-includes': 2,
			'unicorn/prefer-includes-over-repeated-comparisons': 2,
			'unicorn/prefer-iterable-in-constructor': 2,
			'unicorn/prefer-keyboard-event-key': 2,
			'unicorn/prefer-location-assign': 2,
			'unicorn/prefer-logical-operator-over-ternary': 2,
			'unicorn/prefer-map-from-entries': 2,
			'unicorn/prefer-math-abs': 2,
			'unicorn/prefer-math-constants': 2,
			'unicorn/prefer-math-min-max': 2,
			'unicorn/prefer-minimal-ternary': [
				2,
				{
					checkVaryingBase: true,
					checkComputedMemberAccess: true,
				},
			],
			'unicorn/prefer-native-coercion-functions': 2,
			'unicorn/prefer-negative-index': 2,
			'unicorn/prefer-number-is-safe-integer': 2,
			'unicorn/prefer-object-define-properties': 2,
			'unicorn/prefer-object-destructuring-defaults': 2,
			'unicorn/prefer-object-from-entries': 2,
			'unicorn/prefer-object-iterable-methods': 2,
			'unicorn/prefer-optional-catch-binding': 2,
			'unicorn/prefer-private-class-fields': 2,
			'unicorn/prefer-prototype-methods': 2,
			'unicorn/prefer-reflect-apply': 2,
			'unicorn/prefer-regexp-test': 2,
			'unicorn/prefer-simple-condition-first': 2,
			'unicorn/prefer-simple-sort-comparator': 2,
			'unicorn/prefer-simplified-conditions': 2,
			'unicorn/prefer-single-array-predicate': 2,
			'unicorn/prefer-single-call': 2,
			'unicorn/prefer-single-object-destructuring': 2,
			'unicorn/prefer-single-replace': 2,
			'unicorn/prefer-smaller-scope': 2,
			'unicorn/prefer-split-limit': 2,
			'unicorn/prefer-spread': 2,
			'unicorn/prefer-string-pad-start-end': 2,
			'unicorn/prefer-string-raw': 2,
			'unicorn/prefer-string-repeat': 2,
			'unicorn/prefer-string-replace-all': 2,
			'unicorn/prefer-string-starts-ends-with': 2,
			'unicorn/prefer-switch': 2,
			'unicorn/prefer-ternary': 2,
			'unicorn/prefer-toggle-attribute': 2,
			'unicorn/prefer-uint8array-base64': 2,
			'unicorn/prefer-url-href': 2,
			'unicorn/prefer-url-search-parameters': 2,
			'unicorn/prefer-while-loop-condition': 2,
			'unicorn/require-css-escape': 2,
			'unicorn/require-module-attributes': 2,
			'unicorn/require-array-sort-compare': 2,
			'unicorn/require-number-to-fixed-digits-argument': 2,
			'unicorn/require-passive-events': 2,
			'unicorn/require-proxy-trap-boolean-return': 2,
			'unicorn/single-line-block-comment-style': [
				2,
				'single-line',
			],
			'unicorn/switch-case-braces': [
				2,
				'avoid',
			],
			'unicorn/switch-case-break-position': 2,
			'unicorn/text-encoding-identifier-case': 2,
			'unicorn/throw-new-error': 2,
		},
	},
	unicornForNode = {
		'unicorn/no-array-reverse': 2,
		'unicorn/no-array-sort': 2,
		'unicorn/no-array-splice': 2,
		'unicorn/prefer-structured-clone': 2,
	},
	general = [
		js.configs.recommended,
		promise.configs['flat/recommended'],
		regexp.configs['flat/recommended'],
		unicornConfigs,
		{
			languageOptions: {
				ecmaVersion: 'latest',
			},
			rules: {
				'array-callback-return': 2,
				'no-cond-assign': [
					2,
					'always',
				],
				'no-constant-binary-expression': 2,
				'no-constructor-return': 2,
				'no-fallthrough': 2,
				'no-inner-declarations': [
					2,
					'both',
				],
				'no-irregular-whitespace': [
					2,
					{
						skipStrings: false,
					},
				],
				'no-promise-executor-return': 2,
				'no-self-compare': 2,
				'no-template-curly-in-string': 2,
				'no-unassigned-vars': 2,
				'no-undef': [
					2,
					{
						typeof: true,
					},
				],
				'no-unmodified-loop-condition': 2,
				'no-unreachable-loop': 2,
				'no-unsafe-negation': [
					2,
					{
						enforceForOrderingRelations: true,
					},
				],
				'no-unsafe-optional-chaining': [
					2,
					{
						disallowArithmeticOperators: true,
					},
				],
				'no-unused-private-class-members': 2,
				'no-unused-vars': [
					2,
					{
						args: 'all',
						argsIgnorePattern: '^_+$',
						caughtErrors: 'all',
						ignoreRestSiblings: true,
					},
				],
				'no-use-before-define': [
					2,
					{
						functions: false,
						variables: false,
					},
				],
				'no-useless-assignment': 2,
				'require-atomic-updates': [
					2,
					{
						allowProperties: true,
					},
				],
				'use-isnan': [
					2,
					{
						enforceForIndexOf: true,
					},
				],
				'valid-typeof': [
					2,
					{
						requireStringLiterals: true,
					},
				],
				'accessor-pairs': 2,
				'arrow-body-style': 2,
				'block-scoped-var': 2,
				camelcase: 2,
				'class-methods-use-this': 2,
				'consistent-return': 2,
				curly: 2,
				'default-case': 2,
				'default-case-last': 2,
				'default-param-last': 2,
				'dot-notation': 2,
				eqeqeq: 2,
				'func-name-matching': [
					2,
					{
						considerPropertyDescriptor: true,
					},
				],
				'func-names': [
					2,
					'never',
				],
				'func-style': 2,
				'grouped-accessor-pairs': [
					2,
					'getBeforeSet',
				],
				'logical-assignment-operators': [
					2,
					'always',
					{
						enforceForIfStatements: true,
					},
				],
				'new-cap': 2,
				'no-alert': 2,
				'no-array-constructor': 2,
				'no-bitwise': 2,
				'no-caller': 2,
				'no-else-return': 2,
				'no-empty': [
					2,
					{
						allowEmptyCatch: true,
					},
				],
				'no-empty-function': [
					2,
					{
						allow: ['arrowFunctions'],
					},
				],
				'no-empty-static-block': 2,
				'no-eval': 2,
				'no-extend-native': 2,
				'no-extra-bind': 2,
				'no-extra-boolean-cast': [
					2,
					{
						enforceForLogicalOperands: true,
					},
				],
				'no-implicit-coercion': 2,
				'no-implicit-globals': 2,
				'no-implied-eval': 2,
				'no-invalid-this': [
					2,
					{
						capIsConstructor: false,
					},
				],
				'no-lone-blocks': 2,
				'no-lonely-if': 2,
				'no-loop-func': 2,
				'no-multi-assign': 2,
				'no-multi-str': 2,
				'no-nested-ternary': 2,
				'no-new': 2,
				'no-new-func': 2,
				'no-new-object': 2,
				'no-new-wrappers': 2,
				'no-octal-escape': 2,
				'no-param-reassign': 2,
				'no-return-assign': [
					2,
					'always',
				],
				'no-return-await': 2,
				'no-script-url': 2,
				'no-sequences': [
					2,
					{
						allowInParentheses: false,
					},
				],
				'no-shadow': [
					2,
					{
						builtinGlobals: true,
					},
				],
				'no-throw-literal': 2,
				'no-undef-init': 2,
				'no-underscore-dangle': [
					2,
					{
						allow: [
							'_',
							'__',
						],
						enforceInMethodNames: true,
						enforceInClassFields: true,
						allowInArrayDestructuring: false,
						allowInObjectDestructuring: false,
						allowFunctionParams: false,
					},
				],
				'no-unneeded-ternary': [
					2,
					{
						defaultAssignment: false,
					},
				],
				'no-unused-expressions': 2,
				'no-useless-call': 2,
				'no-useless-computed-key': [
					2,
					{
						enforceForClassMembers: true,
					},
				],
				'no-useless-concat': 2,
				'no-useless-constructor': 2,
				'no-useless-return': 2,
				'no-var': 2,
				'no-void': [
					2,
					{
						allowAsStatement: true,
					},
				],
				'object-shorthand': 2,
				'prefer-arrow-callback': 2,
				'prefer-const': 2,
				'prefer-destructuring': [
					2,
					{
						VariableDeclarator: {
							array: true,
							object: true,
						},
						AssignmentExpression: {
							array: true,
							object: true,
						},
					},
				],
				'prefer-exponentiation-operator': 2,
				'prefer-numeric-literals': 2,
				'prefer-object-has-own': 2,
				'prefer-object-spread': 2,
				'prefer-regex-literals': [
					2,
					{
						disallowRedundantWrapping: true,
					},
				],
				'prefer-rest-params': 2,
				'prefer-spread': 2,
				'prefer-template': 2,
				'require-await': 2,
				'require-unicode-regexp': 2,
				strict: 2,
				'symbol-description': 2,
				'vars-on-top': 2,
				yoda: 2,
				'promise/always-return': [
					2,
					{
						ignoreLastCallback: true,
					},
				],
				'promise/catch-or-return': [
					2,
					{
						allowThen: true,
					},
				],
				'promise/no-multiple-resolved': 2,
				'promise/prefer-await-to-then': 2,
				'promise/spec-only': 2,
				'regexp/no-dupe-disjunctions': [
					2,
					{
						report: 'interesting',
					},
				],
				'regexp/no-misleading-capturing-group': [
					2,
					{
						reportBacktrackingEnds: false,
					},
				],
				'regexp/no-super-linear-move': 2,
				'regexp/no-octal': 2,
				'regexp/no-standalone-backslash': 2,
				'regexp/no-useless-character-class': [
					2,
					{
						ignores: [],
					},
				],
				'regexp/prefer-escape-replacement-dollar-char': 2,
				'regexp/prefer-quantifier': 2,
				'regexp/prefer-regexp-exec': 2,
				'regexp/prefer-regexp-test': 2,
				'regexp/hexadecimal-escape': 2,
				'regexp/letter-case': [
					2,
					{
						unicodeEscape: 'uppercase',
						hexadecimalEscape: 'uppercase',
						controlEscape: 'uppercase',
					},
				],
				'regexp/prefer-character-class': [
					2,
					{
						minAlternatives: 2,
					},
				],
				'regexp/prefer-lookaround': 2,
				'regexp/unicode-property': 2,
			},
		},
		{
			plugins: {'@stylistic': stylistic},
			rules: {
				'@stylistic/array-bracket-newline': [
					2,
					{
						multiline: true,
					},
				],
				'@stylistic/array-bracket-spacing': 2,
				'@stylistic/array-element-newline': [
					2,
					'consistent',
				],
				'@stylistic/arrow-parens': [
					2,
					'as-needed',
				],
				'@stylistic/arrow-spacing': 2,
				'@stylistic/block-spacing': [
					2,
					'never',
				],
				'@stylistic/brace-style': 2,
				'@stylistic/comma-dangle': [
					2,
					'always-multiline',
				],
				'@stylistic/comma-spacing': 2,
				'@stylistic/comma-style': 2,
				'@stylistic/computed-property-spacing': 2,
				'@stylistic/dot-location': [
					2,
					'property',
				],
				'@stylistic/eol-last': 2,
				'@stylistic/function-call-argument-newline': [
					2,
					'consistent',
				],
				'@stylistic/function-call-spacing': 2,
				'@stylistic/function-paren-newline': [
					2,
					'multiline-arguments',
				],
				'@stylistic/indent': [
					2,
					'tab',
					{
						SwitchCase: 1,
					},
				],
				'@stylistic/indent-binary-ops': [
					2,
					'tab',
				],
				'@stylistic/key-spacing': 2,
				'@stylistic/keyword-spacing': 2,
				'@stylistic/linebreak-style': 2,
				'@stylistic/lines-around-comment': [
					2,
					{
						allowBlockStart: true,
						ignorePattern: String.raw`^(\* @| c8 ignore )`,
					},
				],
				'@stylistic/lines-between-class-members': [
					2,
					'always',
					{
						exceptAfterSingleLine: true,
					},
				],
				'@stylistic/max-len': [
					2,
					{
						code: 120,
						ignoreRegExpLiterals: true,
					},
				],
				'@stylistic/multiline-comment-style': [
					2,
					'separate-lines',
				],
				'@stylistic/multiline-ternary': [
					2,
					'always-multiline',
				],
				'@stylistic/new-parens': 2,
				'@stylistic/newline-per-chained-call': [
					2,
					{
						ignoreChainWithDepth: 4,
					},
				],
				'@stylistic/no-extra-parens': [
					2,
					'all',
					{
						allowParensAfterCommentPattern: '@type',
					},
				],
				'@stylistic/no-extra-semi': 2,
				'@stylistic/no-floating-decimal': 2,
				'@stylistic/no-mixed-spaces-and-tabs': 2,
				'@stylistic/no-multi-spaces': [
					2,
					{
						exceptions: {},
					},
				],
				'@stylistic/no-multiple-empty-lines': [
					2,
					{
						max: 1,
						maxBOF: 0,
					},
				],
				'@stylistic/no-tabs': [
					2,
					{
						allowIndentationTabs: true,
					},
				],
				'@stylistic/no-trailing-spaces': 2,
				'@stylistic/no-whitespace-before-property': 2,
				'@stylistic/object-curly-newline': [
					2,
					{
						multiline: true,
						consistent: true,
					},
				],
				'@stylistic/object-curly-spacing': 2,
				'@stylistic/object-property-newline': [
					2,
					{
						allowAllPropertiesOnSameLine: true,
					},
				],
				'@stylistic/one-var-declaration-per-line': 2,
				'@stylistic/operator-linebreak': [
					2,
					'before',
					{
						overrides: {
							'=': 'after',
						},
					},
				],
				'@stylistic/padded-blocks': [
					2,
					'never',
				],
				'@stylistic/quote-props': [
					2,
					'as-needed',
				],
				'@stylistic/quotes': [
					2,
					'single',
					{
						allowTemplateLiterals: 'avoidEscape',
						avoidEscape: true,
					},
				],
				'@stylistic/rest-spread-spacing': 2,
				'@stylistic/semi': 2,
				'@stylistic/semi-spacing': 2,
				'@stylistic/semi-style': 2,
				'@stylistic/space-before-blocks': 2,
				'@stylistic/space-before-function-paren': [
					2,
					{
						anonymous: 'never',
						named: 'never',
						asyncArrow: 'always',
					},
				],
				'@stylistic/space-in-parens': 2,
				'@stylistic/space-infix-ops': 2,
				'@stylistic/space-unary-ops': 2,
				'@stylistic/spaced-comment': 2,
				'@stylistic/switch-colon-spacing': 2,
				'@stylistic/template-curly-spacing': 2,
				'@stylistic/wrap-iife': [
					2,
					'inside',
				],
			},
		},
		{
			plugins: {'@eslint-community/eslint-comments': eslintComments},
			rules: {
				...eslintComments.configs.recommended.rules,
				'@eslint-community/eslint-comments/disable-enable-pair': [
					2,
					{
						allowWholeFile: true,
					},
				],
			},
		},
	],
	jsDoc = {
		plugins: {jsdoc},
		rules: {
			'jsdoc/check-alignment': 1,
			'jsdoc/check-indentation': [
				1,
				{
					excludeTags: ['description'],
				},
			],
			'jsdoc/check-param-names': [
				1,
				{
					disableMissingParamChecks: true,
				},
			],
			'jsdoc/check-tag-names': 1,
			'jsdoc/check-types': 1,
			'jsdoc/multiline-blocks': 1,
			'jsdoc/no-bad-blocks': [
				1,
				{
					preventAllMultiAsteriskBlocks: true,
				},
			],
			'jsdoc/no-multi-asterisks': 1,
			'jsdoc/require-asterisk-prefix': 1,
			'jsdoc/require-description': [
				1,
				{
					exemptedBy: [
						'license',
						'type',
					],
					checkConstructors: false,
					checkSetters: false,
				},
			],
			'jsdoc/require-hyphen-before-param-description': [
				1,
				'never',
			],
			'jsdoc/require-jsdoc': [
				1,
				{
					contexts: [
						'FunctionDeclaration:not(TSDeclareFunction + FunctionDeclaration)',
						'TSDeclareFunction:not(TSDeclareFunction + TSDeclareFunction)',
						'MethodDefinition:not('
						+ 'MethodDefinition:has(TSEmptyBodyFunctionExpression) + MethodDefinition,'
						+ "[kind='get'] + [kind='set'],"
						+ '[override=true]'
						+ ')',
					],
					exemptEmptyConstructors: true,
					checkGetters: true,
					checkSetters: 'no-getter',
				},
			],
			'jsdoc/require-param-description': 1,
			'jsdoc/require-param-name': 1,
			'jsdoc/require-param': [
				1,
				{
					checkConstructors: false,
				},
			],
			'jsdoc/require-throws': 1,
		},
		settings: {
			jsdoc: {
				tagNamePreference: {
					augments: 'extends',
				},
				ignorePrivate: true,
			},
		},
	},
	noUnicorn = Object.fromEntries(Object.keys({...unicornConfigs.rules, ...unicornForNode}).map(rule => [rule, 0])),
	json = [
		...jsonc.configs['recommended-with-json'],
		{
			files: ['**/*.json'],
			rules: {
				...noUnicorn,
				'jsonc/array-bracket-newline': [
					2,
					{
						minItems: 1,
					},
				],
				'jsonc/array-bracket-spacing': 2,
				'jsonc/array-element-newline': [
					2,
					'always',
				],
				'jsonc/comma-style': 2,
				'jsonc/indent': [
					2,
					'tab',
				],
				'jsonc/key-spacing': 2,
				'jsonc/no-octal-escape': 2,
				'jsonc/object-curly-newline': [
					2,
					{
						minProperties: 1,
					},
				],
				'jsonc/object-curly-spacing': 2,
				'jsonc/object-property-newline': [
					2,
					{
						allowAllPropertiesOnSameLine: false,
					},
				],
				'@stylistic/max-len': 0,
			},
		},
	],
	yaml = [
		...yml.configs.standard,
		{
			files: ['**/*.yaml', '**/*.yml'],
			rules: {
				...noUnicorn,
				'yml/quotes': [
					2,
					{
						prefer: 'single',
					},
				],
				'@stylistic/lines-around-comment': 0,
				'@stylistic/max-len': 0,
			},
		},
	],
	ts = [
		...tsRecommended,
		{
			languageOptions: {
				parserOptions: {
					projectService: true,
				},
			},
			rules: {
				'class-methods-use-this': 0,
				'@typescript-eslint/class-methods-use-this': [
					2,
					{
						ignoreOverrideMethods: true,
					},
				],
				'default-param-last': 0,
				'@typescript-eslint/default-param-last': 2,
				'dot-notation': 0,
				'@typescript-eslint/dot-notation': [
					2,
					{
						allowIndexSignaturePropertyAccess: true,
					},
				],
				'no-empty-function': 0,
				'@typescript-eslint/no-empty-function': [
					2,
					{
						allow: ['arrowFunctions'],
					},
				],
				'no-invalid-this': 0,
				'@typescript-eslint/no-invalid-this': [
					2,
					{
						capIsConstructor: false,
					},
				],
				'no-loop-func': 0,
				'@typescript-eslint/no-loop-func': 2,
				'no-redeclare': 0,
				'@typescript-eslint/no-redeclare': 2,
				'no-shadow': 0,
				'@typescript-eslint/no-shadow': [
					2,
					{
						builtinGlobals: true,
					},
				],
				'no-unused-private-class-members': 0,
				'@typescript-eslint/no-unused-private-class-members': 2,
				'no-use-before-define': 0,
				'@typescript-eslint/no-use-before-define': [
					2,
					{
						functions: false,
						variables: false,
					},
				],
				'no-useless-constructor': 0,
				'@typescript-eslint/no-useless-constructor': 2,
				'prefer-destructuring': 0,
				'@typescript-eslint/prefer-destructuring': [
					2,
					{
						VariableDeclarator: {
							array: true,
							object: true,
						},
						AssignmentExpression: {
							array: true,
							object: true,
						},
					},
				],
				'unicorn/prefer-string-starts-ends-with': 0,
				'@typescript-eslint/prefer-string-starts-ends-with': 2,
				'@typescript-eslint/consistent-generic-constructors': 2,
				'@typescript-eslint/consistent-indexed-object-style': 2,
				'@typescript-eslint/consistent-type-assertions': 2,
				'@typescript-eslint/consistent-type-definitions': 2,
				'@typescript-eslint/consistent-type-exports': 2,
				'@typescript-eslint/consistent-type-imports': [
					2,
					{
						disallowTypeAnnotations: false,
					},
				],
				'@typescript-eslint/explicit-function-return-type': [
					2,
					{
						allowIIFEs: true,
					},
				],
				'@typescript-eslint/method-signature-style': [
					2,
					'method',
				],
				'@typescript-eslint/no-confusing-non-null-assertion': 2,
				'@typescript-eslint/no-confusing-void-expression': 2,
				'@typescript-eslint/no-dupe-class-members': 2,
				'@typescript-eslint/no-empty-object-type': [
					2,
					{
						allowInterfaces: 'with-single-extends',
					},
				],
				'@typescript-eslint/no-explicit-any': [
					2,
					{
						ignoreRestArgs: true,
					},
				],
				'@typescript-eslint/no-floating-promises': [
					2,
					{
						ignoreIIFE: true,
					},
				],
				'@typescript-eslint/no-invalid-void-type': [
					2,
					{
						allowAsThisParameter: true,
					},
				],
				'@typescript-eslint/no-misused-spread': [
					2,
					{
						allow: [
							{
								from: 'lib',
								name: 'string',
							},
						],
					},
				],
				'@typescript-eslint/no-namespace': [
					2,
					{
						allowDeclarations: true,
					},
				],
				'@typescript-eslint/no-non-null-asserted-nullish-coalescing': 2,
				'@typescript-eslint/no-require-imports': [
					2,
					{
						allow: [String.raw`.+\.json$`],
					},
				],
				'@typescript-eslint/no-this-alias': [
					2,
					{
						allowedNames: ['self'],
					},
				],
				'@typescript-eslint/no-unnecessary-boolean-literal-compare': 2,
				'@typescript-eslint/no-unnecessary-condition': [
					2,
					{
						allowConstantLoopConditions: true,
					},
				],
				'@typescript-eslint/no-unnecessary-qualifier': 2,
				'@typescript-eslint/no-unsafe-assignment': 0,
				'@typescript-eslint/no-unsafe-call': 0,
				'@typescript-eslint/no-unsafe-return': 0,
				'@typescript-eslint/no-useless-default-assignment': 2,
				'@typescript-eslint/no-useless-empty-export': 2,
				'@typescript-eslint/no-unused-vars': [
					2,
					{
						args: 'all',
						argsIgnorePattern: '^_+$',
						caughtErrors: 'all',
						ignoreRestSiblings: true,
					},
				],
				'@typescript-eslint/no-var-requires': 0,
				'@typescript-eslint/non-nullable-type-assertion-style': 2,
				'@typescript-eslint/prefer-for-of': 2,
				'@typescript-eslint/prefer-reduce-type-parameter': 2,
				'@typescript-eslint/prefer-return-this-type': 2,
				'@typescript-eslint/related-getter-setter-pairs': 2,
				'@typescript-eslint/strict-void-return': 2,
				'@typescript-eslint/switch-exhaustiveness-check': [
					2,
					{
						considerDefaultExhaustiveForUnions: true,
					},
				],
				'@typescript-eslint/unified-signatures': 2,
				'func-style': 0,
				'@stylistic/member-delimiter-style': [
					2,
					{
						singleline: {
							delimiter: 'comma',
						},
					},
				],
				'@stylistic/type-annotation-spacing': [
					2,
					{
						before: false,
						after: true,
						overrides: {
							arrow: 'ignore',
						},
					},
				],
				'@stylistic/type-generic-spacing': 2,
				'@stylistic/type-named-tuple-spacing': 2,
				'jsdoc/check-types': 0,
				'unicorn/no-array-callback-reference': 0,
			},
		},
	].map(obj => ({files, ...obj})),
	node = [
		n.configs['flat/recommended-script'],
		{
			files: [
				'**/*.mjs',
				'**/*.ts',
			],
			languageOptions: {
				sourceType: 'module',
			},
		},
		{
			rules: {
				...unicornForNode,
				'n/exports-style': [
					2,
					'module.exports',
				],
				'n/no-missing-import': [
					2,
					{
						ignoreTypeImport: true,
					},
				],
				'n/no-mixed-requires': 2,
				'n/no-new-require': 2,
				'n/no-path-concat': 2,
				'n/no-unsupported-features/node-builtins': [
					2,
					{
						allowExperimental: true,
					},
				],
			},
			settings: {
				n: {
					tryExtensions: [
						'.js',
						'.json',
						'.ts',
					],
				},
			},
		},
	],
	browser = getConfig({
		'es-x/no-array-fromasync': 2,
		'es-x/no-array-prototype-toreversed': 2,
		'es-x/no-array-prototype-tosorted': 2,
		'es-x/no-array-prototype-tospliced': 2,
		'es-x/no-array-prototype-with': 2,
		'es-x/no-date-prototype-totemporalinstant': 2,
		'es-x/no-error-iserror': 2,
		'es-x/no-iterator': 2,
		'es-x/no-iterator-concat': 2,
		'es-x/no-iterator-prototype-drop': 2,
		'es-x/no-iterator-prototype-take': 2,
		'es-x/no-iterator-prototype-toarray': 2,
		'es-x/no-iterator-zip': 2,
		'es-x/no-iterator-zipkeyed': 2,
		'es-x/no-map-groupby': 2,
		'es-x/no-map-prototype-getorinsert': 2,
		'es-x/no-map-prototype-getorinsertcomputed': 2,
		'es-x/no-math-f16round': 2,
		'es-x/no-math-sumprecise': 2,
		'es-x/no-object-groupby': 2,
		'es-x/no-promise-try': 2,
		'es-x/no-promise-withresolvers': 2,
		'es-x/no-regexp-duplicate-named-capturing-groups': 2,
		'es-x/no-regexp-escape': 2,
		'es-x/no-regexp-modifiers': 2,
		'es-x/no-regexp-v-flag': 2,
		'es-x/no-set-prototype-difference': 2,
		'es-x/no-set-prototype-intersection': 2,
		'es-x/no-set-prototype-isdisjointfrom': 2,
		'es-x/no-set-prototype-issubsetof': 2,
		'es-x/no-set-prototype-issupersetof': 2,
		'es-x/no-set-prototype-symmetricdifference': 2,
		'es-x/no-set-prototype-union': 2,
		'es-x/no-string-prototype-iswellformed': 2,
		'es-x/no-string-prototype-towellformed': 2,
		'es-x/no-symbol-asyncdispose': 2,
		'es-x/no-symbol-dispose': 2,
		'es-x/no-temporal': 2,
		'es-x/no-weakmap-prototype-getorinsert': 2,
		'es-x/no-weakmap-prototype-getorinsertcomputed': 2,
	}),
	browserES10 = getConfig({
		...off(esX.configs['flat/restrict-to-es2019'].rules, [
			'no-class-instance-fields',
			'no-class-private-fields',
			'no-class-private-methods',
			'no-class-static-block',
			'no-class-static-fields',
			'no-global-this',
			'no-logical-assignment-operators',
			'no-numeric-separators',
			'no-nullish-coalescing-operators',
			'no-optional-chaining',
			'no-private-in',
			'no-trailing-dynamic-import-commas',
		]),
		'es-x/no-regexp-lookbehind-assertions': 2,
		'unicorn/prefer-array-last-methods': 0,
		'unicorn/prefer-at': 0,
		'unicorn/prefer-bigint-literals': 0,
		'unicorn/prefer-object-from-entries': 0,
		'unicorn/prefer-string-replace-all': 0,
	}),
	dist = getConfig(off(
		esX.configs['flat/restrict-to-es2022'].rules,
		['no-array-prototype-findlast-findlastindex'],
	)),
	distES10 = getConfig({
		...off(esX.configs['flat/restrict-to-es2019'].rules, ['no-global-this']),
		'es-x/no-regexp-lookbehind-assertions': 2,
	}, 10);

/**
 * 添加ESLint配置项
 * @param  {...import('eslint').Linter.Config} args ESLint配置项
 * @throws `TypeError` 不支持传入配置数组
 * @throws `RangeError` 未知的配置项类型
 */
export const extend = (...args) => {
	if (args.some(arg => Array.isArray(arg))) {
		throw new TypeError('只支持传入单个配置对象，禁止传入配置数组！');
	}
	const isModule = Number(args.includes('module')),
		moreIgnores = args.filter(({files: f, ignores: i}) => !f && i),
		moreGeneral = args.filter(({files: f, rules, plugins}) => !f && (rules || plugins)),
		moreFiles = args.filter(({files: f}) => f);
	if (isModule + moreIgnores.length + moreGeneral.length + moreFiles.length !== args.length) {
		throw new RangeError('传入的配置项只能是忽略项、通用规则项或文件规则项三种之一！');
	}
	return [
		ignores,
		...moreIgnores,
		...general,
		...moreGeneral,
		...json,
		...yaml,
		...ts,
		...isModule
			? [
				{
					files: ['**/*.js'],
					languageOptions: {
						sourceType: 'module',
					},
				},
			]
			: [],
		...moreFiles,
	];
};

export default extend(jsDoc);
