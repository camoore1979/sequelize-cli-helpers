'use strict';

const createFileName = require('../generators/createFileName');
const config = require('../config');
const yesNo = require('../prompts/yesNo');

const {
  defaults: { DEFAULT_DATE_FORMAT }
} = config;

const command = {
  command: 'touch',
  desc: 'generates a migration file name and touches the empty file'
};

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

const handler = async argv => {
  const fileName = createFileName();
  // console.log(`Saved! ${fileName}`);
  const createFile = await yesNo(`Create file with name "${fileName}"?`);

  if (createFile) {
    console.log(`created "${fileName}!`);
  }
};

module.exports = {
  ...command,
  builder,
  handler
};
