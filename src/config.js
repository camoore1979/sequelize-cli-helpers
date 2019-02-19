'use strict';

const findUp = require('find-up');
const rcPaths = findUp.sync(['.sequelizerc']);
const sequelizeSettings = rcPaths && require(rcPaths);

const DEFAULT_SETTINGS = {
  DATE_FORMAT: 'YYYYMMDDHHmmss',
  EXTENSION: 'js',
  FILE_NAME_FORMAT: 'N.D',
  PADDED_NUMBER_LENGTH: 4,
  SEPARATOR: '-'
};

// TODO: add unit tests for config
module.exports = (() => {
  return {
    context: process.cwd(),
    sequelize: {
      ...sequelizeSettings
    },
    settings: {
      ...DEFAULT_SETTINGS
    },
    set: (value, key1, key2) => {
      if (key1 && key2) {
        this[key1][key2] = value;
      } else {
        this[key1] = value;
      }
    }
  };
})();
