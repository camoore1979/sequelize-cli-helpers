'use strict';

const path = require('path');

const logger = require('../lib/logger');

const handleFileNameGeneration = require('./helpers/handleFileNameGeneration');
const writeFile = require('../lib/writeFile');

/**
 * @function touchFile
 * @description
 * @param {object} options
 */
module.exports = async options => {
  const { sequelize: { 'migrations-path': migrationsPath } } = options;

  const fileName = await handleFileNameGeneration(options);
  if (fileName) {
    const dir = path.join(migrationsPath, fileName);
    writeFile(dir);
    logger.log(`created "${fileName}!`);
  } else {
    logger.log('cancelling... no file created.');
  }

  return fileName;
};
