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
  var data;

  // return chain if data is a chain instance
  if (arguments[0] instanceof Formi.chain) {
    return arguments[0];
  }

  // call constructor if called without `new`
  if (!(this instanceof Formi.chain)) {
    return construct(Formi.chain, arguments);
  }

  var args = slice(arguments);

  // data is always sent as a list
  if (Array.isArray(args[0]) && args.length === 1) {
    data = args[0];
  } else {
    data = args;
  }

  // define public property for data in transit
  this.data = data;

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