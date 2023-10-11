# Rendy [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage][CoverageIMGURL]][CoverageURL]

[NPM_INFO_IMG]: https://nodei.co/npm/rendy.png?downloads&&stars&&downloadRank "npm install rendy"
[NPMIMGURL]: https://img.shields.io/npm/v/rendy.svg?style=flat
[BuildStatusURL]: https://github.com/coderaiser/rendy/actions/workflows/nodejs.yml "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/rendy/actions/workflows/nodejs.yml/badge.svg
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]: https://npmjs.org/package/rendy "npm"
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[CoverageURL]: https://coveralls.io/github/coderaiser/rendy?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/rendy/badge.svg?branch=master&service=github

Simple template engine compatible with [handlebars](http://handlebarsjs.com "Handlebars") and [mustache](https://mustache.github.io "Mustache").

## Install

![NPM\_INFO][NPM_INFO_IMG]

`npm i rendy`

## How to use?

In **ESM**

```js
import rendy from 'rendy';
```

in **CommonJS**:

```js
const rendy = require('rendy');
```

### API

#### rendy(template: string, value: Values, modifiers?: Modifiers)

`Values` is:

```ts
type Values = {
    [key: string]: unknown;
};
type Modifiers = {
    [key: string]: (value: unknown) => string;
};
```

```js
rendy('hello {{ value }}', {
    value: 'world',
});

// returns
'hello world';

const values = {
    names: ['a', 'b', 'c'],
};

const modifiers = {
    implode: (a) => a.join(', '),
};

rendy('hello {{ names | implode }}', values, modifiers);
// returns
'hello a, b, c';
```

## License

MIT
