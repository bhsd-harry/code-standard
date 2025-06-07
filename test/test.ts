import fs from 'fs';
import assert from 'assert';
import {performance as perf} from 'perf_hooks';
import {refreshStdout} from '../src/index';

declare interface MediaWikiPage {
	readonly pageid: number;
	readonly title: string;
	readonly ns: number;
	readonly revisions?: {
		readonly content: string;
		readonly contentmodel: string;
	}[];
}
declare interface MediaWikiResponse {
	readonly query: {
		readonly pages: MediaWikiPage[];
	};
	readonly continue?: Record<string, string>;
}
export interface SimplePage extends Pick<MediaWikiPage, 'pageid' | 'title' | 'ns'> {
	readonly content: string;
}
export interface Test {
	desc: string;
	wikitext?: string;
	parsed?: string;
	html?: string;
	print?: string;
	render?: string;
}
declare type TestResult = Pick<Test, 'desc' | 'wikitext' | 'parsed'>;

const apis = [
	['维基百科', 'https://zh.wikipedia.org/w'],
	['Wikipedia', 'https://en.wikipedia.org/w'],
	['ウィキペディア', 'https://ja.wikipedia.org/w'],
] as const;

let c: Record<string, string> | undefined;

/**
 * 获取最近更改的页面源代码
 * @param url api.php网址
 * @param site 站点名称
 * @param grclimit 页面数上限
 */
export const getPages = async (url: string, site?: string, grclimit = 'max'): Promise<SimplePage[]> => {
	const qs = {
			action: 'query',
			format: 'json',
			formatversion: '2',
			errorformat: 'plaintext',
			generator: 'recentchanges',
			grcnamespace: site === 'MediaWiki' ? '0|10|12|100|102|104|106' : '0|10',
			grclimit,
			grctype: 'edit|new',
			grctoponly: '1',
			prop: 'revisions',
			rvprop: 'contentmodel|content',
			...c,
		},
		response: MediaWikiResponse = await (await fetch(`${url}?${String(new URLSearchParams(qs))}`)).json();
	c = response.continue; // eslint-disable-line require-atomic-updates
	return response.query.pages.map(({pageid, title, ns, revisions}) => ({
		pageid,
		title,
		ns,
		content: revisions?.[0]?.contentmodel === 'wikitext' && revisions[0].content,
	})).filter((page): page is SimplePage => page.content !== false);
};

/** 重置请求 */
export const reset = (): void => {
	c = undefined;
};

/**
 * 执行解析测试
 * @param parse 解析函数
 * @param retry 重试次数
 * @param grclimit 页面数上限
 */
export const execute = async (parse: (wikitext: string) => unknown, retry = 10, grclimit?: string): Promise<void> => {
	const failures = new Map<string, number>();
	for (const [site, url] of apis) {
		console.log(`开始检查${site}：`);
		let worst: {title: string, duration: number} | undefined;
		reset();
		try {
			let failed = 0,
				i = 0;
			for (let j = 0; j < retry; j++) {
				for (const {content, title} of await getPages(`${url}/api.php`, site, grclimit)) {
					refreshStdout(`${i++} ${title}`);
					try {
						const start = perf.now();
						parse(content);
						const duration = perf.now() - start;
						if (!worst || duration > worst.duration) {
							worst = {title, duration};
						}
					} catch (e) {
						console.error(`\n解析 ${title} 页面时出错！`, e);
						failed++;
					}
				}
			}
			if (failed) {
				failures.set(site, failed);
			}
			console.log(`\n最耗时页面：${worst!.title} (${worst!.duration.toFixed(3)}ms)`);
		} catch (e) {
			console.error(`访问${site}的API端口时出错！`, e);
		}
	}
	if (failures.size > 0) {
		let total = 0;
		for (const [site, failed] of failures) {
			console.error(`${site}：${failed} 个页面解析失败！`);
			total += failed;
		}
		throw new Error(`共有 ${total} 个页面解析失败！`);
	}
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const tests: Test[] = require('wikiparser-node/test/parserTests.json');

const split = (test?: TestResult): string[] | undefined =>
	test?.parsed?.split(/(?<=<\/>)(?!$)|(?<!^)(?=<\w)/u);

export const mochaTest = (
	results: unknown,
	parse: (wikitext: string) => string,
	beforeFn?: Mocha.Func | Mocha.AsyncFunc,
): void => {
	describe('Parser tests', () => {
		for (let i = tests.length - 1; i >= 0; i--) {
			const test = tests[i]!,
				{wikitext, desc} = test;
			if (wikitext) {
				it(desc, () => {
					try {
						delete test.html;
						delete test.print;
						delete test.render;
						test.parsed = parse(wikitext);
						assert.deepStrictEqual(
							split(test),
							split((results as TestResult[]).find(({desc: d}) => d === desc)),
						);
					} catch (e) {
						if (!(e instanceof assert.AssertionError)) {
							tests.splice(i, 1);
						}
						if (e instanceof Error) {
							Object.assign(e, {cause: {message: `\n${wikitext}`}});
						}
						throw e;
					}
				});
			}
		}
		if (beforeFn) {
			before(beforeFn);
		}
		after(() => {
			fs.writeFileSync(
				'test/parserTests.json',
				`${JSON.stringify(tests, null, '\t')}\n`,
			);
		});
	});
};
