'use strict';

const filenamify = require('filenamify');

const {
  settings: { SEPARATOR }
} = require('../config');

const getSafeFileName = string => {
  string = string.replace(/\s/g, SEPARATOR);
  return filenamify(string, { replacement: SEPARATOR });
};

module.exports = getSafeFileName;
