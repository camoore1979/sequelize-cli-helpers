'use strict';

// const fs = require('fs');
// const path = require('path');

const config = require('../config');

const getDate = require('../lib/getDate');
const getGitStuff = require('../lib/getGitStuff');
const getNextNumber = require('../lib/getNextNumber');
const getRandomString = require('../lib/getRandomString');

const {
  defaults: { DEFAULT_EXTENSION }
  // sequelize: { 'migrations-path': migrationsPath }
} = config;

// const slug =
// process.argv.slice(2).length > 0
//   ? process.argv.slice(2).pop()
//   : randomString();

// const acceptedOptions = {
//   Tz: 'date with timestamp',
//   G: 'git info'
// };

// TODO: use underscores or dashes or periods for name separators
// TODO: parse description per some regex, remove spaces? remove unsafe chars? enforce lower case?
//: 'Tz.'

const getNamePart = (type, options) => {
  const { date, dateFormat, description, number, numberFormat } = options || {};
  switch (type) {
  case 'D':
    // TODO: add automatic safely interpreting the description
    // search for some pkg to create fs safe file names
    return description;
  case 'G':
    return getGitStuff();
  case 'N':
    return getNextNumber(number, numberFormat);
  case 'R':
    return getRandomString();
  case 'Tz':
    return date || getDate(dateFormat);
  }
};

/**
 * @function createFileName
 * @description generates a file name
 * @param {*} options
 * @param {string} options.dateFormat
 * @param {string} options.description
 * @param {string} options.extension
 * @param {string} options.format
 * @param {string} options.separator
 * @returns {string} file name
 */
const createFileName = options => {
  const { extension: fileExtension, format: nameFormat, separator: separatorChar } = options || {};

  const extension = fileExtension || DEFAULT_EXTENSION;
  const format = nameFormat || 'Tz.D';
  const separator = separatorChar || '-';

  // const dateString = getDate();
  // TODO: this should be PASSED in...
  // const re = new RegExp(gitInfo);
  // const count = fs
  //   .readdirSync(migrationsPath)
  //   .map(file => file)
  //   .reduce((result, file) => (re.test(file) ? result + 1 : result), 1);

  const fileName = format
    .split('.')
    .map(type => getNamePart(type, options))
    .reduce((acc, part) => `${acc}${separator}${part}`);

  return `${fileName}.${extension}`;
};

module.exports = createFileName;
