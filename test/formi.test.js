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

var not = function(value) {
  return !arguments[0];
};

suite('Formi()', function() {
  // listing functions

  test('#Formi()', function() {
    var data = Formi();
    (data === undefined).should.be.equal(true);
  });

  test('#Formi(Array)', function() {
    var data = Formi([2]);
    data.should.be.equal(2);
  });

  test('#Formi(EmptyArray)', function() {
    var data = Formi([]);
    data.should.be.instanceOf(Array);
    data.length.should.be.equal(0);
  });

  test('#Formi(undefined)', function() {
    var data = Formi(undefined);
    (data === undefined).should.be.equal(true);
  });

  test('#Formi(undefined, Number)', function() {
    var data = Formi(undefined, 1);
    data.should.be.equal(1);
  });

  test('#Formi(undefined, Number, Number)', function() {
    var data = Formi(undefined, 1, 2);
    data[0].should.be.equal(1);
    data[1].should.be.equal(2);
  });

  test('#Formi(undefined, [Number, Number])', function() {
    var data = Formi(undefined, [1, 2]);
    data[0].should.be.equal(1);
    data[1].should.be.equal(2);
  });

  test('#Formi(Number)', function() {
    var data = Formi(1);
    data.should.be.equal(1);
  });

  test('#Formi(Number, Number)', function() {
    var data = Formi(1, 2);
    data[0].should.be.equal(1);
    data[1].should.be.equal(2);
  });

  test('#Formi([Number, Number])', function() {
    var data = Formi([1, 2]);
    data[0].should.be.equal(1);
    data[1].should.be.equal(2);
  });

  test('#Formi(String)', function() {
    var data = Formi('hello');
    data.should.be.equal('hello');
  });

  test('#Formi(String, String)', function() {
    var data = Formi('hello', 'world');
    data[0].should.be.equal('hello');
    data[1].should.be.equal('world');
  });

  test('#Formi([String])', function() {
    var data = Formi(['hello']);
    data.should.be.equal('hello');
  });

  test('#Formi([String, String])', function() {
    var data = Formi(['hello', 'world']);
    data[0].should.be.equal('hello');
    data[1].should.be.equal('world');
  });

  test('#Formi(Object)', function() {
    var data = Formi({ x: 10 });
    data.x.should.be.equal(10);
  });

  test('#Formi(Object, Object)', function() {
    var data = Formi({ x: 10 }, { x: 20 });
    data[0].x.should.be.equal(10);
    data[1].x.should.be.equal(20);
  });

  test('#Formi([Object, Object])', function() {
    var data = Formi([{ x: 10 }, { x: 20 }]);
    data[0].x.should.be.equal(10);
    data[1].x.should.be.equal(20);
  });

  test('#Formi(Array, Array)', function() {
    var data = Formi([2], [3]);
    data.length.should.be.equal(2);
    data[0][0].should.be.equal(2);
    data[1][0].should.be.equal(3);
  });

  test('#Formi([Array, Array])', function() {
    var data = Formi([[2], [3]]);
    data[0][0].should.be.equal(2);
    data[1][0].should.be.equal(3);
  });

  // manipulation functions

  test('#Formi(function, Boolean)', function() {
    var data = Formi(not, true);
    data.should.be.equal(false);
  });

  test('#Formi(function, Number)', function() {
    var data = Formi(even, 1);
    data.length.should.be.equal(0);
  });

  test('#Formi(function, Number, Number)', function() {
    var data = Formi(even, 2, 3);
    data.length.should.be.equal(1);
    data[0].should.be.equal(2);
  });

  test('#Formi(function, [Number, Number])', function() {
    var data = Formi(even, [2, 3]);
    data.length.should.be.equal(1);
    data[0].should.be.equal(2);
  });
});