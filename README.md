Formi
=== 

Functional Programming API. 

###Status

[![Codeship](https://codeship.com/projects/2b973c80-6323-0132-0a27-4ad47cf4b99f/status?branch=develop)](https://codeship.com/projects/52245)

[![Code Climate](https://codeclimate.com/github/krambuhl/Formi/badges/gpa.svg)](https://codeclimate.com/github/krambuhl/Formi)

[![Test Coverage](https://codeclimate.com/github/krambuhl/Formi/badges/coverage.svg)](https://codeclimate.com/github/krambuhl/Formi)



API Docs
===

Formi exposes the `Formi` function. 


##Formi(function, args...)

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


##Formi.chain(args...)

Creates a chain for transforming data.

__Example__

```js
var sum = function() {
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
    .pipe(sum)
    .value(); // ==> 6
```

###Formi.chain().pipe(func)

Define function used to transform wrapped data.

###Formi.chain().value();

Return wrapped data


##Formi.compose(funcs...)

Defines a composite function from a series of argument functions.

`f(g(h(arg))) === Formi.compose(h, g, f)(arg)`

__Example__

Both of these expamples define the same function.

```js
var sumEven = Formi.compose(even, sum);

var sumEven = function() {
    return Formi.chain(arguments)
        .pipe(even)
        .pipe(sum)
        .value();
}

Formi(sumEven, 2, 3, 4, 5); //==> 6
```


##Formi.map(func)

Defines a function that applies a function to a set of data

__Example__

```js
var half = Formi.map(function(num) {
    return num / 2;
});

half(2) //==> 1
half(3, 4) //==> [1.5, 2]
half([4, 8]) //==> [2, 4]
```

##Formi.reduce(func, [value])

Defines a function that reduces a set of data using a supplied function.  A second argument can be provided to define an initial reduction value.

__Example__

```js
var sum = Formi.reduce(function(total, num) {
    return total + num;
}, 0);

sum(12) //==> 12
sum(3, 4) //==> 7
sum([7, 10]) //==> 17

var even = Formi.reduce(function(arr, num) {
    if (num % 2) {
        arr.push(num);
    }
    return arr;
}, []);

even(1) //==> []
even(1, 2, 3, 4) //==> [2, 4]
even([1, 2, 3, 4]) //==> [2, 4]
```