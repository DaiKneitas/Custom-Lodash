const { customReduce } = require("./helperFunc.js");

// ------------------------------
// customReduce helper function test

describe("customReduce", () => {
  it("should return the accumulated value of an array of numbers when a multiplication callback is used", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = customReduce(arr, (acc, curr) => acc * curr);
    expect(result).toEqual(120);
  });
});
