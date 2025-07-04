'use strict';

module.exports = {
	root: true,
	env: {
		es2024: true,
	},
	plugins: [
		'@stylistic',
		'promise',
		'regexp',
		'unicorn',
		'jsdoc',
	],
	extends: [
		'eslint:recommended',
		'plugin:promise/recommended',
		'plugin:regexp/recommended',
		'plugin:eslint-comments/recommended',
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	ignorePatterns: [
		'dist/',
		'build/',
	],
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
		'guard-for-in': 2,
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
		'operator-assignment': 2,
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
		radix: [
			2,
			'as-needed',
		],
		'require-await': 2,
		'require-unicode-regexp': 2,
		strict: 2,
		'symbol-description': 2,
		'vars-on-top': 2,
		yoda: 2,
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
				ignorePattern: String.raw`^\* @`,
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
		'regexp/no-contradiction-with-assertion': 2,
		'regexp/no-dupe-disjunctions': [
			2,
			{
				report: 'interesting',
			},
		],
		'regexp/no-empty-character-class': 2,
		'regexp/no-misleading-capturing-group': [
			2,
			{
				reportBacktrackingEnds: false,
			},
		],
		'regexp/no-misleading-unicode-character': 2,
		'regexp/no-missing-g-flag': 2,
		'regexp/no-super-linear-backtracking': 2,
		'regexp/no-super-linear-move': 2,
		'regexp/no-extra-lookaround-assertions': 2,
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
		'regexp/use-ignore-case': 2,
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
		'regexp/prefer-lookaround': [
			2,
			{
				lookbehind: false,
			},
		],
		'regexp/unicode-property': 2,
		'unicorn/catch-error-name': [
			2,
			{
				name: 'e',
			},
		],
		'unicorn/consistent-existence-index-check': 2,
		'unicorn/consistent-function-scoping': [
			2,
			{
				checkArrowFunctions: false,
			},
		],
		'unicorn/empty-brace-spaces': 2,
		'unicorn/error-message': 2,
		'unicorn/explicit-length-check': 2,
		'unicorn/new-for-builtins': 2,
		'unicorn/no-abusive-eslint-disable': 2,
		'unicorn/no-array-for-each': 2,
		'unicorn/no-array-method-this-argument': 2,
		'unicorn/no-array-push-push': 2,
		'unicorn/no-array-reduce': 2,
		'unicorn/no-await-in-promise-methods': 2,
		'unicorn/no-instanceof-array': 2,
		'unicorn/no-invalid-remove-event-listener': 2,
		'unicorn/no-lonely-if': 2,
		'unicorn/no-negated-condition': 2,
		'unicorn/no-negation-in-equality-check': 2,
		'unicorn/no-object-as-default-parameter': 2,
		'unicorn/no-single-promise-in-promise-methods': 2,
		'unicorn/no-static-only-class': 2,
		'unicorn/no-this-assignment': 2,
		'unicorn/no-typeof-undefined': [
			2,
			{
				checkGlobalVariables: true,
			},
		],
		'unicorn/no-unreadable-iife': 2,
		'unicorn/no-unused-properties': 2,
		'unicorn/no-useless-fallback-in-spread': 2,
		'unicorn/no-useless-length-check': 2,
		'unicorn/no-useless-spread': 2,
		'unicorn/no-useless-switch-case': 2,
		'unicorn/number-literal-case': 2,
		'unicorn/numeric-separators-style': 2,
		'unicorn/prefer-array-find': 2,
		'unicorn/prefer-array-flat': 2,
		'unicorn/prefer-array-flat-map': 2,
		'unicorn/prefer-array-index-of': 2,
		'unicorn/prefer-array-some': 2,
		'unicorn/prefer-code-point': 2,
		'unicorn/prefer-default-parameters': 2,
		'unicorn/prefer-global-this': 2,
		'unicorn/prefer-includes': 2,
		'unicorn/prefer-keyboard-event-key': 2,
		'unicorn/prefer-logical-operator-over-ternary': 2,
		'unicorn/prefer-math-min-max': 2,
		'unicorn/prefer-native-coercion-functions': 2,
		'unicorn/prefer-negative-index': 2,
		'unicorn/prefer-optional-catch-binding': 2,
		'unicorn/prefer-prototype-methods': 2,
		'unicorn/prefer-spread': 2,
		'unicorn/prefer-string-raw': 2,
		'unicorn/prefer-string-starts-ends-with': 2,
		'unicorn/prefer-switch': 2,
		'unicorn/prefer-ternary': 2,
		'unicorn/switch-case-braces': [
			2,
			'avoid',
		],
		'unicorn/text-encoding-identifier-case': 2,
		'unicorn/throw-new-error': 2,
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
		'eslint-comments/disable-enable-pair': [
			2,
			{
				allowWholeFile: true,
			},
		],
	},
	overrides: [
		{
			files: '**/*.json',
			parser: 'eslint-plugin-json-es',
			extends: ['plugin:eslint-plugin-json-es/recommended'],
			rules: {
				'@stylistic/array-bracket-newline': [
					2,
					{
						minItems: 1,
					},
				],
				'@stylistic/array-element-newline': [
					2,
					'always',
				],
				'@stylistic/comma-dangle': 0,
				'@stylistic/max-len': 0,
				'@stylistic/no-multiple-empty-lines': [
					2,
					{
						max: 0,
					},
				],
				'@stylistic/object-curly-newline': [
					2,
					{
						minProperties: 1,
					},
				],
				'@stylistic/object-property-newline': [
					2,
					{
						allowAllPropertiesOnSameLine: false,
					},
				],
				'@stylistic/quote-props': 0,
				'@stylistic/quotes': 0,
				strict: 0,
				'unicorn/prefer-string-raw': 0,
				'unicorn/numeric-separators-style': 0,
			},
		},
		{
			files: '**/*.ts',
			parser: '@typescript-eslint/parser',
			parserOptions: {
				ecmaVersion: 'latest',
				project: './tsconfig.json',
			},
			plugins: ['@typescript-eslint'],
			extends: [
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
			],
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
				'no-dupe-class-members': 0,
				'@typescript-eslint/no-dupe-class-members': 2,
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
				'no-throw-literal': 0,
				'@typescript-eslint/only-throw-error': 2,
				'no-unused-expressions': 0,
				'@typescript-eslint/no-unused-expressions': 2,
				'no-unused-vars': 0,
				'@typescript-eslint/no-unused-vars': [
					2,
					{
						args: 'all',
						argsIgnorePattern: '^_+$',
						caughtErrors: 'all',
						ignoreRestSiblings: true,
					},
				],
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
				'require-await': 0,
				'@typescript-eslint/require-await': 2,
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
				'@typescript-eslint/no-duplicate-type-constituents': 2,
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
				'@typescript-eslint/no-misused-spread': 2,
				'@typescript-eslint/no-namespace': [
					2,
					{
						allowDeclarations: true,
					},
				],
				'@typescript-eslint/no-non-null-asserted-nullish-coalescing': 2,
				'@typescript-eslint/no-redundant-type-constituents': 2,
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
				'@typescript-eslint/no-useless-empty-export': 2,
				'@typescript-eslint/no-var-requires': 0,
				'@typescript-eslint/non-nullable-type-assertion-style': 2,
				'@typescript-eslint/prefer-for-of': 2,
				'@typescript-eslint/prefer-reduce-type-parameter': 2,
				'@typescript-eslint/prefer-return-this-type': 2,
				'@typescript-eslint/related-getter-setter-pairs': 2,
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
							arrow: {
								before: true,
							},
						},
					},
				],
				'@stylistic/type-generic-spacing': 2,
				'@stylistic/type-named-tuple-spacing': 2,
				'jsdoc/check-types': 0,
			},
		},
	],
	settings: {
		jsdoc: {
			tagNamePreference: {
				augments: 'extends',
			},
			ignorePrivate: true,
		},
	},
};
