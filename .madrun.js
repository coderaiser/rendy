import {run} from 'madrun';

export default {
    'lint': () => 'putout .',
    'fix:lint': () => run('lint', '--fix'),
    'test': () => `tape 'test/**/*.js'`,
    'test:dts': () => 'check-dts',
    'coverage': () => 'c8 npm test',
    'report': () => 'c8 report --reporter=lcov',
};
