/* eslint-disable jsdoc/require-jsdoc */
import {rules} from 'stylelint-config-recommended';
import type {PublicApi, Warning} from 'stylelint';

/**
 * 使用Stylelint检查CSS代码
 * @param stylelint Stylelint实例
 * @param code CSS代码
 * @param additionalRules 额外的规则
 * @param fix 是否修正
 */
export function styleLint(
	stylelint: PublicApi,
	code: string,
	additionalRules?: Record<string, unknown>,
	// @ts-expect-error required parameter
	fix: true,
): Promise<string>;
export function styleLint(
	stylelint: PublicApi,
	code: string,
	additionalRules?: Record<string, unknown>,
): Promise<Warning[]>;
export async function styleLint(
	stylelint: PublicApi,
	code: string,
	additionalRules?: Record<string, unknown>,
	fix?: true,
): Promise<string | Warning[]> {
	const config = {
		rules: {...rules, ...additionalRules},
		computeEditInfo: true,
		fix: fix || false,
	};
	if (fix) {
		return (await stylelint.lint({code, config})).code!;
	}
	return (await stylelint.lint({code, config})).results.flatMap(({warnings}) => warnings)
		.filter(({text}) => !text.startsWith('Unknown rule '));
}
