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