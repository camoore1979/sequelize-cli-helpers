'use strict';

const filenamify = require('filenamify');

// TODO: make `separator` allow for array of separators
// and iterate and replace all of those
const getSafeString = (string, separator, substitute = '_') => {
  const safeSeparator = substitute;
  const replaceSeparator = new RegExp(separator, 'g');
  string = string.replace(replaceSeparator, safeSeparator);
  string = string.replace(/\s/g, safeSeparator);
  return filenamify(string, { replacement: safeSeparator });
};

module.exports = getSafeString;
