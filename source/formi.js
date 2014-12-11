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

function Formi(func, data) {
  var args = slice(arguments, 0);

  // retrieve all possible data stuffs
  if (!(func !== undefined && typeof func !== 'function')) {
    args = slice(arguments, 1);
  }

  // data is always sent as a list
  if (!Array.isArray(args[0]) || args.length > 1) {
    data = args;
  } else {
    data = args[0];
  }

  // default to Identity if no function is defined
  if (func === undefined || typeof func !== 'function') {
    func = Formi.identity;
  }

  // return function & argument result
  return func.apply(undefined, data);
}

//=include("./version.js")
//=include("./identity.js")
//=include("./chain.js")