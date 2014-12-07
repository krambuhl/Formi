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