(function(global) {
    'use strict';
    
    if (typeof module === 'object' && module.exports)
        module.exports = rendy;
    else
        global.rendy = rendy;
    
    /**
     * render template with data
     *
     * @param templ
     * @param view
     */
    function rendy(templ, data) {
        var str, regExp, expr,
            result  = templ;
        
        check(templ, data);
        
        Object
            .keys(data)
            .forEach(function(param) {
                str     = data[param];
                expr    = '{{\\s' + param + '\\s}}';
                regExp  = RegExp(expr, 'g');
                result  = result.replace(regExp, str);
            });
        
        if (~result.indexOf('{{'))
            result = result.replace(/{{.*}}/g, '');
        
        return result;
    }
    
    function check(templ, data) {
        if (typeof templ !== 'string')
            throw(Error('template should be string!'));
        
        if (typeof data !== 'object')
            throw(Error('data should be object!'));
    }
})(this);
