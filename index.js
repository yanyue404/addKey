"use strict";

/**
 * Add a new custom key value to the array and a method to filter each child
 *
 * @param {*} arr
 * @param {*} obj { isShow:false,isStar:false} when the second parameter is of the Function type, it can be omitted.
 * @param {*} filterFn when the second parameter is of type Object, it can be omitted
 * @returns Array
 */

module.exports = function addKey(sourceArray, extendObj, filterFn) {
  var getType = function(a) {
    var typeArray = Object.prototype.toString.call(a).split(" ");
    return typeArray[1].slice(0, -1);
  };
  var secondParamType = getType(arguments[1]);

  if (!getType(sourceArray) == "Array") {
    throw new Error("The first argument must be an array type");
  }
  if (secondParamType === "Object") {
    return sourceArray.forEach((v, index, sourceArray) => {
      for (var key in extendObj) {
        v[key] = extendObj[key];
      }
      typeof filterFn === "function" ? filterFn(v, index, sourceArray) : "";
    });
  } else if (secondParamType === "Function") {
    return sourceArray.forEach((v, index, sourceArray) => {
      arguments[1](v, index, sourceArray);
    });
  } else {
    return sourceArray;
  }
};
