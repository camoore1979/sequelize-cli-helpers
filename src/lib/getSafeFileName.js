'use strict';

const filenamify = require('filenamify');

const getSafeFileName = (string,  separator) => {
  string = string.replace(/\s/g, separator);
  return filenamify(string, { replacement: separator });
};

module.exports = getSafeFileName;
