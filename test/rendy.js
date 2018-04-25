'use strict';

/*global describe, it */

const fs = require('fs');
const should = require('should');
const rendy = require('..');

it('rendy: ddos', () => {
    const title = '$$$\'&quot;';
    const name = 'hello';
    const attribute = 'hidden ';
    const tmpl = '"<a href="/" title="{{ title }}" {{ attribute }}draggable="true">{{ name }}</a>';
    const expected = `"<a href="/" title="${title}" hidden draggable="true">hello</a>`;
    const result = rendy(tmpl, {
        name,
        title,
        attribute,
    });
    
    should(result).eql(expected);
});

describe('render template with data', () => {
    it('should render template with given data', () => {
        const result = rendy('hello {{ word }}', {
            word: 'world'
        });
        
        should(result).eql('hello world');
    });
    
    it('should use greedy regexp', () => {
        const result = rendy('hello {{ hello }} and {{ word }}', {});
        
        should(result).eql('hello  and ');
    });
});

describe('when not all parameters present', () => {
    it('no template, no data', () => {
         should(() => {
            rendy();
        }).throw();
    });
    
    it('template, no data', () => {
         should(() => {
            rendy('hello {{ word }}');
        }).throw();
    });
});

describe('used as global', () => {
    let context;
    
    beforeEach(() => {
        context = {};
    });
    
    it('should store rendy as global constiable', () => {
        const code = fs.readFileSync(__dirname + '/../lib/rendy.js');
        const args = [
            'exports',
            'require',
            'module'
        ];
        
        const fn = Function(args, code);
        fn.call(context);
        
        context.rendy.should.be.a.Function;
    });
});

