suite('Formi.map()', function() {
  // test functions
  test('#Formi.map()', function() {
    var mapped = Formi.map();
    mapped.should.be.instanceOf(Function);
    (mapped() === undefined).should.be.equal(true);
  });

  test('#Formi.map(func)', function() {
    var mapped = Formi.map(function(arg) { });
    mapped.should.be.instanceOf(Function);
    (mapped() === undefined).should.be.equal(true);
  });

  test('#Formi.map(func)(arg)', function() {
    var inc = Formi.map(function(arg) { return arg + 1; });
    inc(1).should.be.equal(2);
  });

  test('#Formi.map(func)(arg, arg)', function() {
    var inc = Formi.map(function(arg) { return arg + 1; });
    var trans = inc(1, 2); 
    trans[0].should.be.equal(2);
    trans[1].should.be.equal(3);
  });

  test('#Formi.map(func)([arg, arg])', function() {
    var inc = Formi.map(function(arg) { return arg + 1; });
    var trans = inc([4, 5]);
    trans[0].should.be.equal(5);
    trans[1].should.be.equal(6);
  });
});