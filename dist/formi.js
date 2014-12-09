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
  return Array.prototype.slice.call(args, offset || 0);
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
 * @param  {Arguments} Arguments applied to function
 *
 * @return {Value} Value
 */

function Formi(func, args) {
  return Formi.run(func, slice(arguments, 1));
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
 * @param  {Function}  Function takes data and returns data
 * @param  {Arguments} Arguments applied to function
 *
 * @return {Value} Value
 */

 Formi.identity = function() {
  return arguments;
};
/**
 * __Formi.run(func, args, context)__
 *
 * Runs a function with provided arguments and optional context
 * If function is undefined, an identity function is used instead
 *
 * @param  {Function}  Function function that takes, manipulates, and returns data
 * @param  {Arguments} Arguments arguments applied to function
 * @param  {Instance} Context context applid to function
 *
 * @return {Value} Value
 */

Formi.run = function(func, args, context) {
  if (func === undefined || typeof(func) !== 'function') {
    func = Formi.identity;
  }

  return func.apply(context, slice(args));
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
  if (arguments[0] instanceof Formi.chain) {
    return arguments[0];
  }

  if (!(this instanceof Formi.chain)) {
    return construct(Formi.chain, arguments);
  }

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
  this.data = Formi.run(func, this.data, this);
  return this;
};


/**
 * __Formi.chain().value()__
 *
 * Returns a copy of chained data data.
 *
 * @return  {Value} 
 */

Formi.chain.prototype.value = function() {
  return this.data;
};
return Formi;
}));
