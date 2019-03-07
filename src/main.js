'use strict';

const yargs = require('yargs');
// const logger = require('./lib/logger');

yargs
  .commandDir('commands')
  .scriptName('sequelize-cli-helpers')
  .demandCommand(1, 'You need at least one command before moving on.')
  .help()
  .epilogue('for more information, see our repo at https://github.com/camoore1979/sequelize-cli-helpers')
  .argv;

