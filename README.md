Formi
=== 

Functional API for javascript.


API
---

Formi exposes the `Formi` function.

###Formi(function, args...)

__Basic Example__

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

###Formi.run(function, array)

`Formi.run` applys an array of arguments to a function. Used for making calls when unsure 

__Example__

```js
var nor = function() {
    return Formi(not, Formi.run(or, arguments));
};

Formi.run(nor, [false, false]) // ==> true
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

__Compound Example__

In simple chains like above, it might make more sense to create a composite functions.

```js
var addEven = function() {
    return Formi.run(add, Formi.run(even, arguments));
}
```



