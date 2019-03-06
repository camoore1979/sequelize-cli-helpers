'use strict';

const config = require('../config');
const touchFile = require('../handlers/touchFile');

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
  command: 'touch',
  desc: 'generates a file name and touches the empty file',
  builder,
  handler: async (/* argv */) => {
    touchFile(config);
    
  }
};
