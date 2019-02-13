'use strict';

const log = console.log; // eslint-disable-line no-console
const chalk = require('chalk');

module.exports = {
  log,
  error: err => {
    log(chalk.red(err));
  },
  success: msg => {
    log(chalk.green(msg));
  }
};
