'use strict';

const path = require('path');

const createFileName = require('../generators/createFileName');
const logger = require('../lib/logger');
const { yesNo } = require('../prompts/');

const getFileNameParts = require('../lib/getFileNameParts');
const writeFile = require('../lib/writeFile');

// const acceptedFormatOptions = {
//   D: 'description',
//   G: 'git info',
//   N: 'padded string of numbers',
//   Tz: 'date with timestamp'
// };

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

  const fileNameParts = await getFileNameParts(options);
  const fileName = createFileName({
    ...settings,
    fileNameParts
  });
  const createFile = await yesNo(`Create file with name "${fileName}"?`);
  const dir = path.join(migrationsPath, fileName);
  if (createFile && writeFile(dir)) logger.log(`created "${fileName}!`);
  if (!createFile) logger.log('cancelling... no file created.');
};
