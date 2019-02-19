'use strict';

// const fs = require('fs');
// const path = require('path');
const logger = require('../lib/logger');

const getDate = require('../lib/getDate');
const getSafeFileName = require('../lib/getSafeFileName');
const getGitStuff = require('../lib/getGitStuff');
const getNextNumber = require('../lib/getNextNumber');
const getRandomString = require('../lib/getRandomString');

const {
  defaults: { DEFAULT_EXTENSION, DEFAULT_SEPARATOR }
  // sequelize: { 'migrations-path': migrationsPath }
} = require('../config');

const acceptedFormatOptions = {
  D: 'description',
  G: 'git info',
  Tz: 'date with timestamp'
};

// TODO: use underscores or dashes or periods for name separators
// TODO: parse description per some regex, remove spaces? remove unsafe chars? enforce lower case?
//: 'Tz.'

const getNamePart = (formatPart, options) => {
  const { date, dateFormat, description, number, numberFormat } = options || {};

  const isOptionAccepted = Object.keys(acceptedFormatOptions).some(opt => opt === formatPart);

  if (!isOptionAccepted) {
    logger.error(`ERROR: ${formatPart} is not an accepted formatting option.`);
    return '';
  }

  switch (formatPart) {
  case 'D':
    // TODO: add automatic safely interpreting the description
    // search for some pkg to create fs safe file names
    return getSafeFileName(description);
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
  const separator = separatorChar || DEFAULT_SEPARATOR;


  const fileName = format
    .split('.')
    .map(type => getNamePart(type, options))
    .reduce((acc, part) => `${acc}${separator}${part}`);

  return `${fileName}.${extension}`;
};

module.exports = createFileName;
