'use strict';

const findUp = require('find-up');
// const fs = require('fs');
const rcPaths = findUp.sync(['.sequelizerc']);
// const testPath = findUp.sync(['.testrc']);

const sequelizeSettings = require(rcPaths);

const CONTEXT = process.cwd();

module.exports = {
  context: CONTEXT,
  sequelize: {
    ...sequelizeSettings
  },
  defaults: {
    DEFAULT_DATE_FORMAT: 'YYYYMMDDHHmmss',
    DEFAULT_EXTENSION: 'js'
  }
};
