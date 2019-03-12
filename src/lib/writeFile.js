'use strict';

const logger = require('../lib/logger');
const fs = require('fs');

/**
 * @function writeFile
 * @description wraps call to fs.writeFileSync and prints error, if thrown
 * @param {string} fileName 
 * @param {string} data 
 * @param {string} writeOption optional <append|force> 
 * append will append to the given file
 * force will overwrite the given file
 * by default, will error if path exists
 * @returns {boolean} true if successful
 */
const writeFile = (fileName, data, writeOption) => {
  const writeFlag = (writeOption === 'append') ? 'a' : (writeOption === 'force') ? 'w' : 'wx';
  try {
    const content = !data ? '' : data;
    fs.writeFileSync(fileName, content, { flag: writeFlag });
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
