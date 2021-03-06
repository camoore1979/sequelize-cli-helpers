'use strict';

const path = require('path');

const logger = require('../lib/logger');
const { yesNo } = require('../prompts/');
const getFileNameParts = require('../handlers/helpers/getFileNameParts');
const generateFileName = require('../generators/generateFileName');
const generateTableMigration = require('../generators/generateTableMigration');
const writeFile = require('../lib/writeFile');

const builder = yargs => {
  return yargs
    .usage(`
gen:migration -N users -A fname:string, lname:string

Creates a Sequelize migration to create a table.`)
    .option('attributes', {
      alias: 'A',
      describe: 'list of comma-delimited table attrs. optional.',
      type: 'string'
    })
    .option('tableName', {
      alias: 'N',
      describe: 'name of table to create. required, will prompt if not provided.',
      type: 'string'
    })
    .help()
    .version(false);
};

module.exports = {
  command: 'gen:migration:table',
  desc: 'generates a Sequelize migration to create a table',
  builder,
  handler: async argv => {
    const { paths: { 'migrations-path': migrationsPath } } = argv;

    argv = await getFileNameParts({
      ...argv,
      fileType: 'migration:table'
    });

    const fileName = generateFileName(argv);

    const confirm = await yesNo(`Create migration with name "${fileName}"?`);

    const migrationContent = generateTableMigration(argv);

    if (confirm) {
      const dir = path.join(migrationsPath, fileName);
      writeFile(dir, migrationContent);
      logger.log(`created "${fileName}!`);
    } else {
      logger.log('cancelling... no migration created.');
    }
  }
};
