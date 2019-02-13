'use strict';

const logger = require('../lib/logger');
const fs = require('fs');

const writeFile = (fileName, data) => {
  try {
    fs.writeFileSync(fileName, data, { flag: 'wx' });
    return true;
  } catch (err) {
    if (err) {
      if (err.toString().indexOf('file already exists') > -1) {
        logger.error(`File "${fileName} already exists at that path.`);
      } else {
        logger.error(err.toString());
      }
    }
    return false;
  }
};

module.exports = writeFile;
