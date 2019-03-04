'use strict';

// const path = require('path');
const logger = require('../lib/logger');
// const config = require('../config');

const getDate = require('../lib/getDate');
const getGitStuff = require('../lib/getGitStuff');
const padNumber = require('../lib/padNumber');
const getRandomString = require('../lib/getRandomString');
const getSafeFileName = require('../lib/getSafeFileName');

const acceptedFormatOptions = {
  D: 'description',
  G: 'git info',
  N: 'padded string of numbers',
  Tz: 'date with timestamp'
};

// TODO: use underscores or dashes or periods for name separators
// TODO: parse description per some regex, remove spaces? remove unsafe chars? enforce lower case?
//: 'Tz.'

const getNamePart = (formatPart, options) => {
  const { date, dateFormat, description, number, numberPaddedLength, separator } = options || {};

  const isOptionAccepted = Object.keys(acceptedFormatOptions).some(opt => opt === formatPart);

  if (!isOptionAccepted) {
    logger.error(`ERROR: ${formatPart} is not an accepted formatting option.`);
    return '';
  }

  switch (formatPart) {
  case 'D':
    return getSafeFileName(description, separator);
  case 'G':
    return getGitStuff();
  case 'N':
    return padNumber(number, numberPaddedLength);
  case 'R':
    return getRandomString();
  case 'Tz':
    return date || getDate(undefined, dateFormat);
  }
};

const validNameFormat = format => {
  const firstPart = format.split('.').shift();
  return ['N', 'Tz'].find(p => p === firstPart);
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
  const { 
    fileExtension,
    fileNameFormat,
    separator 
  } = options;

  if (!validNameFormat(fileNameFormat)) {
    logger.error('File name must begin with a date or number series!');
    return;
  }

  const fileName = fileNameFormat
    .split('.')
    .map(type => getNamePart(type, options))
    .reduce((acc, part) => `${acc}${separator}${part}`);

  return `${fileName}.${fileExtension}`;
};

module.exports = createFileName;
