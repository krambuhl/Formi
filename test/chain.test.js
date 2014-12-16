// var even = function() {
//   var nums = [];
//   var args = Array.prototype.slice.call(arguments);

//   for(var i = 0; i < args.length; i++) {
//     if (args[i] % 2 === 0) {
//       nums.push(args[i]);
//     }
//   }
//   return nums;
// };

// var not = function() {
//   return !arguments[0];
// };

// suite('Formi.chain()', function() {
//   test('#Formi.chain()', function() {
//     var chain = Formi.chain();
//     (chain.data === undefined).should.be.equal(true);
//   });

//   test('#Formi.chain().value()', function() {
//     var data = Formi.chain().value();
//     (data === undefined).should.be.equal(true);
//   });


//   test('#Formi.chain(Value)', function() {
//     var chain = Formi.chain(10);
//     chain.value().should.equal(10);
//   });

//   test('#Formi.chain(Value, Value)', function() {
//     var chain = Formi.chain(10, 20);
//     chain.value()[0].should.equal(10);
//     chain.value()[1].should.equal(20);
//   });

//   test('#Formi.chain([Value, Value])', function() {
//     var chain = Formi.chain([10, 20]);
//     chain.value()[0].should.equal(10);
//     chain.value()[1].should.equal(20);
//   });

//   test('#Formi.chain(Array)', function() {
//     var chain = Formi.chain([10]);
//     chain.value().length.should.be.equal(1);
//     chain.value()[0].should.equal(10);
//   });

//   test('#Formi.chain(Array, Array)', function() {
//     var chain = Formi.chain([10], [20]);
//     chain.value().length.should.be.equal(2);
//     chain.value()[0][0].should.equal(10);
//     chain.value()[1][0].should.equal(20);
//   });

//   test('#Formi.chain([Array, Array])', function() {
//     var chain = Formi.chain([[10], [20]]);
//     chain.value().length.should.be.equal(2);
//     chain.value()[0][0].should.equal(10);
//     chain.value()[1][0].should.equal(20);
//   });
// });

// // suite('Formi.chain().pipe()', function() {
// //   test('#Formi.chain().pipe()', function() {
// //     var chain = Formi.chain(10);
// //     chain.pipe().value()[0].should.equal(10);
// //   });

// //   test('#Formi.chain().pipe(Function)', function() {
// //     var chain = Formi.chain(true);
// //     chain.pipe(not).value().should.equal(false);
// //   });
// // });