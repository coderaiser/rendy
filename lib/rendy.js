'use strict';

const isString = (a) => typeof a === 'string';
const constant = (a) => () => a;
const {keys} = Object;

module.exports = (template, values, modifiers) => {
    check(template, values);
    
    let result = template;
    
    const names = !modifiers ? keys(values) : template.match(/{{(.*?)}}/g);
    
    for (const key of names) {
        const [parsedKey, value] = parseValue(key, values, modifiers);
        const str = constant(value);
        
        while (result.includes(parsedKey))
            result = result.replace(parsedKey, str);
    }
    
    if (result.includes('{{'))
        result = result.replace(/{{.*?}}/g, '');
    
    return result;
};

function check(template, values) {
    if (!isString(template))
        throw Error('template should be a string!');
    
    if (typeof values !== 'object')
        throw Error('values should be an object!');
}

function parseValue(key, values, modifiers) {
    if (!modifiers)
        return [
            `{{ ${key} }}`,
            values[key],
        ];
    
    const preparedKey = key
        .replaceAll('{{', '')
        .replaceAll('}}', '')
        .replaceAll(' ', '');
    
    const value = values[preparedKey] || '';
    
    if (!preparedKey.includes('|'))
        return [key, value];
    
    const [name, modifierName] = preparedKey.split('|');
    const fn = modifiers[modifierName];
    const currentValue = values[name];
    
    if (!fn)
        return [key, currentValue];
    
    return [key, fn(currentValue)];
}
