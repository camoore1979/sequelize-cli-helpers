'use strict';

const test = require('tape');
const moment = require('moment');

const config = require('../../config');
const generateFileName = require('../generateFileName');

const { dateFormat } = config;

test('will create a filename of specified fileNameFormat', t => {
  const formattedDate = moment().format(dateFormat);
  const options = {
    ...config,
    fileNameFormat: 'Tz.N.G.D',
    fileNameParts: {
      D: 'thisIsATest',
      G: 'my_git_branch',
      N: '0001',
      Tz: formattedDate
    }
  };
  const expectedString = `${formattedDate}-0001-my_git_branch-thisIsATest.js`;
  const fileName = generateFileName(options);

  t.equal(fileName, expectedString, 'file name matches expected');
  t.end();
});

/** TODO: list other tests to be written... */
// test.skip('caller can specify other number padding lengths', t => {});
// test.skip('caller can specify other ...?', t => {});
// test.skip('caller can specify other date format', t => {});
// test.skip('caller can specify separator', t => {});
// test.skip('caller can specify file extension', t => {});
