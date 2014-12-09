Formi.run = function(func, args, context) {
  if (func === undefined || typeof(func) !== 'function') {
    func = Formi.idenity;
  }

  return func.apply(context, slice(args));
};