'use strict';

const {run} = require('madrun');

module.exports = {
    'lint': () => 'putout lib test .madrun.js',
    'fix:lint': () => run('lint', '--fix'),
    'test': () => 'tape \'test/**/*.js\'',
    'coverage': () => 'nyc npm test',
    'report': () => 'nyc report --reporter=text-lcov | coveralls',
};

