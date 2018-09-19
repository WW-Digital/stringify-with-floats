# stringify-with-floats

An extended JSON.stringify with the ability to force float data type.

[![Build Status](https://travis-ci.com/WW-Digital/stringify-with-floats.svg?token=JdTX7m9qKHidphGrDKfA&branch=master)](https://travis-ci.com/WW-Digital/stringify-with-floats)

## Install

```
npm i stringify-with-floats
```

## Usage

```
StringifyWithFloats( schema [, space] )( value )
```
- `schema` {Object} the property names that need data type coercion 
- `space` {Number|String} see [JSON.stringify documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_space_argument)
- `value` The value to convert to a JSON string

## Example

```js
  const schema = {
    c: 'float'
  }
  const value = {
    a: 1,
    b: {
      c: 1.0, // regular JSON.stringify drops the decimal... but we want to keep it!
      d: 1.20
    }
  };
  StringifyWithFloats(schema)(value);
  // {"a":1,"b":{"c":1.0,"d":1.2}}
```

## License

MIT