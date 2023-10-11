type Values = {
    [index: string]: string;
};

declare function rendy(template: string, values: Values): string;
export default rendy;
