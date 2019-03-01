'use strict';

const test = require('tape');
const before = test;
const config = require('../../config');
const createFileName = require('../createFileName');

before('createFileName()', t => t.end());

test('creates a filename defaulting to name of format YYYYMMDDHHMMSS-description.js', t => {
  const options = {
    ...config.settings,
    description: 'myFile01'
  };
  const fileName = createFileName(options);

  // console.log('fileName: ', fileName);
  const fileNameParts = fileName.split('-');

  t.equal(fileNameParts[1].startsWith(options.description), true, 'includes \'description\'');
  t.end();
});

test.skip('asdf', t => {
  const options = {
    description: 'myFile01'
  };
  const fileName = createFileName(options);

  const fileNameParts = fileName.split('-');

  t.equal(fileNameParts[1].startsWith(options.description), true, 'includes \'description\'');
  t.end();
});

/** TODO: list other tests to be written... */


