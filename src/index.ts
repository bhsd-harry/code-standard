import type {ConfigData} from 'wikiparser-node';
import type {LanguageServiceBase} from 'wikiparser-node/extensions/typings';

declare interface Require {
	config(config: {paths?: Record<string, string>}): void;

	(modules: string[], ready: (exports: unknown) => unknown): void;
}

declare interface Obj {
	[x: string]: Obj | undefined;
}

export type RegexGetter<T = string> = (s: T) => RegExp;

declare type ConfigGetter = () => Promise<ConfigData>;

declare global {
	const define: unknown;
}

export const CDN = 'https://testingcf.jsdelivr.net';

const textarea = /* #__PURE__ */
	(() => typeof document === 'object' ? document.createElement('textarea') : undefined)();

/**
 * 解码HTML实体
 * @param str 要解码的字符串
 */
export const decodeHTML = (str: string): string => {
	textarea!.innerHTML = str;
	return textarea!.value;
};

/**
 * PHP的`rawurldecode`函数的JavaScript实现
 * @param str 要解码的字符串
 */
export const rawurldecode = (str: string): string =>
	decodeURIComponent(str.replace(/%(?![\da-f]{2})/giu, '%25'));

/**
 * 解码标题中的HTML实体和URL编码
 * @param title 标题
 */
export const normalizeTitle = (title: string): string => {
	const decoded = rawurldecode(title);
	return /[<>[\]|{}]/u.test(decoded) ? decoded : decodeHTML(decoded);
};

/**
 * 将0~1之间的数字转换为十六进制
 * @param d 0~1之间的数字
 */
export const numToHex = (d: number): string =>
	Math.round(d * 255).toString(16).padStart(2, '0');

const regex = /* #__PURE__ */ (() => {
	const hexColor = String.raw`#(?:[\da-f]{3,4}|(?:[\da-f]{2}){3,4})(?![\p{L}\p{N}_])`,
		rgbValue = String.raw`(?:\d*\.)?\d+%?`,
		hue = String.raw`(?:\d*\.)?\d+(?:deg|grad|rad|turn)?`,
		rgbColor = String.raw`rgba?\(\s*(?:${
			String.raw`${new Array(3).fill(rgbValue).join(String.raw`\s+`)}(?:\s*\/\s*${rgbValue})?`
		}|${
			String.raw`${new Array(3).fill(rgbValue).join(String.raw`\s*,\s*`)}(?:\s*,\s*${rgbValue})?`
		})\s*\)`,
		hslColor = String.raw`hsla?\(\s*(?:${
			String.raw`${hue}\s+${rgbValue}\s+${rgbValue}(?:\s*\/\s*${rgbValue})?`
		}|${
			String.raw`${hue}${String.raw`\s*,\s*(?:\d*\.)?\d+%`.repeat(2)}(?:\s*,\s*${rgbValue})?`
		})\s*\)`;
	return {
		full: new RegExp(String.raw`(^|[^\p{L}\p{N}_])(${hexColor}|${rgbColor}|${hslColor})`, 'giu'),
		rgb: new RegExp(String.raw`(^|[^\p{L}\p{N}_])(${hexColor}|${rgbColor})`, 'giu'),
	};
})();

/**
 * 包含颜色时断开字符串
 * @param str 字符串
 * @param hsl 是否包含 HSL
 */
