'use strict';

const path = require('path');

const logger = require('../lib/logger');
const { yesNo } = require('../prompts/');
const getFileNameParts = require('../handlers/helpers/getFileNameParts');
const generateFileName = require('../generators/generateFileName');
const generateTableMigration = require('../generators/generateTableMigration');
const writeFile = require('../lib/writeFile');

const builder = yargs => {
  return (
    yargs
      .usage('migration -N tableName')
      .option('tableName', {
        alias: 'N',
        describe: 'name of table to create',
        type: 'string'
      })
      .help()
      .version(false)
  );
};

module.exports = {
  command: 'gen:migration',
  desc: 'generates a migration file',
  builder,
  handler: async argv => {
    const migrationContent = generateTableMigration('material_subgroup');

    const { paths: { 'migrations-path': migrationsPath } } = argv;

    const fileNameParts = await getFileNameParts({
      ...argv,
      fileType: 'migration:table'
    });

    const fileName = generateFileName({
      ...argv,
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
