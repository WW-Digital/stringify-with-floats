const beginFloat = '~begin~float~';
const endFloat = '~end~float~';

const StringifyWithFloats = (config = {}) => (value, options) => {
  const jsonReplacer = (key, value) => {
    const shouldBeReplaced = config[key] === 'float'
      && (value || value === 0)
      && typeof value === 'number';
    return shouldBeReplaced ? `${beginFloat}${value}${endFloat}` : value;
  };
  const json = JSON.stringify(value, jsonReplacer, options);
  const regexReplacer = (match, num) => {
    return (num.includes('.') || Number.isNaN(num)) ? num : `${num}.0`;
  };
  const re = new RegExp(`"${beginFloat}(.+?)${endFloat}"`, 'g');
  return json.replace(re, regexReplacer);
};

export default StringifyWithFloats;
