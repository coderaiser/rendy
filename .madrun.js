'use strict';

const {run} = require('madrun');

module.exports = {
    'lint': () => 'putout .',
    'fix:lint': () => run('lint', '--fix'),
    'test': () => `tape 'test/**/*.js'`,
    'test:dts': () => 'check-dts',
    'coverage': () => 'c8 npm test',
    'report': () => 'c8 report --reporter=text-lcov',
};
