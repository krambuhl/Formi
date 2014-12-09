'use strict';

//=include("./utilities.js")

/**
 * __Formi(func, args...)__
 *
 * Runs a function with provided arguments
 * If function is undefined, an identity function is used instead
 *
 * @param  {Function}  Function takes data and returns data
 * @param  {Arguments} Arguments applied to function
 *
 * @return {Value} Value
 */

function Formi(func, dat) {
  // retrieve all possible data stuffs
  var args = slice(arguments, 1),
    data = slice(dat);
  
  // data is always sent as a list
  if (!Array.isArray(data) || args.length > 1) {
    data = args;
  } 

  // default to Identity if no function is defined
  if (func === undefined || typeof(func) !== 'function') {
    func = Formi.identity;
  }

  // return function & argument result
  return func.apply(undefined, data);
}

//=include("./version.js")
//=include("./identity.js")
//=include("./chain.js")