import {rules} from 'stylelint-config-recommended';
import type {PublicApi, Warning} from 'stylelint';

/**
 * 使用Stylelint检查CSS代码
 * @param stylelint Stylelint实例
 * @param code CSS代码
 * @param additionalRules 额外的规则
 * @param browser 是否为浏览器环境
 */
export const styleLint = async (
	stylelint: PublicApi,
	code: string,
	additionalRules?: Record<string, unknown>,
	browser?: boolean,
): Promise<Warning[]> => {
	const config = {
		rules: {...rules, ...additionalRules},
	};
	if (browser) {
		delete config.rules['selector-type-no-unknown'];
	}
	return (await stylelint.lint({code, config})).results.flatMap(({warnings}) => warnings)
		.filter(({text}) => !text.startsWith('Unknown rule '));
};
