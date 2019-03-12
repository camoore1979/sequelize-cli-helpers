'use strict';

const touchFile = require('../handlers/touchFile');

const builder = yargs => {
  const { dateFormat } = yargs.argv;

  return yargs.options({ fd: {
    alias: 'dateFormat',
    default: dateFormat,
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
