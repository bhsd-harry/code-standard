import type {ConfigData} from 'wikiparser-node/dist/base';

export interface MwConfig {
	readonly tags: Record<string, true>;
	tagModes: Record<string, string>;
	urlProtocols: string;
	functionSynonyms: [Record<string, string>, Record<string, string>];
	doubleUnderscore: [Record<string, unknown>, Record<string, unknown>];
	variableIDs?: string[];
	functionHooks?: string[];
	redirection?: string[];
}

export interface MagicWord {
	name: string;
	aliases: string[];
	'case-sensitive': boolean;
}
export type MagicRule = (word: MagicWord) => boolean;

declare interface Keywords {
	img: Record<string, string>;
	redirection: string[];
}

export const otherParserFunctions = new Set(['msg', 'raw', 'subst', 'safesubst']);

/**
 * 将魔术字信息转换为CodeMirror接受的设置
 * @param magicWords 完整魔术字列表
 * @param rule 过滤函数
 * @param flip 是否反向筛选对大小写敏感的魔术字
 */
export const getConfig = (magicWords: MagicWord[], rule: MagicRule, flip?: boolean): Record<string, string> => {
	const words = magicWords.filter(rule);
	return Object.fromEntries(
		(flip === undefined ? words : words.filter(({'case-sensitive': i}) => i !== flip))
			.flatMap(({aliases, name: n, 'case-sensitive': i}) => aliases.map(alias => ({
				alias: (i ? alias : alias.toLowerCase()).replace(/:$/u, ''),
				name: n,
			})))
			.map(({alias, name: n}) => [alias, n]),
	);
};

/**
 * 将MwConfig转换为Config
 * @param minConfig 基础Config
 * @param mwConfig MwConfig
 */
export const getParserConfig = (minConfig: ConfigData, mwConfig: MwConfig): ConfigData => {
	const {
			tags,
			doubleUnderscore,
			urlProtocols,
			functionSynonyms,
			variableIDs,
			functionHooks,
			redirection,
		} = mwConfig,
		[insensitive, sensitive] = functionSynonyms,
		behaviorSwitch = doubleUnderscore.map(
			(obj, i) => Object.entries(obj).map(([k, v]) => [
				k.slice(2, -2),
				i && typeof v === 'string' ? v.toUpperCase() : v,
			] as const),
		);
	for (const [k, v] of Object.entries(insensitive)) {
		if (k in sensitive) {
			delete insensitive[k];
		} else {
			insensitive[k] = v.toLowerCase();
		}
	}
	return {
		...minConfig,
		ext: Object.keys(tags),
		parserFunction: [{...insensitive}, {...sensitive, '=': '='}, [], []],
		doubleUnderscore: [
			...behaviorSwitch.map(entries => entries.map(([k]) => k)) as [string[], string[]],
			...behaviorSwitch.map(Object.fromEntries) as [Record<string, string>, Record<string, string>],
		],
		protocol: urlProtocols.replace(/\|\\?\/\\?\/$|\\(?=[:/])/gu, ''),
		...variableIDs && {variable: [...new Set([...variableIDs, '='])]},
		...functionHooks && {functionHook: [...new Set([...functionHooks.map(s => s.toLowerCase()), 'msgnw'])]},
		...redirection && {redirection: redirection.map(s => s.toLowerCase())},
	};
};

/**
 * 获取语言变体
 * @param variants 语言变体列表
 */
export const getVariants = (variants: {code: string}[] | undefined): string[] =>
	variants?.map(({code}) => code) ?? [];

/**
 * 获取图片和重定向关键字
 * @param magicwords 魔术字列表
 * @param web 是否用于网页
 */
export const getKeywords = (magicwords: MagicWord[], web?: boolean): Keywords => ({
	img: Object.fromEntries(
		magicwords.filter(({name: n}) => n.startsWith('img_') && n !== 'img_lossy')
			.flatMap(({name: n, aliases}) => {
				const k = web ? n : n.slice(4).replace(/_/gu, '-');
				return (n === 'img_alt' ? aliases.filter(alias => alias.includes('$1')) : aliases)
					.map(alias => [alias, k]);
			}),
	),
	redirection: magicwords.find(({name: n}) => n === 'redirect')!.aliases.map(s => s.toLowerCase()),
});
