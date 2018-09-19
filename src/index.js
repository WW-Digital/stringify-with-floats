const beginFloat = '~begin~float~';
const endFloat = '~end~float~';

const StringifyWithFloats = (config = {}) => (inputValue, inputReplacer, space) => {
  let isFirstIteration = true;
  const jsonReplacer = (key, val) => {
    if (isFirstIteration) {
      isFirstIteration = false;
      return (typeof inputReplacer === 'function') ? inputReplacer(key, val) : val;
    }
    let value;
    if (typeof inputReplacer === 'function') {
      value = inputReplacer(key, val);
    } else if (Array.isArray(inputReplacer)) {
      value = inputReplacer.includes(key) ? val : undefined;
    } else {
      value = val;
    }
    const forceFloat = config[key] === 'float'
      && (value || value === 0)
      && typeof value === 'number';
    return forceFloat ? `${beginFloat}${value}${endFloat}` : value;
  };
  const json = JSON.stringify(inputValue, jsonReplacer, space);
  const regexReplacer = (match, num) => {
    return (num.includes('.') || Number.isNaN(num)) ? num : `${num}.0`;
  };
  const re = new RegExp(`"${beginFloat}(.+?)${endFloat}"`, 'g');
  return json.replace(re, regexReplacer);
};

export default StringifyWithFloats;
