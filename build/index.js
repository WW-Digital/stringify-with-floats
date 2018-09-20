'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var beginFloat = '~begin~float~';
var endFloat = '~end~float~';

var StringifyWithFloats = function StringifyWithFloats() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (inputValue, inputReplacer, space) {
    var inputReplacerIsFunction = typeof inputReplacer === 'function';
    var isFirstIteration = true;
    var jsonReplacer = function jsonReplacer(key, val) {
      if (isFirstIteration) {
        isFirstIteration = false;
        return inputReplacerIsFunction ? inputReplacer(key, val) : val;
      }
      var value = void 0;
      if (inputReplacerIsFunction) {
        value = inputReplacer(key, val);
      } else if (Array.isArray(inputReplacer)) {
        // remove the property if it is not included in the inputReplacer array
        value = inputReplacer.indexOf(key) !== -1 ? val : undefined;
      } else {
        value = val;
      }
      var forceFloat = config[key] === 'float' && (value || value === 0) && typeof value === 'number';
      return forceFloat ? '' + beginFloat + value + endFloat : value;
    };
    var json = JSON.stringify(inputValue, jsonReplacer, space);
    var regexReplacer = function regexReplacer(match, num) {
      return num.includes('.') || Number.isNaN(num) ? num : num + '.0';
    };
    var re = new RegExp('"' + beginFloat + '(.+?)' + endFloat + '"', 'g');
    return json.replace(re, regexReplacer);
  };
};

exports.default = StringifyWithFloats;
module.exports = exports.default;