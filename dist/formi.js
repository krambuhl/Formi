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
 * __normalize__
 *
 * Normalize arguments structure
 *
 * @param  {Array} Arguments
 * @param  {Integer} Offset
 * @return {List} Argument list of arguments
 */

function normalize(argumts, offset, chaining) {
  var args;

  if (argumts.length > 0) {
    args = slice(argumts, offset);
  } else {
    return undefined;
  }

  // data is always sent as a list
  if (args.length === 1) {
    if (Array.isArray(args[0]) || chaining) {
      return args[0];
    } else {
      return [args[0]];
    }
  } else {
    return args;
  }
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

function Formi(func) {
  var offset = func !== undefined && typeof func !== 'function' ? 0 : 1;

  // default to Identity if no function is defined
  if (func === undefined || typeof func !== 'function') {
    func = Formi.identity;
  }

  // return function & argument result
  var result = func.apply(undefined, normalize(arguments, offset));

  // slice result
  if (result && result.length && !(typeof result == 'string' || result instanceof String)) {
    return slice(result);
  }

  return result;
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
  if (arguments.length === 1) {
    return arguments[0];
  } else if (arguments.length === 0) {
    return undefined;
  }

  return arguments;
};
/**
 * __Formi.chain(args...)__
 *
 * Returns a chainable instance for transforming data.
 * Provides an API for applying transforms and return values.
 *
 * @param   {Arguments}  Arguments
 * @return  {Instance} Instance
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
  this.data = normalize(arguments, 0, true);

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
  var args = typeof func === 'function' ? [func, this.data] : [this.data]; 
  this.data = Formi.apply(undefined, args);
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
