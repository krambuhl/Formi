/**
 * Utilities
 *
 * Defines global utility functions
 *
 */

var Utl = {};


/**
 * Utl.def
 *
 * Returns first non-undefined argument
 * @param   {List}  Arguments
 * @return  {Value} Value
 */

Utl.def = function() {
  return _.find(arguments);
};


/**
 * Utl.result
 *
 * returns result of an expression
 *
 * @param   {Function,Value}  Expression
 * @param   {Object}  Context
 * @return  {Value} Value
 */

Utl.result = function(expr, context) {
  return _.isFunction(expr) ? expr.apply(context) : expr;
};

/**
 * Utl.names
 *
 * Returns list of names seperated by space 
 * 
 * @param   {String}  Space seperated string
 * @param   {Ojbect}  Context
 * @return  {Array} Names Array of strings
 */

Utl.names = function(name, context) {
  // get result of name if defined as a function
  var events = Utl.result(names, context);

  // split by spaces if result isn't an array
  // always returns an array
  return _.isArray(events) ? events : events && events.split(' ');
};
