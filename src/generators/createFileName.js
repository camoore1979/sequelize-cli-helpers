'use strict';

const getSafeString = require('../lib/getSafeString');

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
    fileExtension, fileNameFormat, fileNameParts, separator 
  } = options;

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

module.exports = createFileName;
