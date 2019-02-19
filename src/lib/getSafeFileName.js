'use strict';

const filenamify = require('filenamify');

const {
  defaults: { DEFAULT_SEPARATOR }
} = require('../config');

const getSafeFileName = string => {
  string = string.replace(/\s/g, DEFAULT_SEPARATOR);
  return filenamify(string, {replacement: DEFAULT_SEPARATOR});
};

module.exports = getSafeFileName;
