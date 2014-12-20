/**
 * __Formi.compose(args...)__
 *
 * Defines a composite function from a 
 * series of argument functions.
 *
 * @param   {Functions}  Arguments
 * @return  {Function} Function
 */

Formi.compose = function() {
  var funcs = slice(arguments);

  if (Array.isArray(funcs[0])) {
    funcs = funcs[0];
  }

  return function() {
    var chain = Formi.chain.apply(undefined, arguments);

    for (var i=0; i<funcs.length; i++) {
      chain.pipe(funcs[i]);
    }

    return chain.value();
  };
};