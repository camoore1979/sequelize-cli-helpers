'use strict';

const yargs = require('yargs');
const logger = require('./lib/logger');

// const { dump } = require('dumper.js');
// const config = require('./config');
// const commands = require('require-all')({
//   dirname     :  __dirname + '/commands',
//   // filter      :  /(.+Controller)\.js$/,
//   excludeDirs :  /^\.(git|svn)$/,
//   recursive   : true
// });
// dump(config);

yargs
  .commandDir('commands')
  .scriptName('')
  .demandCommand()
  .help()
  .fail(function (msg, err) {
    // if (err) throw err; // preserve stack
    // logger.error('You broke it!');
    msg && logger.error(msg);
    err && logger.error(err);
    // err && logger.error('You should be doing', yargs.help());
    process.exit(1);
  })
  .epilogue('for more information, see our repo at https://github.com/camoore1979/sequelize-cli-helpers')
  .argv;

// const options = yargs.argv;
// dump(options);
