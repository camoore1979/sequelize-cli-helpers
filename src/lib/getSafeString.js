'use strict';

const filenamify = require('filenamify');

const config = require('../config');

const getSafeString = (string, substitute = '_') => {
  const { settings: { separator } } = config;
  const safeSeparator = substitute;
  const replaceSeparator = new RegExp(separator, 'g');
  string = string.replace(replaceSeparator, safeSeparator);
  string = string.replace(/\s/g, safeSeparator);
  return filenamify(string, { replacement: safeSeparator });
};

module.exports = getSafeString;
