var StringifyWithFloats = require('..');
var test = require('ava');

test('StringifyWithFloats should work', function (t) {
  var stringify = StringifyWithFloats({
    a: 'float',
    b: 'float',
    c: 'float',
    d: 'float',
    e: 'float',
    f: 'float',
    g: 'float',
    h: 'float',
  });
  var actual = stringify({
    a: 1,
    b: 1.2,
    c: -1,
    d: -1.2,
    e: {
      f: '',
      g: null,
      h: 0,
      i: 'x',
      j: {
        a: 2,
        b: true,
        c: false,
        d: [5, 6]
      },
      k: 2.3,
      l: '1'
    },
    m: '1.0',
    n: 1.0003,
    o: undefined
  });
  var expected = '{"a":1.0,"b":1.2,"c":-1.0,"d":-1.2,"e":{"f":"","g":null,"h":0.0,"i":"x","j":{"a":2.0,"b":true,"c":false,"d":[5,6]},"k":2.3,"l":"1"},"m":"1.0","n":1.0003}';
  t.is(actual, expected);
});

test('stringify with replacer function', function (t) {
  var value = {
    a: 1,
    b: 2
  };
  var replacer = function (key, val) {
    if (key === 'b') return undefined;
    return val;
  };
  var actual = StringifyWithFloats({ a: 'float' })(value, replacer);
  var expected = '{"a":1.0}';
  t.is(actual, expected);
});

test('stringify with replacer array', function (t) {
  var value = {
    a: 1,
    b: 2
  };
  var replacer = ['a'];
  var actual = StringifyWithFloats({ a: 'float' })(value, replacer);
  var expected = '{"a":1.0}';
  t.is(actual, expected);
});

test('stringify with space', function (t) {
  var value = {
    a: 1,
    b: 2
  };
  var actual = StringifyWithFloats({ a: 'float' })(value, null, ' ');
  var expected = '{\n "a": 1.0,\n "b": 2\n}';
  t.is(actual, expected);
});

test('stringify number with no schema', function (t) {
  var value = 1;
  var actual = StringifyWithFloats()(value);
  var expected = '1';
  t.is(actual, expected);
});

test('stringify array with no schema', function (t) {
  var value = [1, 1.2];
  var actual = StringifyWithFloats()(value);
  var expected = '[1,1.2]';
  t.is(actual, expected);
});

test('stringify date', function (t) {
  var value = {
    a: .10,
    b: new Date(1)
  };
  var actual = StringifyWithFloats()(value);
  var expected = '{"a":0.1,"b":"1970-01-01T00:00:00.001Z"}';
  t.is(actual, expected);
});

test('stringify exponential notation', function (t) {
  var value = {
    a: .10,
    b: 5e-7
  };
  var actual = StringifyWithFloats()(value);
  var expected = '{"a":0.1,"b":5e-7}';
  t.is(actual, expected);
});
