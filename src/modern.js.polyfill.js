if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {
    var mapped = [];

    for (var i = 0; i < this.length; i++) {
      mapped.push(callback.call(thisArg, this[i], i, this));
    }
    return mapped;
  };
}

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback, thisArg) {
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

if (!Object.keys) {
  Object.keys = function(obj) {
    var ownKeys = [];

    for (var propertyName in obj) {
      if (obj.hasOwnProperty(propertyName)) {
        ownKeys.push(propertyName);
      }
    }
    return ownKeys;
  };
}