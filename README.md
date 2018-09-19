# stringify-with-floats

An extended JSON.stringify with the ability to force float data type

[![Build Status](https://travis-ci.com/WW-Digital/stringify-with-floats.svg?branch=master)](https://travis-ci.com/WW-Digital/stringify-with-floats)

## Install

```
npm i stringify-with-floats
```

## Usage

```js
const stringify = StringifyWithFloats( schema )
```

- `schema` {Object} the property names that need data type coercion 

```
stringify( value [, replacer [, space ]] )
```

- `value` The value to convert to a JSON string
- `replacer` {Function} see [JSON.stringify documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)
- `space` {Number|String} see [JSON.stringify documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_space_argument)

## Example

```js
  const value = {
    a: 1,
    b: {
      c: 1.0, // regular JSON.stringify drops the decimal... but we want to keep it!
      d: 1.20
    }
  }
  const stringify = StringifyWithFloats({ c: 'float' })
  stringify(value) // {"a":1,"b":{"c":1.0,"d":1.2}}
```

## License

MIT