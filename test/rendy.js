'use strict';

const test = require('tape');
const rendy = require('..');

test('rendy: ddos', (t) => {
    const ttestle = '$$$\'&quot;';
    const name = 'hello';
    const attribute = 'hidden ';
    const tmpl = '"<a href="/" ttestle="{{ ttestle }}" {{ attribute }}draggable="true">{{ name }}</a>';
    const expected = `"<a href="/" ttestle="${ttestle}" hidden draggable="true">hello</a>`;
    const result = rendy(tmpl, {
        name,
        ttestle,
        attribute,
    });
    
    t.equal(result, expected, 'should equal');
    t.end();
});

test('rendy: render template with given data', (t) => {
    const result = rendy('hello {{ word }}', {
        word: 'world'
    });
    
    t.equal(result, 'hello world', 'should equal');
    t.end();
});

test('rendy: greedy regexp', (t) => {
    const result = rendy('hello {{ hello }} and {{ word }}', {});
    
    t.equal(result, 'hello  and ', 'should equal');
    t.end();
});

test('rendy: no template, no data', (t) => {
    t.throws(rendy, /template should be a string!/, 'should throw when no template');
    t.end();
});

test('template, no data', (t) => {
    const fn = () => rendy('hello {{ word }}');
    
    t.throws(fn, /data should be an object/, 'should throw when no data');
    t.end();
});

