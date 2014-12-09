'use strict';

//=include("./utilities.js")

/**
 * __Formi(func)__
 *
 */

function Formi(func, args) {
  return Formi.run(func, slice(arguments, 1));
}

//=include("./formi.version.js")
//=include("./formi.idenity.js")
//=include("./formi.run.js")
//=include("./formi.chain.js")