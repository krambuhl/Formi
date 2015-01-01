/**
 * __Formi.identity(func, args...)__
 *
 * Returns all passed arguments unmodified.  Usually used internally.
 *
 * @return {Arguments} Arguments returns values passed to identity.
 */

Formi.identity = function() {
  console.log(arguments);
  if (!Array.isArray(arguments) && arguments.length === 1) {
    return arguments[0];
  } else if (arguments.length === 0) {
    console.log('ds')
    return undefined;
  }

  return arguments;
};