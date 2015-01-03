var add = function() {
    return _.reduce(arguments, function(total, num) {
        return total + num;
    }, 0);
};

var even = function() {
    return _.filter(arguments, function(val) {
        return val % 2 === 0;
    });
};

suite('Formi.compose()', function() {
  // listing functions

  test('#Formi.compose()', function() {
    var comp = Formi.compose();
    comp(1,2)[0].should.equal(1);
  });

  test('#Formi.compose(func)', function() {
    var comp = Formi.compose(even);
    comp(1,2)[0].should.equal(2);
  });

  test('#Formi.compose(func, func)', function() {
    var comp = Formi.compose(even, add);
    comp(1,2,3,4).should.equal(6);
  });

  test('#Formi.compose([func])', function() {
    var comp = Formi.compose([even]);
    comp(1,2,3,4)[0].should.equal(2);
  });

  test('#Formi.compose([func, func])', function() {
    var comp = Formi.compose([even, add]);
    comp(1,2,3,4).should.equal(6);
  });
});