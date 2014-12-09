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