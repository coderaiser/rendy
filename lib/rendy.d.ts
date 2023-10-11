type Values = {
    [index: string]: unknown;
};
type Modifiers = {
    [index: string]: (value: unknown) => string;
};

declare function rendy(template: string, values: Values, modifiers?: Modifiers): string;
export default rendy;
