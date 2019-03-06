'use strict';

const config = require('../config');
const path = require('path');
// const touchFile = require('../handlers/touchFile');

const logger = require('../lib/logger');

const { yesNo } = require('../prompts/');
const getFileNameParts = require('../handlers/helpers/getFileNameParts');
const generateFileName = require('../generators/generateFileName');
const generateTableMigration = require('../generators/generateTableMigration');
const writeFile = require('../lib/writeFile');

// add ability to pass in various settings... such as path to created file
const builder = yargs => {
  const { settings: { DATE_FORMAT } } = config;

  return yargs.options({ fd: {
    alias: 'dateFormat',
    default: DATE_FORMAT,
    describe: 'format of date',
    type: 'string'
  } });
};

// TODO: ability to pass in all the options..
module.exports = {
  command: 'migration',
  desc: 'generates a migration file',
  builder,
  handler: async (/* argv */) => {
    // const fileName = await touchFile(config);

    const migrationContent = generateTableMigration('material_subgroup');

    const {
      sequelize: { 'migrations-path': migrationsPath },
      settings
    } = config;
  
    // const {  } = settings;
    const fileNameParts = await getFileNameParts(config);
    const fileName = generateFileName({
      ...settings,
      fileNameParts
    });
  
    const confirm = await yesNo(`Create migration with name "${fileName}"?`);
    if (confirm) {
      const dir = path.join(migrationsPath, fileName);
      writeFile(dir, migrationContent);
      logger.log(`created "${fileName}!`);
    } else {
      logger.log('cancelling... no migration created.');
    }
  
  }
};
