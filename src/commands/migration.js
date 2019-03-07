'use strict';

you are here!
// move config to main.js, use .config()
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
  // const { settings: { DATE_FORMAT } } = config;

  return yargs
    .usage('migration -N tableName')
    .option('tableName', {
      alias: 'N',
      describe: 'name of table to create',
      type: 'string'
    })
    .demandOption(['tableName'])
    .help()
    .version(false);
};

// TODO: ability to pass in all the options..
module.exports = {
  command: 'migration',
  desc: 'generates a migration file',
  builder,
  handler: async argv => {

    // TODO: check argv for tableName ...

    console.dir(argv);

    const migrationContent = generateTableMigration('material_subgroup');

    const {
      sequelize: { 'migrations-path': migrationsPath },
      settings
    } = config;

    // TODO: pass in file name description!
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
