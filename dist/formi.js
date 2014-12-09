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
 * slice 
 *
 * Converts arguments to array
 *
 * @param   {Arguments}  Arguments
 * @return  {Array} Array
 */

function slice(args, offset) {
  return Array.prototype.slice.call(args, offset || 0);
}

/**
 * construct
 *
 * Constructs new instance with a 
 * variable number of arguments
 *
 * @param   {Function}  Constructor
 * @return  {Array} Arguments
 */

function construct(ctor, args) {
  function F() {
    return ctor.apply(this, args);
  }
  F.prototype = ctor.prototype;
  return new F();
}

/**
 * __Formi(func)__
 *
 */

function Formi(func, args) {
  return Formi.run(func, slice(arguments, 1));
}

Formi.version = '0.1.0';
Formi.idenity = function() {
  return arguments;
};
Formi.run = function(func, args, context) {
  if (func === undefined || typeof(func) !== 'function') {
    func = Formi.idenity;
  }

  return func.apply(context, slice(args));
};
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

Formi.chain.prototype = {
  pipe: function(func) {
    this.data = Formi.run(func, this.data, this);
    return this;
  },

  value: function() {
    return this.data;
  }
};
return Formi;
}));
