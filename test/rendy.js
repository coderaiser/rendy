import {tryCatch} from 'try-catch';
import {test} from 'supertape';
import currify from 'currify';
import {rendy} from '../lib/rendy.js';

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

test('rendy: modifiers: not used: curry', (t) => {
    const values = {
        names: ['a', 'b', 'c'],
    };
    
    const fn = currify(rendy);
    
    const result = fn('hello {{ names }}', values);
    const expected = 'hello a,b,c';
    
    t.equal(result, expected);
    t.end();
});

test('rendy: value containing placeholder is not re-scanned', (t) => {
    const result = rendy('hello {{ name }}', {
        name: 'a {{b}} c',
    });
    
    t.equal(result, 'hello a {{b}} c');
    t.end();
});

test('rendy: value referencing another key is inserted verbatim', (t) => {
    const result = rendy('{{ a }} / {{ b }}', {
        a: '{{ b }}',
        b: 'secret',
    });
    
    t.equal(result, '{{ b }} / secret');
    t.end();
});

test('rendy: 0 with modifiers', (t) => {
    const result = rendy('n={{ n }}', {
        n: 0,
    }, {});
    
    t.equal(result, 'n=0');
    t.end();
});

test('rendy: 0 without modifiers', (t) => {
    const result = rendy('n={{ n }}', {
        n: 0,
    });
    
    t.equal(result, 'n=0');
    t.end();
});
