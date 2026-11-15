const isString = (a) => typeof a === 'string';
const {hasOwn} = Object;

export const rendy = (template, values, modifiers = null) => {
    check(template, values);
    
    const render = modifiers ? renderWithModifiers : renderPlain;
    
    return template.replace(/{{(.*?)}}/g, (match, inner) => render(inner, values, modifiers));
};

function check(template, values) {
    if (!isString(template))
        throw Error('template should be a string!');
    
    if (typeof values !== 'object')
        throw Error('values should be an object!');
}

function renderPlain(inner, values) {
    const [, name] = /^ (.*) $/.exec(inner) || [];
    
    return getOwn(values, name) ?? '';
}

function renderWithModifiers(inner, values, modifiers) {
    const [name, modifierName] = inner
        .replaceAll(' ', '')
        .split('|');
    
    const value = getOwn(values, name);
    
    if (!hasOwn(modifiers, modifierName))
        return value ?? '';
    
    return modifiers[modifierName](value) ?? '';
}

function getOwn(values, name) {
    if (hasOwn(values, name))
        return values[name];
}
