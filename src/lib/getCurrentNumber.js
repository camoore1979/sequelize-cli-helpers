'use strict';

const fs = require('fs');

const config = require('../config');

const getCurrentNumber = ({ path }) => {
  const {
    settings: {
      // FILE_NAME_FORMAT,
      PADDED_NUMBER_LENGTH,
      SEPARATOR
    }
  } = config;

  const isNumbers = /^[0-9.]+$/;

  // const dateString = getDate();
  // TODO: this should be PASSED in...
  // const re = new RegExp(gitInfo);
  const files = fs.readdirSync(path).filter(file => {
    const test = file.split(SEPARATOR).shift();

    return test.length === PADDED_NUMBER_LENGTH && test.match(isNumbers);
  });

  //     // .reduce((result, file) => (re.test(file) ? result + 1 : result), 1);
  // ;

  const lastFile = files && files.length > 0 && files[files.length - 1];

  // eslint-disable-next-line
  console.log('FILE: ', lastFile);

  return getCurrentNumber;
};

module.exports = getCurrentNumber;
