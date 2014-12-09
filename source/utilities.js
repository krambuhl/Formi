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