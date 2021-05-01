"user strict";

const assert = require("assert");
// guarantee semantics and object security

// --- apply
const myObj = {
  add(value) {
    return this.arg1 + this.arg2 + value;
  },
};
// assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

// // issue that might happen
// Function.prototype.apply = () => {
//   throw new TypeError('Changed functions apply prototype impl');
// };

myObj.add.apply = function () {
  throw new Error(`overwrote add.apply`);
};

assert.throws(() => myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), {
  name: "Error",
  message: "overwrote add.apply",
});

// utilizing reflect
const result = Reflect.apply(myObj.add, { arg1: 50, arg2: 60 }, [100]);
assert.deepStrictEqual(result, 210)