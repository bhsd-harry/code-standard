/* eslint-disable jsdoc/require-jsdoc */
import {rules as recommended} from 'stylelint-config-recommended';
import type {PublicApi, Warning, Config} from 'stylelint';

/**
 * 使用Stylelint检查CSS代码
 * @param stylelint Stylelint实例
 * @param code CSS代码
 * @param additionalConfig 额外的规则
 * @param fix 是否修正
 */
export function styleLint(
	stylelint: PublicApi,
	code: string,
	additionalConfig?: Config | Config['rules'] | null,
	// @ts-expect-error required parameter
	fix: true,
): Promise<string>;
export function styleLint(
	stylelint: PublicApi,
	code: string,
	additionalConfig?: Config | Config['rules'] | null,
): Promise<Warning[]>;
export async function styleLint(
	stylelint: PublicApi,
	code: string,
	additionalConfig?: Config | Config['rules'] | null,
	fix?: true,
): Promise<string | Warning[]> {
	const isConfig = additionalConfig && ('extends' in additionalConfig || 'rules' in additionalConfig),
		additionalRules: Config['rules'] | null = isConfig ? additionalConfig.rules : additionalConfig,
		rules = isConfig && 'extends' in additionalConfig
			&& additionalConfig.extends !== 'stylelint-config-recommended'
			&& !(
				Array.isArray(additionalConfig.extends)
				&& additionalConfig.extends.includes('stylelint-config-recommended')
			)
			? additionalRules ?? {}
			: {...recommended, ...additionalRules},
		config: Config = {
			rules,
			computeEditInfo: true,
			fix: fix || false,
		};
	if (isConfig) {
		additionalConfig.rules = rules;
	}
	if (fix) {
		return (await stylelint.lint({code, config})).code!;
	}
	const [result] = (await stylelint.lint({code, config})).results;
	return result!.warnings.filter(({text}) => !text.startsWith('Unknown rule '));
}
