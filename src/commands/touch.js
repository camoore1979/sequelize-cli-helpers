'use strict';

const path = require('path');

const config = require('../config');
const createFileName = require('../generators/createFileName');
const logger = require('../lib/logger');
const writeFile = require('../lib/writeFile');
const yesNo = require('../prompts/yesNo');

const {
  sequelize: {
    'migrations-path': migrationsPath,
  },
  defaults: { DEFAULT_DATE_FORMAT }
} = config;

const builder = yargs => {
  return yargs.options({
    fd: {
      alias: 'dateFormat',
      default: DEFAULT_DATE_FORMAT,
      describe: 'format of date',
      type: 'string'
    }
  });
};

const handler = async (/* argv */) => {
  const fileName = createFileName();
  const createFile = await yesNo(`Create file with name "${fileName}"?`);

  // TODO: should check to see if migrationsPaths are absolute!!
  const dir = path.join(migrationsPath, fileName);
  if (createFile && writeFile(dir)) logger.log(`created "${fileName}!`);
};

module.exports = {
  command: 'touch',
  desc: 'generates a migration file name and touches the empty file',
  builder,
  handler
};
