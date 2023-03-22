const {
  customPush,
  customReduce,
  customObjectIs,
  customObjectKeys,
  customForEach,
  isObjectLike,
  customIncludes,
} = require("./helperFunc.js");

const _ = {
  // ----------------------------
  // Custom Lodash chunk method

  chunk(array, size) {
    if (size <= 0) {
      throw new Error("Size must be greater than 0");
    }

    const chunks = [];
    let chunkIndex = 0;
    let elementIndex = 0;

    while (elementIndex < array.length) {
      if (!chunks[chunkIndex]) {
        chunks[chunkIndex] = [];
      }

      customPush(chunks[chunkIndex], array[elementIndex]);

      elementIndex++;
      if (elementIndex % size === 0) {
        chunkIndex++;
      }
    }

    return chunks;
  },

  // ----------------------------
  // Custom Lodash compact method

  compact(array) {
    const result = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        customPush(result, array[i]);
      }
    }

    return result;
  },

  // ----------------------------
  // Custom Lodash drop method

  drop(array, n = 1) {
    const result = [];
    for (let i = n; i < array.length; i++) {
      customPush(result, array[i]);
    }
    return result;
  },

  // ----------------------------
  // Custom Lodash dropWhile method

  dropWhile(array, predicate) {
    let count = 0;
    while (count < array.length && predicate(array[count], count, array)) {
      count++;
    }
    const result = [];
    for (let i = count; i < array.length; i++) {
      customPush(result, array[i]);
    }
    return result;
  },

  // ----------------------------
  // Custom Lodash take method

  take(array, n = 1) {
    const result = [];
    const maxIndex = Math.min(n, array.length);
    for (let i = 0; i < maxIndex; i++) {
      customPush(result, array[i]);
    }
    return result;
  },

  // ----------------------------
  // Custom Lodash filter method

  filter(arr, predicate) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      if (predicate(arr[i], i, arr)) {
        customPush(result, arr[i]);
      }
    }
    return result;
  },

  // ----------------------------
  // Custom Lodash find method

  find(collection, predicate) {
    for (let i = 0; i < collection.length; i++) {
      if (predicate(collection[i])) {
        return collection[i];
      }
    }
    return undefined;
  },

  // ----------------------------
  // Custom Lodash zip method

  zip(...arrays) {
    const maxLength = customReduce(
      arrays,
      (max, arr) => Math.max(max, arr.length),
      0
    );
    const result = new Array(maxLength);
    for (let i = 0; i < maxLength; i++) {
      result[i] = new Array(arrays.length);
      for (let j = 0; j < arrays.length; j++) {
        result[i][j] = i < arrays[j].length ? arrays[j][i] : undefined;
      }
    }
    return result;
  },

  // ----------------------------
  // Custom Lodash includes method

  includes(collection, value, fromIndex = 0) {
    if (typeof collection === "string") {
      return collection.slice(fromIndex).indexOf(value) !== -1;
    }

    const length = collection ? collection.length : 0;

    if (typeof length === "number") {
      const startIndex =
        fromIndex >= 0 ? fromIndex : Math.max(length + fromIndex, 0);

      for (let i = startIndex; i < length; i++) {
        if (customObjectIs(collection[i], value)) {
          return true;
        }
      }
    } else {
      const keys = customObjectKeys(collection);

      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];

        if (customObjectIs(collection[key], value)) {
          return true;
        }
      }
    }

    return false;
  },

  // ----------------------------
  // Custom Lodash map method

  map(collection, iteratee) {
    let result = [];
    if (typeof iteratee === "function") {
      for (key in collection) {
        result = [...result, iteratee(collection[key])];
      }
    } else {
      for (key in collection) {
        for (prop in collection[key]) {
          if (prop === iteratee) result = [...result, collection[key][prop]];
        }
      }
    }
    return result;
  },

  // ----------------------------
  // Custom Lodash merge method

  merge(object, ...sources) {
    customForEach(sources, (source) => {
      if (!isObjectLike(source)) {
        return;
      }
      customForEach(customObjectKeys(source), (key) => {
        if (typeof source[key] !== "object" || source[key] === null) {
          if (source[key] !== undefined) {
            object[key] = source[key];
          }
          return;
        }
        this.merge(object[key], source[key]);
      });
    });
    return object;
  },

  // ----------------------------
  // Custom Lodash omit method

  omit(object, paths) {
    const result = {};

    for (let key in object) {
      if (!customIncludes(paths, key)) {
        result[key] = object[key];
      }
    }

    return result;
  },

  // ----------------------------
  // Custom Lodash omitBy method

  omitBy(obj, predicate) {
    const newObj = {};
    for (let prop in obj) {
      if (!predicate(obj[prop], prop)) {
        newObj[prop] = obj[prop];
      }
    }
    return newObj;
  },

  // ----------------------------
  // Custom Lodash pick method

  pick(obj, ...props) {
    const result = {};
    for (let key in obj) {
      if (customIncludes(props, key)) {
        result[key] = obj[key];
      }
    }
    return result;
  },

  // ----------------------------
  // Custom Lodash pickBy method

  pickBy(obj, predicate) {
    return customReduce(
      customObjectKeys(obj),
      (result, key) => {
        const value = obj[key];
        if (predicate(value, key)) {
          result[key] = value;
        }
        return result;
      },
      {}
    );
  },
};

module.exports = _;
