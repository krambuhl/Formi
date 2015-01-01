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
    if (chaining || (Array.isArray(args[0]) && args[0].length > 0)) {
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
  if (result && result.length && !(typeof result === 'string' || result instanceof String)) {
    return slice(result);
  }

  return result;
}

/**
 * __Formi.version__
 *
 * Keep track of version tied to `package.json`
 */

 Formi.version = '0.4.0';
/**
 * __Formi.identity(func, args...)__
 *
 * Returns all passed arguments unmodified.  Usually used internally.
 *
 * @return {Arguments} Arguments returns values passed to identity.
 */

Formi.identity = function() {
  console.log(arguments);
  if (!Array.isArray(arguments) && arguments.length === 1) {
    return arguments[0];
  } else if (arguments.length === 0) {
    console.log('ds')
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
/**
 * __Formi.compose(args...)__
 *
 * Defines a composite function from a 
 * series of argument functions.
 *
 * @param   {Functions}  Arguments
 * @return  {Function} Function
 */

Formi.compose = function() {
  var funcs = slice(arguments);

  if (Array.isArray(funcs[0])) {
    funcs = funcs[0];
  }

  return function() {
    var chain = Formi.chain.apply(undefined, arguments);

    for (var i=0; i<funcs.length; i++) {
      chain.pipe(funcs[i]);
    }

    return chain.value();
  };
};
/**
 * __Formi.map(func)__
 *
 * Defines a function that applies 
 * a function to a set of data
 *
 * @param   {Function} Function   
 * @return  {Function} Function
 */

Formi.map = function(func) {
  if (func === undefined) {
    func = Formi.identity;
  }

  return function() {
    var args = normalize(arguments);

    if (args) {
      if (args.length > 1) {
        return args.map(func);
      }

      if (args.length === 1) {
        return Formi(func, args);
      } 
    }

    return args;
  };
};
/**
 * __Formi.reduce(func)__
 *
 * Defines a function that reduces a 
 * set of data using a supplied function.
 *
 * @param   {Function} Function   
 * @return  {Function} Function
 */

Formi.reduce = function(func, initial) {
  if (func === undefined) {
    func = Formi.identity;
  }

  return function() {
    var args = normalize(arguments);

    if (!args) {
      args = [];
    }

    return args.reduce(func, initial);
  };
};
return Formi;
}));
