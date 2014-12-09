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