# Rendy

Simple template engine

## Install

`npm i rendy --save`


## How to use?
Rendy could be used in browser or node.

Browser version:

```html
<script src="rendy.js"></script>
<script>
    var Tmpl    = 'hello {{ where }}';
        result  = rendy(Tmpl, {
            where: 'in browser'
        });
        // returns
        'hello in browser'
</script>
```

Node version:

```js
var rendy   = require('rendy'),
    Tmpl    = 'hello {{ who }}';
    result  = rendy(Tmpl, {
        who: 'world'
    });
    // returns
    'hello world'

```

## License

MIT
