'use strict';

const path = require('path');

const createFileName = require('../generators/createFileName');
const getCurrentNumber = require('../lib/getCurrentNumber');
const logger = require('../lib/logger');
const { input, yesNo } = require('../prompts/');
const writeFile = require('../lib/writeFile');

const getFileNameParts = async options => {
  const {
    sequelize: { 'migrations-path': migrationsPath },
    settings
  } = options;
  const { fileNameFormat } = settings;

  const formatParts = fileNameFormat.split('.');
  let currentNumber;
  let description;

  for (const part of formatParts) {
    switch (part) {
    case 'D':
      description = await input('enter a file description');
      break;
    case 'N':
      currentNumber = getCurrentNumber({ ...settings, path: migrationsPath });
      // TODO: validate input types... e.g string / numbers
      currentNumber = currentNumber ? Number(currentNumber) + 1 : await input('enter the number to use');
      break;
    }
  }

  return { currentNumber, description};
};

/**
 * @function touchFile
 * @descriptionn
 * @param {object} options
 */
module.exports = async options => {
  const {
    sequelize: { 'migrations-path': migrationsPath },
    settings
  } = options;

  const { description, currentNumber } = await getFileNameParts(options);
  const fileName = createFileName({
    ...settings,
    description,
    number: currentNumber
  });
  const createFile = await yesNo(`Create file with name "${fileName}"?`);
  const dir = path.join(migrationsPath, fileName);
  if (createFile && writeFile(dir)) logger.log(`created "${fileName}!`);
  if (!createFile) logger.log('cancelling... no file created.');
};
