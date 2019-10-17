'use strict';
const logger = require('../lib/logger');

console.log('hey');

module.exports = {
  command: 'gen:seeder:table',
  desc: 'generates a Sequelize seeder file to populate a table',
  builder: yargs => {
    return yargs;
  },
  handler: async (/* arg */) => {
    logger.log('hello world - seeder');
  }
};
