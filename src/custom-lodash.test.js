const _ = require("./custom-lodash.js");

// chunk method test

describe("chunk", () => {
  it("should return an empty array, if there is an empty input array", () => {
    expect(_.chunk([], 1)).toEqual([]);
  });

  it("should return the same array if size is greater than the array length", () => {
    expect(_.chunk([1, 2, 3], 4)).toEqual([[1, 2, 3]]);
  });

  it("should split the array into chunks of the specified size", () => {
    expect(_.chunk([1, 2, 3, 4, 5, 6], 2)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  it("should throw an error if size is 0 or negative", () => {
    expect(() => _.chunk([1, 2, 3], 0)).toThrow();
    expect(() => _.chunk([1, 2, 3], -1)).toThrow();
  });

  // ----------------
  it("If array can't be split evenly, the final chunk will be the remaining elements", () => {
    expect(_.chunk([1, 2, 3, 4], 3)).toEqual([[1, 2, 3], [4]]);
  });
});

// --------------------------------------------
// compact method test

describe("compact", () => {
  it("should remove falsy values from the array", () => {
    expect(
      _.compact([0, 1, false, true, "", "hello", null, undefined])
    ).toEqual([1, true, "hello"]);
  });

  it("should return an empty array, if there is an empty input array", () => {
    expect(_.compact([])).toEqual([]);
  });

  it("should handle arrays with mixed truthy and falsey values", () => {
    expect(_.compact([0, 1, false, "", 3])).toEqual([1, 3]);
  });

  it("should return an empty array if all values are falsey", () => {
    expect(_.compact([null, false, 0, "", undefined, NaN])).toEqual([]);
  });

  it("should return a copy of the original array if all values are truthy", () => {
    const arr = [1, "hello", true];
    expect(_.compact(arr)).toEqual(arr);
  });
});

// -----------------------------------------
// drop method test

describe("drop", () => {
  it("should drop the first n elements of the array", () => {
    expect(_.drop([1, 2, 3, 4, 5], 3)).toEqual([4, 5]);
  });

  it("returns a new array with the first element dropped", () => {
    expect(_.drop([1, 2, 3])).toEqual([2, 3]);
  });

  it("returns an empty array if n is greater than or equal to the length of the array", () => {
    expect(_.drop([1, 2, 3], 5)).toEqual([]);
  });

  it("should return an empty array, if there is an empty input array", () => {
    expect(_.drop([])).toEqual([]);
  });

  it("drops one element by default", () => {
    expect(_.drop([1, 2, 3, 4])).toEqual([2, 3, 4]);
  });
});

// -----------------------------------------
// dropWhile method test

describe("dropWhile", () => {
  it("should return an empty array, if there is an empty input array", () => {
    expect(_.dropWhile([], () => true)).toEqual([]);
  });

  it("drops elements until predicate is falsey", () => {
    const users = [
      { user: "barney", active: false },
      { user: "fred", active: false },
      { user: "pebbles", active: true },
    ];
    expect(_.dropWhile(users, (o) => !o.active)).toEqual([
      { user: "pebbles", active: true },
    ]);
  });

  it("should drop elements until the predicate is false", () => {
    const input = [1, 2, 3, 4, 5];
    const predicate = (n) => n < 3;
    const expectedOutput = [3, 4, 5];

    const result = _.dropWhile(input, predicate);

    expect(result).toEqual(expectedOutput);
  });

  it("should return an empty array if the predicate is always true", () => {
    const array = [1, 2, 3];
    const predicate = () => true;
    expect(_.dropWhile(array, predicate)).toEqual([]);
  });

  it("should return the original array if the predicate is always false", () => {
    const array = [1, 2, 3];
    const predicate = () => false;
    expect(_.dropWhile(array, predicate)).toEqual([1, 2, 3]);
  });
});

// -----------------------------------------
// take method test

describe("take", () => {
  it("should return an empty array, if there is an empty input array", () => {
    expect(_.take([], 3)).toEqual([]);
  });

  it("returns the first n elements of the array", () => {
    expect(_.take([1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3]);
  });

  it("returns an empty array when n is 0", () => {
    expect(_.take([1, 2, 3], 0)).toEqual([]);
  });

  it("returns the whole array when n is larger than the array length", () => {
    expect(_.take([1, 2, 3], 5)).toEqual([1, 2, 3]);
  });

  it("should return the first element when n is not specified", () => {
    expect(_.take([1, 2, 3])).toEqual([1]);
  });

  it("should return the first n elements when n is specified", () => {
    expect(_.take([1, 2, 3], 2)).toEqual([1, 2]);
  });
});

// -----------------------------------------
// filter method test

describe("filter", () => {
  it("filters an array based on a predicate", () => {
    const arr = [1, 2, 3, 4, 5];
    const predicate = (num) => num > 2;
    const expected = [3, 4, 5];
    expect(_.filter(arr, predicate)).toEqual(expected);
  });

  it("filters an array based on a predicate (Lodash example)", () => {
    const users = [
      { user: "barney", age: 36, active: true },
      { user: "fred", age: 40, active: false },
    ];
    const filtered = _.filter(users, (o) => !o.active);
    expect(filtered).toEqual([{ user: "fred", age: 40, active: false }]);
  });

  it("passes the current index and the original array to the predicate", () => {
    const arr = [1, 2, 3];
    const predicate = (num, index, array) => {
      expect(index).toBeDefined();
      expect(array).toEqual(arr);
      return true;
    };
    _.filter(arr, predicate);
  });

  it("returns a copy of the original array if all elements pass the predicate", () => {
    const arr = [1, 2, 3];
    const predicate = (num) => num > 0;
    const expected = [1, 2, 3];
    expect(_.filter(arr, predicate)).toEqual(expected);
  });
});

// -----------------------------------------
// find method test

describe("find", () => {
  const users = [
    { name: "Jonas", age: 25 },
    { name: "Ashley", age: 30 },
    { name: "Tom", age: 20 },
  ];

  it("returns the first element that satisfies the predicate", () => {
    const result = _.find(users, (user) => user.age > 25);
    expect(result).toEqual({ name: "Ashley", age: 30 });
  });

  it("returns undefined if no element satisfies the predicate", () => {
    const result = _.find(users, (user) => user.age > 35);
    expect(result).toBeUndefined();
  });

  it("returns undefined if the collection is empty", () => {
    const result = _.find([], (x) => true);
    expect(result).toBeUndefined();
  });

  it("does not modify the original collection", () => {
    const copy = [...users];
    _.find(users, (user) => user.age > 25);
    expect(users).toEqual(copy);
  });
});

// -----------------------------------------
// zip method test

describe("zip", () => {
  it("zips two arrays", () => {
    const result = _.zip([1, 2, 3], ["a", "b", "c"]);
    expect(result).toEqual([
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ]);
  });

  it("zips three arrays", () => {
    const result = _.zip([1, 2], ["a", "b", "c"], [true, false]);
    expect(result).toEqual([
      [1, "a", true],
      [2, "b", false],
      [undefined, "c", undefined],
    ]);
  });

  it("zips arrays of different lengths", () => {
    const result = _.zip([1, 2], ["a", "b", "c", "d"]);
    expect(result).toEqual([
      [1, "a"],
      [2, "b"],
      [undefined, "c"],
      [undefined, "d"],
    ]);
  });

  it("returns an empty array if no arguments are provided", () => {
    const result = _.zip();
    expect(result).toEqual([]);
  });
});

// -----------------------------------------
// includes method test

describe("includes", () => {
  it("returns true when value is present in array", () => {
    const arr = [1, 2, 3];
    expect(_.includes(arr, 2)).toBe(true);
  });

  it("returns false when value is not present in array", () => {
    const arr = [1, 2, 3];
    expect(_.includes(arr, 4)).toBe(false);
  });

  it("returns true when value is present in array with fromIndex", () => {
    const arr = [1, 2, 3];
    expect(_.includes(arr, 1, 1)).toBe(false);
    expect(_.includes(arr, 2, 1)).toBe(true);
  });

  it("returns true when value is present in object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(_.includes(obj, 2)).toBe(true);
  });

  it("returns false when value is not present in object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(_.includes(obj, 4)).toBe(false);
  });

  it("returns true when value is present in string", () => {
    const str = "hello world";
    expect(_.includes(str, "world")).toBe(true);
  });

  it("returns false when value is not present in string", () => {
    const str = "hello world";
    expect(_.includes(str, "foo")).toBe(false);
  });

  it("returns true when value is present in string with fromIndex", () => {
    const str = "hello world";
    expect(_.includes(str, "world", 6)).toBe(true);
    expect(_.includes(str, "world", -5)).toBe(true);
  });

  it("returns false for null and undefined collection", () => {
    expect(_.includes(null, 1)).toBe(false);
    expect(_.includes(undefined, 1)).toBe(false);
  });

  it("returns false for non-string, non-array, non-object collection", () => {
    expect(_.includes(123, 1)).toBe(false);
    expect(_.includes(true, true)).toBe(false);
  });

  it("returns false for a function value in an object", () => {
    const obj = { a: 1, b: () => {}, c: 3 };
    expect(_.includes(obj, () => {})).toBe(false);
  });

  it("handles NaN values correctly", () => {
    const arr = [1, 2, NaN];
    expect(_.includes(arr, NaN)).toBe(true);
    expect(_.includes(arr, "NaN")).toBe(false);
  });

  it("returns false if value is not found in array with negative fromIndex", () => {
    const arr = [1, 2, 3];
    const value = 1;
    const fromIndex = -1;
    expect(_.includes(arr, value, fromIndex)).toBe(false);
  });
});

// -----------------------------------------
// map method test

describe("map", () => {
  it("should return an empty array when given an empty array", () => {
    expect(_.map([], (x) => x)).toEqual([]);
  });

  it("should return an array with the same values as the original array when given an array", () => {
    expect(_.map([1, 2, 3], (x) => x)).toEqual([1, 2, 3]);
  });

  it("should return an array with the same values as the original object when given an object", () => {
    expect(_.map({ a: 1, b: 2, c: 3 }, (x) => x)).toEqual([1, 2, 3]);
  });

  it("map returns an array with transformed values when the input is an object", () => {
    const input = { a: 1, b: 2, c: 3 };
    const expectedOutput = [2, 4, 6];
    const iteratee = (value) => value * 2;
    const output = _.map(input, iteratee);
    expect(output).toEqual(expectedOutput);
  });

  it("should return an array with squared numbers", () => {
    const iteratee = (value) => value * value;
    expect(_.map([4, 8], iteratee)).toEqual([16, 64]);
  });

  it("should return an array with squared numbers", () => {
    const iteratee = (value) => value * value;
    expect(_.map({ a: 4, b: 8 }, iteratee)).toEqual([16, 64]);
  });

  it("should return an array with names of users", () => {
    const users = [{ user: "barney" }, { user: "fred" }];
    expect(_.map(users, "user")).toEqual(["barney", "fred"]);
  });
});

// -----------------------------------------
// merge method test

describe("merge", () => {
  it("should merge two objects with simple properties", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    expect(_.merge(obj1, obj2)).toEqual({ a: 1, b: 3, c: 4 });
  });

  it("should merge two objects with simple properties (Lodash example)", () => {
    const obj1 = { a: [{ b: 2 }, { d: 4 }] };
    const obj2 = { a: [{ c: 3 }, { e: 5 }] };
    expect(_.merge(obj1, obj2)).toEqual({
      a: [
        { b: 2, c: 3 },
        { d: 4, e: 5 },
      ],
    });
  });

  it("should merge two objects with nested objects and arrays", () => {
    const obj1 = {
      a: [1, 2],
      b: {
        c: {
          d: 3,
          e: 4,
        },
      },
    };
    const obj2 = {
      a: [5, 6],
      b: {
        c: {
          e: 5,
          f: 6,
        },
        g: 7,
      },
    };
    expect(_.merge(obj1, obj2)).toEqual({
      a: [5, 6],
      b: {
        c: {
          d: 3,
          e: 5,
          f: 6,
        },
        g: 7,
      },
    });
  });

  it("should merge multiple objects with inheritance", () => {
    class Base {
      constructor() {
        this.a = 1;
      }
    }
    class Child1 extends Base {
      constructor() {
        super();
        this.b = 2;
      }
    }
    class Child2 extends Base {
      constructor() {
        super();
        this.c = 3;
      }
    }

    const obj1 = new Child1();
    const obj2 = new Child2();
    expect(_.merge(obj1, obj2)).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("should not override existing properties with undefined values", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: undefined, c: 4 };
    expect(_.merge(obj1, obj2)).toEqual({ a: 1, b: 2, c: 4 });
  });

  it("should ignore non-object sources", () => {
    const obj1 = { a: 1 };
    const obj2 = null;
    const obj3 = undefined;
    const obj4 = "test";
    expect(_.merge(obj1, obj2, obj3, obj4)).toEqual({ a: 1 });
  });
});

// -----------------------------------------
// omit method test

describe("omit", () => {
  it("should return a new object without omitted properties", () => {
    const object = { a: 1, b: 2, c: 3 };
    const result = _.omit(object, ["a", "c"]);
    expect(result).toEqual({ b: 2 });
  });

  it("should not modify the original object", () => {
    const object = { a: 1, b: 2, c: 3 };
    const result = _.omit(object, ["a", "c"]);
    expect(object).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("should handle objects with no properties", () => {
    const object = {};
    const result = _.omit(object, ["a", "b"]);
    expect(result).toEqual({});
  });

  it("should handle empty omit array", () => {
    const object = { a: 1, b: 2, c: 3 };
    const result = _.omit(object, []);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("should handle omitting non-existent properties", () => {
    const object = { a: 1, b: 2, c: 3 };
    const result = _.omit(object, ["d", "e"]);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });
});

// -----------------------------------------
// omitBy method test

describe("omitBy", () => {
  const obj = { a: 1, b: "2", c: 3 };
  it("should return a new object with filtered properties", () => {
    expect(_.omitBy(obj, (value) => value % 2 === 0)).toEqual({ a: 1, c: 3 });
  });

  it("removes properties for which predicate returns truthy value", () => {
    const obj = { a: 1, b: "2", c: 3 };
    const result = _.omitBy(obj, (value) => typeof value === "number");
    expect(result).toEqual({ b: "2" });
  });

  it("returns empty object when all properties are removed", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = _.omitBy(obj, (value) => typeof value === "number");
    expect(result).toEqual({});
  });

  it("returns copy of object when predicate returns falsy for all properties", () => {
    const obj = { a: 1, b: "2", c: 3 };
    const result = _.omitBy(obj, (value) => typeof value === "boolean");
    expect(result).toEqual(obj);
    expect(result).not.toBe(obj);
  });
});

// -----------------------------------------
// pick method test

describe("pick", () => {
  it("returns empty object if no properties are provided", () => {
    const obj = { a: 1, b: "2", c: 3 };
    const picked = _.pick(obj);
    expect(picked).toEqual({});
  });

  it("returns new object with picked properties", () => {
    const obj = { a: 1, b: "2", c: 3 };
    const picked = _.pick(obj, "a", "c");
    expect(picked).toEqual({ a: 1, c: 3 });
  });

  it("returns new object with inherited properties", () => {
    const obj = { a: 1, b: "2", c: 3 };
    const child = Object.create(obj);
    child.d = 4;
    const picked = _.pick(child, "d");
    expect(picked).toEqual({ d: 4 });
  });

  it("returns new object with picked properties only if they exist", () => {
    const obj = { a: 1, b: "2", c: 3 };
    const picked = _.pick(obj, "a", "d");
    expect(picked).toEqual({ a: 1 });
  });
});

// -----------------------------------------
// pickBy method test

describe("pickBy", () => {
  it("should return an empty object when given an empty object", () => {
    expect(_.pickBy({})).toEqual({});
  });

  it("should include properties that pass the predicate", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const predicate = (value) => value > 1;
    expect(_.pickBy(obj, predicate)).toEqual({ b: 2, c: 3 });
  });

  it("should include inherited properties that pass the predicate", () => {
    class Parent {
      constructor() {
        this.a = 1;
      }
    }

    class Child extends Parent {
      constructor() {
        super();
        this.b = 2;
      }
    }

    const child = new Child();
    const predicate = (value) => value > 1;
    expect(_.pickBy(child, predicate)).toEqual({ b: 2 });
  });

  it("should return an empty object when no properties pass the predicate", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const predicate = (value) => value > 10;
    expect(_.pickBy(obj, predicate)).toEqual({});
  });
});
