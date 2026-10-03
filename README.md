# @bhsd/code-standard

[![npm version](https://badge.fury.io/js/@bhsd%2Fcode-standard.svg)](https://www.npmjs.com/package/@bhsd/code-standard)

## Command line interface for markdownlint

This package provides a command line interface for [markdownlint](https://www.npmjs.com/package/markdownlint).

```sh
npx myMarkdownlint [path]
```

The optional `path` argument specifies the directory to lint. If not provided,
the current working directory will be used.

If you want to use a specific configuration file, you can create a
`.markdownlint.json` file in the directory you are linting (`path` argument or
current working directory).

If you want to exclude certain files, you can create a `.markdownlintignore`
file in the same directory with the glob patterns to ignore one per line.
