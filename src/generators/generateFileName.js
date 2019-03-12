'use strict';

const getSafeString = require('../lib/getSafeString');

const validNameFormat = format => {
  const firstPart = format.split('.').shift();
  return ['N', 'Tz'].find(p => p === firstPart);
};

/**
 * @function generateFileName
 * @description generates a file name
 * @param {*} argv
 * @param {string} argv.dateFormat
 * @param {string} argv.description
 * @param {string} argv.extension
 * @param {string} argv.format
 * @param {string} argv.separator
 * @returns {string} file name
 */
const generateFileName = argv => {
  const {
    fileExtension, fileNameFormat, fileNameParts, separator 
  } = argv;

  if (!validNameFormat(fileNameFormat)) {
    const msg = 'File name must begin with a date or number series! Please the specified fileNameFormat.';
    throw new Error(msg);
  }

  const fileName = fileNameFormat
    .split('.')
    .map(type => fileNameParts && getSafeString(fileNameParts[type], separator))
    .reduce((acc, part) => `${acc}${separator}${part}`);

  return `${fileName}.${fileExtension}`;
};

module.exports = generateFileName;
