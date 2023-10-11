'use strict';

const tryCatch = require('try-catch');
const test = require('supertape');
const rendy = require('..');

test('rendy: ddos', (t) => {
    const ttestle = `$$$'&quot;`;
    const name = 'hello';
    const attribute = 'hidden ';
    const tmpl = '"<a href="/" ttestle="{{ ttestle }}" {{ attribute }}draggable="true">{{ name }}</a>';
    const expected = `"<a href="/" ttestle="${ttestle}" hidden draggable="true">hello</a>`;
    
    const result = rendy(tmpl, {
        name,
        ttestle,
        attribute,
    });
    
    t.equal(result, expected);
    t.end();
});

test('rendy: render template with given data', (t) => {
    const result = rendy('hello {{ word }}', {
        word: 'world',
    });
    
    t.equal(result, 'hello world');
    t.end();
});

test('rendy: greedy regexp', (t) => {
    const result = rendy('hello {{ hello }} and {{ word }}', {});
    
    t.equal(result, 'hello  and ');
    t.end();
});

test('rendy: no template, no data', (t) => {
    const [error] = tryCatch(rendy);
    
    t.equal(error.message, 'template should be a string!', 'should throw when no template');
    t.end();
});

test('rendy: template, no data', (t) => {
    const [error] = tryCatch(rendy, 'hello {{ word }}');
    
    t.equal(error.message, 'data should be an object!', 'should throw when no data');
    t.end();
});
