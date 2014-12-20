Formi
=== 

Functional Programming API.

###Status

[![Codeship](https://codeship.com/projects/2b973c80-6323-0132-0a27-4ad47cf4b99f/status?branch=develop)](https://codeship.com/projects/52245)

[![Code Climate](https://codeclimate.com/github/krambuhl/Formi/badges/gpa.svg)](https://codeclimate.com/github/krambuhl/Formi)

[![Test Coverage](https://codeclimate.com/github/krambuhl/Formi/badges/coverage.svg)](https://codeclimate.com/github/krambuhl/Formi)


API
---

Formi exposes the `Formi` function.

###Formi(function, args)

__Example__

```js
// define predicate function
var not = function(val) {
    return !val;
};

var or = function() {
    return _.some(arguments);
};

Formi(not, true) // ==> false
Formi(or, false, false) // ==> false
Formi(or, false, true, false) // ==> true
```

###Formi.chain(args...)

Creates a chain for transforming data.

__Example__

```js
var add = function() {
    return _.reduce(arguments, function(total, num) {
        return total + num;
    }, 0)
}

var even = function() {
    return _.filter(arguments, function(val) {
        return val % 2 === 0;
    });
}

Formi.chain(1, 2, 3, 4)
    .pipe(even)
    .pipe(add)
    .value(); // ==> 6
```

####Formi.chain().pipe(func)

Define function used to transform wrapped data.

####Formi.chain().value();

Return wrapped data


###Formi.compose(funcs...)

Defines a composite function from a series of argument functions.

`f(g(h(arg))) === Formi.compose(h, g, f)(arg)`

__Example__

Both of these expamples define the same function.

```js
var addEven = Formi.compose(even, add);

var addEven = function() {
    return Formi.chain(arguments)
        .pipe(even)
        .pipe(add)
        .value();
}

Formi(addEven, 2, 3, 4, 5); //==> 6
```