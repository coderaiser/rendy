# Rendy [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage][CoverageIMGURL]][CoverageURL]

Simple template engine compatible with [handlebars](http://handlebarsjs.com "Handlebars") and [mustache](https://mustache.github.io "Mustache").

## Install

![NPM_INFO][NPM_INFO_IMG]

`npm i rendy`

## How to use?

```js
const rendy = require('rendy');
const tmpl = 'hello {{ who }}';
const who = 'world';

rendy(tmpl, {
    who
});
// returns
'hello world'
```

## Environments

In old `node.js` environments that not fully supports `es2015`, `rendy` can be used with:

```js
var rendy = require('rendy/legacy');
```

## License

MIT

[NPM_INFO_IMG]:             https://nodei.co/npm/rendy.png?downloads&&stars&&downloadRank "npm install rendy"
[NPMIMGURL]:                https://img.shields.io/npm/v/rendy.svg?style=flat
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/rendy/master.svg?style=flat
[DependencyStatusIMGURL]:   https://img.shields.io/gemnasium/coderaiser/rendy.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]:                   https://npmjs.org/package/rendy "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/rendy  "Build Status"
[DependencyStatusURL]:      https://gemnasium.com/coderaiser/rendy "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"

[CoverageURL]:              https://coveralls.io/github/coderaiser/rendy?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/rendy/badge.svg?branch=master&service=github

