'use strict';

const path = require('path');

const logger = require('../lib/logger');

const { yesNo } = require('../prompts/');
const getFileNameParts = require('./helpers/getFileNameParts');
const generateFileName = require('../generators/generateFileName');
const writeFile = require('../lib/writeFile');

/**
 * @function touchFile
 * @description
 * @param {object} options
 */
module.exports = async options => {
  const {
    sequelize: { 'migrations-path': migrationsPath },
    settings
  } = options;

  // const {  } = settings;
  const fileNameParts = await getFileNameParts(options);
  const fileName = generateFileName({
    ...settings,
    fileNameParts
  });

  const confirm = await yesNo(`Create file with name "${fileName}"?`);
  if (confirm) {
    const dir = path.join(migrationsPath, fileName);
    writeFile(dir);
    logger.log(`created "${fileName}!`);
  } else {
    logger.log('cancelling... no file created.');
  }

  return fileName;
};
