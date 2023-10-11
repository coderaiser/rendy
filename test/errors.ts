import rendy from '..';

// THROWS Expected 2-3 arguments, but got 0
rendy();
// THROWS Expected 2-3 arguments, but got 1.
rendy('hello');
// THROWS Argument of type 'number' is not assignable to parameter of type 'string'.
rendy(5, 3);
// THROWS Argument of type 'number' is not assignable to parameter of type 'Values'
rendy('hello', 3);

rendy('hello {{ value }}', {
    value: 'world',
});

rendy('hello', {
    values: [1, 2, 3],
});

// THROWS Argument of type 'never[]' is not assignable to parameter of type 'Modifiers'
rendy('hello', {}, []);

rendy('hello', {}, {
    // THROWS Type 'string' is not assignable to type '(value: unknown) => string'.
    hello: 'world',
});
