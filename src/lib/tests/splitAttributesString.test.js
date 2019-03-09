'use strict';

const test = require('tape');

const splitAttributesString = require('../splitAttributesString');

const testA = t => {
  const testString = 'top:string, date:date';
  const expectedAttrs = [
    {
      fieldName: 'top',
      fieldType: 'string'
    },
    {
      fieldName: 'date',
      fieldType: 'date'
    }
  ];

  const attrs = splitAttributesString(testString);

  t.deepEqual(attrs, expectedAttrs, 'will split attr string and create array of attributes');
  return t;
};

const testB = t => {
  const testString = 'top:string, date:date,';
  const expectedAttrs = [
    {
      fieldName: 'top',
      fieldType: 'string'
    },
    {
      fieldName: 'date',
      fieldType: 'date'
    }
  ];

  const attrs = splitAttributesString(testString);

  t.deepEqual(attrs,
    expectedAttrs,
    'will work even if extra commas are in the string (filters out undefined data)');
  return t;
};

test('splitAttributesString.js', t => {
  t = testA(t);
  t = testB(t);
  t.end();
});
