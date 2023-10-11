'use strict';

const {keys} = Object;
const isString = (a) => typeof a === 'string';
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
    
    for (const key of keys(data)) {
        const name = `{{ ${key} }}`;
        const str = constant(data[key]);
        
        while (result.includes(name))
            result = result.replace(name, str);
    }
    
    if (result.includes('{{'))
        result = result.replace(/{{.*?}}/g, '');
    
    return result;
};

function check(templ, data) {
    if (!isString(templ))
        throw Error('template should be a string!');
    
    if (typeof data !== 'object')
        throw Error('data should be an object!');
}
