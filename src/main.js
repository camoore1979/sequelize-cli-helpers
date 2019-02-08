'use strict';

const yargs = require('yargs');
const { dump } = require('dumper.js');

const config = require('./config');

// const commands = require('require-all')({
//   dirname     :  __dirname + '/commands',
//   // filter      :  /(.+Controller)\.js$/,
//   excludeDirs :  /^\.(git|svn)$/,
//   recursive   : true
// });

dump(config);

yargs
  .commandDir('commands')
  .demandCommand()
  .help().argv;

// const options = yargs.argv;
// dump(options);
