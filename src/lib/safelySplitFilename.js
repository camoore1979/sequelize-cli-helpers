'use strict';

const path = require('path');

module.exports = (file, separator) => {
  const parsedFileName = path.parse(file);
  const fileName = parsedFileName.name;
  return fileName.split(separator);
};
