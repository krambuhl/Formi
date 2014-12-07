Formi
=== 

Functional compositions.


API
---

```js
F(method, [args...])
Formi(method, [args...])
```

#####Static Methods

Formi.addMethod(name, func);
Formi.chain([args...]).method(name).value();


```js

Formi.addMethod('not', function(val) {
    return !val;
});

Formi.addMethod('and', function() {
    return _.every(arguments);
});

Formi.addMethod('or', function() {
    return _.some(arguments);
});

Formi.addMethod('add', function() {
    return _.reduce(arguments, function(total, val) {
        return total + val;    
    }, 0);
});


Formi('not', true) // ==> false
Formi('and', false, true) // ==> false
Formi('or', true, true) // ==> true
Formi('add', 1, 2, 3) // ==> 6


var nor = F('not', F('or', true, false));
var nor = F.chain(true, false).or().not().get();

```