suite('Formi.reduce()', function() {
  // test functions
  test('#Formi.reduce()', function() {
    var reduced = Formi.reduce();
    reduced.should.be.instanceOf(Function);
    (reduced() === undefined).should.be.equal(true);
  });

  test('#Formi.reduce(func)', function() {
    var reduced = Formi.reduce(function(arg) { });
    reduced.should.be.instanceOf(Function);
    (reduced() === undefined).should.be.equal(true);
  });

  test('#Formi.reduce(func)(arg)', function() {
    var sum = Formi.reduce(function(tot, num) { return tot + num; }, 0);
    sum(1).should.be.equal(1);
  });

  test('#Formi.reduce(func)(arg, arg)', function() {
    var sum = Formi.reduce(function(tot, num) { return tot + num; }, 0);
    sum(1, 2).should.be.equal(3);
  });

  test('#Formi.reduce(func)([arg, arg])', function() {
    var sum = Formi.reduce(function(tot, num) { return tot + num; }, 0);
    sum([4, 5]).should.be.equal(9);
  });
});