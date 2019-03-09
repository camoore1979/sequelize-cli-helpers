'use strict';

const findUp = require('find-up');

const sequelizeRcPath = findUp.sync('.sequelizerc');
const sequelizeSettings = sequelizeRcPath && require(sequelizeRcPath);
const rcPath = findUp.sync('.sequelizeclihelpersrc');
const settings = rcPath && require(rcPath);

const DEFAULT_SETTINGS = {
  dateFormat: 'YYYYMMDDHHmmss',
  fileExtension: 'js',
  fileNameFormat: 'Tz.N.D',
  forceConfirmation: false,
  matchNumberOn: 'N',
  numberPaddedLength: 4,
  separator: '-'
};

module.exports = (() => {
  return {
    context: process.cwd(),
    ...DEFAULT_SETTINGS,
    ...settings,
    paths: {
      config: '',
      'models-path': '',
      'migrations-path': '',
      'seeders-path': '',
      ...sequelizeSettings
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
