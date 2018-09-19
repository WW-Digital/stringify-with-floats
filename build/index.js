'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var beginFloat = '~begin~float~';
var endFloat = '~end~float~';

var StringifyWithFloats = function StringifyWithFloats() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (value, options) {
    var jsonReplacer = function jsonReplacer(key, value) {
      var shouldBeReplaced = config[key] === 'float' && (value || value === 0) && typeof value === 'number';
      return shouldBeReplaced ? '' + beginFloat + value + endFloat : value;
    };
    var json = JSON.stringify(value, jsonReplacer, options);
    var regexReplacer = function regexReplacer(match, num) {
      return num.includes('.') || Number.isNaN(num) ? num : num + '.0';
    };
    var re = new RegExp('"' + beginFloat + '(.+?)' + endFloat + '"', 'g');
    return json.replace(re, regexReplacer);
  };
};

exports.default = StringifyWithFloats;
module.exports = exports.default;