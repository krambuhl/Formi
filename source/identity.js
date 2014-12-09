/**
 * __Formi.identity(func, args...)__
 *
 * Returns all passed arguments unmodified.  Usually used internally.
 *
 * @param  {Function}  Function takes data and returns data
 * @param  {Arguments} Arguments applied to function
 *
 * @return {Value} Value
 */

 Formi.identity = function() {
  return arguments;
};