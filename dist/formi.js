(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Formi = factory();
  }
}(this, function() {
'use strict';

/**
 * __slice(args, offset)__
 *
 * Converts arguments to array
 *
 * @param   {Array}  Arguments
 * @param   {Integer}  Begin 
 * @param   {Integer}  End 
 * @return  {Array} Array
 */

function slice(args, begin, end) {
  return Array.prototype.slice.call(args, begin, end);
}

/**
 * __construct__
 *
 * Constructs new instance with a variable number of arguments
 *
 * @param  {Function}  Constructor
 * @param  {Array} Arguments
 * @return {Instance} Instance
 */

function construct(ctor, args) {
  function F() {
    return ctor.apply(this, args);
  }
  F.prototype = ctor.prototype;
  return new F();
}

/**
 * __Formi(func, args...)__
 *
 * Runs a function with provided arguments
 * If function is undefined, an identity function is used instead
 *
 * @param  {Function}  Function takes data and returns data
 * @param  {List} Arguments applied to function
 *
 * @return {List} Value
 */

function Formi(func, data) {
  var args = slice(arguments, 0);

  // retrieve all possible data stuffs
  if (!(func !== undefined && typeof func !== 'function')) {
    args = slice(arguments, 1);
  }

  // data is always sent as a list
  if (!Array.isArray(args[0]) || args.length > 1) {
    data = args;
  } else {
    data = args[0];
  }

  // default to Identity if no function is defined
  if (func === undefined || typeof func !== 'function') {
    func = Formi.identity;
  }

  // return function & argument result
  return func.apply(undefined, data);
}

/**
 * __Formi.version__
 *
 * Keep track of version tied to `package.json`
 */

 Formi.version = '0.1.0';
/**
 * __Formi.identity(func, args...)__
 *
 * Returns all passed arguments unmodified.  Usually used internally.
 *
 * @return {List} Arguments values passed to identity.
 */

 Formi.identity = function() {
  return slice(arguments);
};
/**
 * __Formi.chain(args...)__
 *
 * Returns a chainable instance for transforming data.
 * Provides an API for applying transforms and return values.
 *
 * @param   {Arguments}  Arguments
 * @return  {Instance} Array
 */

Formi.chain = function() {
  // return chain if data is a chain instance
  if (arguments[0] instanceof Formi.chain) {
    return arguments[0];
  }

  // call constructor if called without `new`
  if (!(this instanceof Formi.chain)) {
    return construct(Formi.chain, arguments);
  }

  // define public property for data in transit
  this.data = slice(arguments);

  return this;
};


/**
 * __Formi.chain().pipe(function)__
 *
 * Transform chained data with function and returns chain
 *
 * @param   {Function}  Function Data transform function
 * @return  {Formi.Chain} Instance Current chain instance
 */

Formi.chain.prototype.pipe = function(func) {
  // pass Formi return back to data and return the chain
  this.data = Formi(func, this.data);
  return this;
};


/**
 * __Formi.chain().value()__
 *
 * Returns a copy of chained data.
 *
 * @return  {Value} Data Data wrapped in chain
 */

Formi.chain.prototype.value = function() {
  // exports data out of chain
  return this.data;
};
return Formi;
}));
