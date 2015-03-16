(function() {
    'use strict';
    
    /*global describe, it */
    
    var should  = require('should'),
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
    });
    
})();
