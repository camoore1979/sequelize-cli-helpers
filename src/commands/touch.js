'use strict';

const touchFile = require('../handlers/touchFile');

const builder = yargs => {
  const { settings: { DATE_FORMAT } } = yargs.argv;

  return yargs.options({ fd: {
    alias: 'dateFormat',
    default: DATE_FORMAT,
    describe: 'format of date',
    type: 'string'
  } });
};

module.exports = {
  command: 'touch',
  desc: 'generates a file name and touches the empty file',
  builder,
  handler: async argv => {
    touchFile(argv);
  }
};
