/**
 * __Formi.identity(func, args...)__
 *
 * Returns all passed arguments unmodified.  Usually used internally.
 *
 * @return {List} Arguments values passed to identity.
 */

Formi.identity = function() {
  return slice(arguments);
};