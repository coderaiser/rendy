'use strict';

const {tryCatch} = require('try-catch');
const {test} = require('supertape');
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

test('rendy: render template with given values', (t) => {
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

test('rendy: no template, no values', (t) => {
    const [error] = tryCatch(rendy);
    
    t.equal(error.message, 'template should be a string!', 'should throw when no template');
    t.end();
});

test('rendy: template, no values', (t) => {
    const [error] = tryCatch(rendy, 'hello {{ word }}');
    
    t.equal(error.message, 'values should be an object!', 'should throw when no data');
    t.end();
});

test('rendy: modifiers', (t) => {
    const values = {
        names: ['a', 'b', 'c'],
    };
    
    const modifiers = {
        implode: (a) => {
            return a.join(', ');
        },
    };
    
    const result = rendy('hello {{ names | implode }}', values, modifiers);
    const expected = 'hello a, b, c';
    
    t.equal(result, expected);
    t.end();
});

test('rendy: modifiers: not found', (t) => {
    const values = {
        names: ['a', 'b', 'c'],
    };
    
    const modifiers = {
        implode: (a) => {
            return a.join(', ');
        },
    };
    
    const result = rendy('hello {{ names | abc}}', values, modifiers);
    const expected = 'hello a,b,c';
    
    t.equal(result, expected);
    t.end();
});

test('rendy: modifiers: not used', (t) => {
    const values = {
        names: ['a', 'b', 'c'],
    };
    
    const modifiers = {
        implode: (a) => {
            return a.join(', ');
        },
    };
    
    const result = rendy('hello {{ names }}', values, modifiers);
    const expected = 'hello a,b,c';
    
    t.equal(result, expected);
    t.end();
});
