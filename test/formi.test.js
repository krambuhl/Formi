var even = function() {
  var nums = [];
  var args = Array.prototype.slice.call(arguments);

  for(var i = 0; i < args.length; i++) {
    if (args[i] % 2 === 0) {
      nums.push(args[i]);
    }
  }
  return nums;
};

var not = function() {
  return !arguments[0];
};

suite('Formi()', function() {
  // listing functions

  test('#Formi()', function() {
    var data = Formi();
    data.should.be.an.instanceOf(Array);
  });

  test('#Formi(undefined)', function() {
    var data = Formi(undefined);
    data.should.be.an.instanceOf(Array);
  });

  test('#Formi(undefined, value)', function() {
    var data = Formi(undefined, 1);
    data[0].should.be.equal(1);
  });

  test('#Formi(undefined, value, value)', function() {
    var data = Formi(undefined, 1, 2);
    data[0].should.be.equal(1);
    data[1].should.be.equal(2);
  });

  test('#Formi(undefined, [value, value])', function() {
    var data = Formi(undefined, [1, 2]);
    data[0].should.be.equal(1);
    data[1].should.be.equal(2);
  });

  test('#Formi(value)', function() {
    var data = Formi(1);
    data[0].should.be.equal(1);
  });

  test('#Formi(value, value)', function() {
    var data = Formi(1, 2);
    data[0].should.be.equal(1);
    data[1].should.be.equal(2);
  });

  test('#Formi([value, value])', function() {
    var data = Formi([1, 2]);
    data[0].should.be.equal(1);
    data[1].should.be.equal(2);
  });

  test('#Formi(undefined, [Array, Array])', function() {
    var data = Formi(undefined, [2], [3]);
    data.length.should.be.equal(2);
    data[0][0].should.be.equal(2);
  });

  // manipulation functions

  test('#Formi(function, value)', function() {
    var data = Formi(not, true);
    data.should.be.equal(false);
  });

  test('#Formi(function, value)', function() {
    var data = Formi(even, 1);
    data.length.should.be.equal(0);
  });

  test('#Formi(function, value, value)', function() {
    var data = Formi(even, 2, 3);
    data.length.should.be.equal(1);
    data[0].should.be.equal(2);
  });

  test('#Formi(function, [value, value])', function() {
    var data = Formi(even, [2, 3]);
    data.length.should.be.equal(1);
    data[0].should.be.equal(2);
  });
});