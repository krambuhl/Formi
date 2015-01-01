'use strict';

//=include("./utilities.js")

/**
 * __Formi(func, args...)__
 *
 * Runs a function with provided arguments
 * If function is undefined, an identity function is used instead
 *
 * @param  {Function}  Function takes data and returns data
 * @param  {List} Arguments applied to function
 *
 * @return {List} Value
 */

function Formi(func) {
  var offset = func !== undefined && typeof func !== 'function' ? 0 : 1;

  // default to Identity if no function is defined
  if (func === undefined || typeof func !== 'function') {
    func = Formi.identity;
  }

  // return function & argument result
  var result = func.apply(undefined, normalize(arguments, offset));

  // slice result
  if (result && result.length && !(typeof result === 'string' || result instanceof String)) {
    return slice(result);
  }

  return result;
}

//=include("./version.js")
//=include("./identity.js")
//=include("./chain.js")
//=include("./compose.js")
//=include("./map.js")
//=include("./reduce.js")