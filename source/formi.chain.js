Formi.chain = function() {
  if (arguments[0] instanceof Formi.chain) {
    return arguments[0];
  }

  if (!(this instanceof Formi.chain)) {
    return construct(Formi.chain, arguments);
  }

  this.data = slice(arguments);
  return this;
};

Formi.chain.prototype = {
  pipe: function(func) {
    this.data = Formi.run(func, this.data, this);
    return this;
  },

  value: function() {
    return this.data;
  }
};