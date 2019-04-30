'use strict';

const test = require('tape');
const padNumber = require('../padNumber');

test('padNumber.js', t => {
  const actual = padNumber(2, 4);
  const expected = '0002';
  t.equal(actual, expected, 'returns expected left padded number string');
  t.end();
});
