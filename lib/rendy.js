const isString = (a) => typeof a === 'string';
const {hasOwn} = Object;

export const rendy = (template, values, modifiers = null) => {
    check(template, values);
    
    return template.replace(/{{(.*?)}}/g, (match, inner) => {
        const [, value] = parseValue(match, inner, values, modifiers);
        
        return value;
    });
};

function check(template, values) {
    if (!isString(template))
        throw Error('template should be a string!');
    
    if (typeof values !== 'object')
        throw Error('values should be an object!');
}

function parseValue(key, inner, values, modifiers) {
    if (!modifiers) {
        const name = inner.slice(1, -1);
        const isKnown = inner === ` ${name} ` && hasOwn(values, name);
        
        return [key, isKnown ? values[name] : ''];
    }
    
    const preparedKey = inner.replaceAll(' ', '');
    
    if (!preparedKey.includes('|')) {
        const value = values[preparedKey];
        
        return [key, value ?? ''];
    }
    
    const [name, modifierName] = preparedKey.split('|');
    const fn = modifiers[modifierName];
    const currentValue = values[name];
    
    if (!fn)
        return [key, currentValue];
    
    return [key, fn(currentValue)];
}
