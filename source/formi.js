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

function Formi(func, args) {
  return Formi.run(func, slice(arguments, 1));
}

//=include("./formi.version.js")
//=include("./formi.identity.js")
//=include("./formi.run.js")
//=include("./formi.chain.js")