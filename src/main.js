'use strict';

const yargs = require('yargs');
const config = require('./config');

module.exports = () => {
  yargs
    .config(config)
    .commandDir('commands')
    .scriptName('')
    .demandCommand(1, 'You need at least one command before moving on.')
    .help()
    .version() // will parse package.json for the version #
    .epilogue('for more information, see our repo at https://github.com/camoore1979/sequelize-cli-helpers')
    .argv;
};
