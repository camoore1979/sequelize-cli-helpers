'use strict';

const findUp = require('find-up');

const sequelizeRcPath = findUp.sync('.sequelizerc');
const sequelizeSettings = sequelizeRcPath && require(sequelizeRcPath);
const rcPath = findUp.sync('.sequelizeclihelpersrc');
const settings = rcPath && require(rcPath);

// TODO: add check / validate on options - run before executing any commands

const DEFAULT_SETTINGS = {
  dateFormat: 'YYYYMMDDHHmmss',
  fileExtension: 'js',
  fileNameFormat: 'Tz.N.G.D',
  matchNumberOn: 'G',
  numberPaddedLength: 2,
  separator: '-'
};

// TODO: add unit tests for config
module.exports = (() => {
  return {
    context: process.cwd(),
    sequelize: {
      config: '',
      'models-path': '',
      'migrations-path': '',
      'seeders-path': '',
      ...sequelizeSettings
    },
    settings: {
      ...DEFAULT_SETTINGS,
      ...settings
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
