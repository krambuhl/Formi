/**
 * __Formi.identity(func, args...)__
 *
 * Returns all passed arguments unmodified.  Usually used internally.
 *
 * @return {List} Arguments values passed to identity.
 */

Formi.identity = function() {
  if (arguments.length === 1) {
    return arguments[0];
  } else if (arguments.length === 0) {
    return undefined;
  }

  return arguments;
};