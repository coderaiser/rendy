(function() {
    'use strict';
    
    /*global describe, it */
    
    var fs      = require('fs'),
        should  = require('should'),
        rendy   = require('..');
    
    describe('rendy', function() {
        describe('render template with data', function() {
            it('should render template with given data', function() {
                var result = rendy('hello {{ word }}', {
                    word: 'world'
                });
                
                should(result).eql('hello world');
            });
            
            it('should use greedy regexp', function() {
                var result = rendy('hello {{ hello }} and {{ word }}', {});
                
                should(result).eql('hello  and ');
            });
        });
        
        describe('when not all parameters present', function() {
            it('no template, no data', function() {
                 should(function() {
                    rendy();
                }).throw();
            });
            
            it('template, no data', function() {
                 should(function() {
                    rendy('hello {{ word }}');
                }).throw();
            });
        });
        
        describe('used as global', function() {
            var fn;
            var context;
            
            beforeEach(function() {
                context = {};
            });
            it('should store rendy as global variable', function() {
                var code = fs.readFileSync(__dirname + '/../lib/rendy.js');
                var args = [
                    'exports',
                    'require',
                    'module'
                ];
                
                fn = Function(args, code);
                fn.call(context);
                
                context.rendy.should.be.a.Function;
            });
        });
    });
    
})();
