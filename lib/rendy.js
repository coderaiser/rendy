'use strict';

const constant = (a) => () => a;

/**
 * render template with data
 *
 * @param templ
 * @param data
 */

module.exports = (templ, data) => {
    check(templ, data);
    
    let result = templ;
    
    const replace = (key) => {
        const name = '{{ ' + key + ' }}';
        const str = constant(data[key]);
        
        while (~result.indexOf(name))
            result = result.replace(name, str);
    };
    
    Object
        .keys(data)
        .forEach(replace);
    
    if (~result.indexOf('{{'))
        result = result.replace(/{{.*?}}/g, '');
    
    return result;
};

function check(templ, data) {
    if (typeof templ !== 'string')
        throw Error('template should be a string!');
    
    if (typeof data !== 'object')
        throw Error('data should be an object!');
}

