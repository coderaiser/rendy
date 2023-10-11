# Rendy [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage][CoverageIMGURL]][CoverageURL]

Simple template engine compatible with [handlebars](http://handlebarsjs.com "Handlebars") and [mustache](https://mustache.github.io "Mustache").

## Install

![NPM\_INFO][NPM_INFO_IMG]

`npm i rendy`

## How to use?

```js
const rendy = require('rendy');
const tmpl = 'hello {{ who }}';
const who = 'world';

rendy(tmpl, {
    who,
});

// returns
'hello world';
```

## License

MIT

[NPM_INFO_IMG]: https://nodei.co/npm/rendy.png?downloads&&stars&&downloadRank "npm install rendy"
[NPMIMGURL]: https://img.shields.io/npm/v/rendy.svg?style=flat
[BuildStatusIMGURL]: https://img.shields.io/travis/coderaiser/rendy/master.svg?style=flat
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]: https://npmjs.org/package/rendy "npm"
[BuildStatusURL]: https://travis-ci.org/coderaiser/rendy "Build Status"
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[CoverageURL]: https://coveralls.io/github/coderaiser/rendy?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/rendy/badge.svg?branch=master&service=github
