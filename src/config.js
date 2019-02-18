'use strict';

const findUp = require('find-up');
const rcPaths = findUp.sync(['.sequelizerc']);
const sequelizeSettings = rcPaths && require(rcPaths);

const CONTEXT = process.cwd();

module.exports = {
  context: CONTEXT,
  sequelize: {
    ...sequelizeSettings
  },
  defaults: {
    DEFAULT_DATE_FORMAT: 'YYYYMMDDHHmmss',
    DEFAULT_EXTENSION: 'js',
    DEFAULT_PADDED_NUMBER_LENGTH: 6,
    DEFAULT_SEPARATOR: '-'
  }
};
