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
 * Utilities
 *
 * Defines global utility functions
 *
 */

var Utl = {};


/**
 * Utilities.def
 *
 * Returns first non-undefined argument
 * 
 * @return  {Value} 
 */

Utl.def = function() {
  return _.find(arguments);
};

/**
 * __Formi(func)__
 *
 */

var Formi = function(method, values) {};

Formi.prototype = {
  VERSION: '0.1.0'
};
Formi.addMethod = function() {

};
Formi.chain = function() {
  
};
return Formi;
}));
