// helper functions

function customPush(array, ...values) {
  const length = array.length;
  let i = 0;
  for (i; i < values.length; i++) {
    array[length + i] = values[i];
  }
  array.length = length + i;
  return array.length;
}

const customReduce = function (arr, callback, initialValue) {
  let acc = initialValue !== undefined ? initialValue : arr[0];
  const startingIndex = initialValue !== undefined ? 0 : 1;
  for (let i = startingIndex; i < arr.length; i++) {
    acc = callback(acc, arr[i], i, arr);
  }
  return acc;
};

function customObjectIs(x, y) {
  if (x === y) {
    // handles +0 === -0 case
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // handles NaN case
    return x !== x && y !== y;
  }
}

function customObjectKeys(obj) {
  let keys = [];
  for (let key in obj) {
    if (typeof obj[key] !== "function") {
      customPush(keys, key);
    }
  }
  return keys;
}

function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}

function customForEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
}

function customIncludes(arr, val) {
  let found = false;
  customForEach(arr, (el) => {
    if (el === val) {
      found = true;
    }
  });
  return found;
}

module.exports = {
  customPush,
  customReduce,
  customObjectIs,
  customObjectKeys,
  customForEach,
  isObjectLike,
  customIncludes,
};
