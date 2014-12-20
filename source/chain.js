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