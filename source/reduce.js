/**
 * __Formi.reduce(func)__
 *
 * Defines a function that reduces a 
 * set of data using a supplied function.
 *
 * @param   {Function} Function   
 * @return  {Function} Function
 */

Formi.reduce = function(func, initial) {
  if (func === undefined) {
    func = Formi.identity;
  }

  return function() {
    var args = normalize(arguments);

    if (!args) {
      args = [];
    }

    return args.reduce(func, initial);
  };
};