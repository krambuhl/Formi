/**
 * __Formi.map(func)__
 *
 * Defines a function that applies 
 * a function to a set of data
 *
 * @param   {Function} Function   
 * @return  {Function} Function
 */

Formi.map = function(func) {
  if (func === undefined) {
    func = Formi.identity;
  }

  return function() {
    var args = normalize(arguments);

    if (args) {
      if (args.length > 1) {
        return args.map(func);
      }

      if (args.length === 1) {
        return Formi(func, args);
      } 
    }

    return args;
  };
};