export const splitColors = (str: string, hsl = true): [string, number, number, boolean][] => {
	const pieces: [string, number, number, boolean][] = [],
		re = regex[hsl ? 'full' : 'rgb'];
	re.lastIndex = 0;
	let mt = re.exec(str),
		lastIndex = 0;
	while (mt) {
		const index = mt.index + mt[1]!.length;
		if (index > lastIndex) {
			pieces.push([str.slice(lastIndex, index), lastIndex, index, false]);
		}
		({lastIndex} = re);
		pieces.push([mt[2]!, index, lastIndex, str[index - 1] !== '&' || !/^#\d+$/u.test(mt[2]!)]);
		mt = re.exec(str);
	}
	if (str.length > lastIndex) {
		pieces.push([str.slice(lastIndex), lastIndex, str.length, false]);
	}
	return pieces;
};

const loading = new Map<string, Promise<void>>();

/**
 * 使用传统方法加载脚本
 * @param src 脚本地址
 * @param globalConst 脚本全局变量名
 * @param amd 是否兼容 AMD
 */
export const loadScript = (src: string, globalConst: string, amd?: boolean): Promise<void> => {
	if (loading.has(src)) {
		return loading.get(src)!;
	}
	const promise = new Promise<void>(resolve => {
		const path = /^https?:\/\//iu.test(src) ? src : `${CDN}/${src}`;
		let obj: Obj | undefined = globalThis as unknown as Obj;
		for (const prop of globalConst.split('.')) {
			obj = obj?.[prop];
		}
		if (obj) {
			resolve();
		} else if (amd && typeof define === 'function' && 'amd' in define) {
			const requirejs = globalThis.require as unknown as Require;
			requirejs.config({paths: {[globalConst]: path}});
			requirejs([globalConst], (exports: unknown) => {
				Object.assign(globalThis, {[globalConst]: exports});
				resolve();
			});
		} else {
			const script = document.createElement('script');
			script.src = path;
			script.onload = (): void => {
				resolve();
			};
			document.head.append(script);
		}
	});
	loading.set(src, promise);
	return promise;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getObject = (key: string): any => JSON.parse(String(localStorage.getItem(key)));
export const setObject = (key: string, value: unknown): void => {
	localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 解析版本号
 * @param version 版本号
 */
const parseVersion = (version: string): [number, number, number?] =>
	version.split('.', 3).map(Number) as [number, number, number?];

/**
 * 比较版本号
 * @param version 版本号
 * @param baseVersion 基础版本号
 */
export const compareVersion = (version: string, baseVersion: string): boolean => {
	const [major, minor] = parseVersion(version),
		[baseMajor, baseMinor] = parseVersion(baseVersion);
	return major > baseMajor || major === baseMajor && minor >= baseMinor;
};

/**
 * 加载 I18N
 * @param url 下载地址
 * @param cur 当前版本号
 * @param languages 语言代码列表
 * @param acceptableLangs 可接受的语言代码列表
 * @param key 存储的键名
 * @param i18n 已存储的I18N对象
 * @throws `Error` 无法获取语言包
 */
export const setI18N = async (
	url: string,
	cur: string,
	languages: string[] | string,
	acceptableLangs: string[],
	key: string,
	i18n: Record<string, string> = getObject(key) ?? {},
): Promise<Record<string, string>> => {
	const {version, lang} = i18n,
		langs = Array.isArray(languages) ? languages : [languages];
	if (version === cur && langs.includes(lang!)) {
		return i18n;
	}
	for (const language of langs) {
		const l = language.toLowerCase();
		if (!acceptableLangs.includes(l)) {
			continue;
		}
		try {
			const res = await fetch(`${url}/${l}.json`);
			Object.assign(i18n, await res.json(), {version: cur, lang: language});
			setObject(key, i18n);
			return i18n;
		} catch {}
	}
	throw new Error(`Failed to fetch the localization for ${langs[0]}.`);
};

let configLoaded = false,
	i18nLoaded = false;

/**
 * 加载 wikiparse
 * @param getConfig 获取解析配置的函数
 * @param langs 语言代码
 * @param cdn CDN 地址
 */
export const getWikiparse = async (
	getConfig?: ConfigGetter,
	langs?: string | string[],
	cdn?: string,
): Promise<void> => {
	const dir = 'extensions/dist';
	let src = cdn || `npm/wikiparser-node/${dir}/base.min.js`;
	if (!src.endsWith('.js')) {
		src = `${src}${src.endsWith('/') ? '' : '/'}${dir}/base.js`;
	}
	await loadScript(src, 'wikiparse');
	await loadScript(`${wikiparse.CDN}/${dir}/lsp.js`, 'wikiparse.LanguageService');
	if (!configLoaded && typeof getConfig === 'function') {
		configLoaded = true;
		try {
			wikiparse.setConfig(await getConfig());
		} catch {}
	}
	if (!i18nLoaded && langs) {
		i18nLoaded = true;
		const key = 'wikiparse-i18n',
			{version} = wikiparse;
		try {
			// @ts-expect-error build-time constant
			wikiparse.setI18N(await setI18N(`${wikiparse.CDN}/i18n`, version, langs, $LANGS as string[], key));
		} catch {
			setObject(key, {version, lang: 'en'});
		}
	}
};

const lsps = new WeakMap<object, LanguageServiceBase>();

/**
 * 获取LSP
 * @param obj 关联对象
 * @param include 是否嵌入
 * @param getConfig 获取解析配置的函数
 * @param lang 语言代码
 */
export const getLSP = (
	obj: object,
	include?: boolean,
	getConfig?: ConfigGetter,
	lang?: string,
): LanguageServiceBase | undefined => {
	void getWikiparse(getConfig, lang);
	if (typeof wikiparse !== 'object' || !wikiparse.LanguageService || lsps.has(obj)) {
		return lsps.get(obj);
	}
	const lsp = new wikiparse.LanguageService(include);
	lsps.set(obj, lsp);
	return lsp;
};

/**
 * 清理内联样式中的`{`和`}`
 * @param style 内联样式
 */
export const sanitizeInlineStyle = (style: string): string =>
	style.replace(/[{}]/gu, p => p === '{' ? '｛' : '｝');

/**
 * 刷新屏幕输出
 * @param str 要输出的字符串
 */
export const refreshStdout = (str: string): void => {
	process.stdout.write(`\x1B[K\x1B[?7l${str}\x1B[?7h\r`);
};

/**
 * 缓存生成的正则表达式
 * @param f 生成正则表达式的函数
 */
/* eslint-disable jsdoc/require-jsdoc */
export function getRegex(f: RegexGetter): RegexGetter;
export function getRegex<T extends object>(f: RegexGetter<T>): RegexGetter<T>;
export function getRegex<T extends string | object = string>(f: RegexGetter<T>): RegexGetter<T> {
/* eslint-enable jsdoc/require-jsdoc */
	const map = new Map<T, RegExp>(),
		weakMap = new WeakMap<T & object, RegExp>();
	return s => {
		const regexp = typeof s === 'string' ? map : weakMap;
		if (regexp.has(s as T & object)) {
			const re = regexp.get(s as T & object)!;
			re.lastIndex = 0;
			return re;
		}
		const re = f(s);
		regexp.set(s as T & object, re);
		return re;
	};
}

/**
 * 缓存生成的正则表达式
 * @param f 生成正则表达式的函数
 */
export const getObjRegex = getRegex;
