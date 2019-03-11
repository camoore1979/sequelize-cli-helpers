'use strict';

const path = require('path');
const inquirer = require('inquirer');
const logger = require('../lib/logger');

const { yesNo } = require('../prompts/');
const getFileNameParts = require('./helpers/getFileNameParts');
const generateFileName = require('../generators/generateFileName');
const writeFile = require('../lib/writeFile');

/**
 * @function touchFile
 * @description
 * @param {object} argv
 */
module.exports = async argv => {
  const { paths: { 'migrations-path': migrationsPath } } = argv;
  argv.inquirer = inquirer;

  argv = await getFileNameParts(argv);
  const fileName = generateFileName(argv);

  const confirm = await yesNo(inquirer, `Create file with name "${fileName}"?`);
  if (confirm) {
    const dir = path.join(migrationsPath, fileName);
    writeFile(dir);
    logger.log(`created "${fileName}!`);
  } else {
    logger.log('cancelling... no file created.');
  }

  //   inquirer.prompt(questions).then(answers => {
  //   console.log('\nOrder receipt:');
  //   console.log(JSON.stringify(answers, null, '  '));
  // });
  return fileName;
};
