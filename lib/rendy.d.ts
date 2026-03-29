type Values = {
    [index: string]: unknown;
};
type Modifiers = {
    [index: string]: (value: unknown) => string;
};

export declare function rendy(template: string, values: Values, modifiers?: Modifiers): string;

