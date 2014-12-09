/**
 * __Formi.run(func, args, context)__
 *
 * Runs a function with provided arguments and optional context
 * If function is undefined, an identity function is used instead
 *
 * @param  {Function}  Function function that takes, manipulates, and returns data
 * @param  {Arguments} Arguments arguments applied to function
 * @param  {Instance} Context context applid to function
 *
 * @return {Value} Value
 */

Formi.run = function(func, args, context) {
  if (func === undefined || typeof(func) !== 'function') {
    func = Formi.identity;
  }

  return func.apply(context, slice(args));
};