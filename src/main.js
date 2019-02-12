'use strict';

const yargs = require('yargs');
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
  .demandCommand()
  .help()
  .epilogue('for more information, see our repo at https://github.com/camoore1979/sequelize-cli-helpers')
  .argv;

// const options = yargs.argv;
// dump(options);
