'use strict';

const test = require('tape');
const moment = require('moment');
const proxyquire = require('proxyquire');
const before = test;

const config = require('../../config');
let createFileName;

before('createFileName()', t => {
  createFileName = proxyquire('../createFileName', { '../lib/getGitStuff': function () {
    return '#1-my-git-branch';
  } });
  t.end();
});

test('creates a filename defaulting to name of format YYYYMMDDHHMMSS-description.js', t => {
  const options = {
    ...config.settings,
    description: 'thisIsATest'
  };
  const fileName = createFileName(options);
  const fileNameParts = fileName.split('-');
  const datePart = fileNameParts[0];
  let descriptionPart = fileNameParts[1];
  descriptionPart = descriptionPart.slice(0, descriptionPart.lastIndexOf('.'));
  t.equal(datePart.length, 14, 'is of length of expected format, YYYYMMDDHHMMSS');
  t.equal(moment().isSame(datePart.slice(0, 8), 'day'), true, 'date is today');
  t.equal(descriptionPart, options.description, 'includes \'description\'');
  t.end();
});

test('format of N.D will generate filename with Padded Number + Description, e.g. \'9999-description.js\'', t => {
  const options = {
    ...config.settings,
    fileNameFormat: 'N.D',
    number: '11',
    description: 'myFile01'
  };
  const fileName = createFileName(options);
  t.equal(fileName, '0011-myFile01.js', 'includes \'description\'');
  t.end();
});

test('format of N.G.D will generate filename with Padded Number + Git Info + Description, e.g. \'9999-gitBranchInfo-description.js\'', t => {
  const options = {
    ...config.settings,
    fileNameFormat: 'N.G.D',
    number: '11',
    description: 'myFile01'
  };
  const fileName = createFileName(options);
  t.equal(fileName, '0011-#1-my-git-branch-myFile01.js', 'includes \'description\'');
  t.end();
});

/** TODO: list other tests to be written... */
// test.skip('caller can specify other number padding lengths', t => {});
// test.skip('caller can specify other ...?', t => {});
// test.skip('caller can specify other date format', t => {});
// test.skip('caller can specify separator', t => {});
// test.skip('caller can specify file extension', t => {});
