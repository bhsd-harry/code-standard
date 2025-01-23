export const CDN = 'https://testingcf.jsdelivr.net';

declare interface Require {
	config(config: {paths?: Record<string, string>}): void;

	(modules: string[], ready: (exports: unknown) => unknown): void;
}

declare interface Obj {
	[x: string]: Obj | undefined;
}

declare global {
	const define: unknown;
}

let textarea: HTMLTextAreaElement;
if (typeof document === 'object') {
	textarea = document.createElement('textarea');
}

/**
 * 解码HTML实体
 * @param str 要解码的字符串
 */
export const decodeHTML = (str: string): string => {
	textarea.innerHTML = str;
	return textarea.value;
};

/**
 * PHP的`rawurldecode`函数的JavaScript实现
 * @param str 要解码的字符串
 */
export const rawurldecode = (str: string): string => decodeURIComponent(str.replace(/%(?![\da-f]{2})/giu, '%25'));

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
export const numToHex = (d: number): string => Math.round(d * 255).toString(16).padStart(2, '0');

/**
 * 包含颜色时断开字符串
 * @param str 字符串
 * @param hsl 是否包含 HSL
 */
export const splitColors = (str: string, hsl = true): [string, number, number, boolean][] => {
	const hexColor = String.raw`#(?:[\da-f]{3,4}|(?:[\da-f]{2}){3,4})(?![\p{L}\d_])`,
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
		})\s*\)`,
		reFull = new RegExp(String.raw`(^|[^\p{L}\d_])(${hexColor}|${rgbColor}|${hslColor})`, 'giu'),
		reRGB = new RegExp(String.raw`(^|[^\p{L}\d_])(${hexColor}|${rgbColor})`, 'giu'),
		pieces: [string, number, number, boolean][] = [],
		re = hsl ? reFull : reRGB;
	re.lastIndex = 0;
	let mt = re.exec(str),
		lastIndex = 0;
	while (mt) {
		const index = mt.index + mt[1]!.length;
		if (index > lastIndex) {
			pieces.push([str.slice(lastIndex, index), lastIndex, index, false]);
		}
		({lastIndex} = re);
		pieces.push([mt[2]!, index, lastIndex, str.charAt(index - 1) !== '&' || !/^#\d+$/u.test(mt[2]!)]);
		mt = re.exec(str);
	}
	if (str.length > lastIndex) {
		pieces.push([str.slice(lastIndex), lastIndex, str.length, false]);
	}
	return pieces;
};

/**
 * 使用传统方法加载脚本
 * @param src 脚本地址
 * @param globalConst 脚本全局变量名
 * @param amd 是否兼容 AMD
 */
export const loadScript = (src: string, globalConst: string, amd?: boolean): Promise<void> => new Promise(resolve => {
	const path = `${CDN}/${src}`;
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
