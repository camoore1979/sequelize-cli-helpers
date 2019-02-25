'use strict';

const fs = require('fs');

const getCurrentNumber = options => {
  const {
    // fileNameFormat,
    numberPaddedLength,
    separator,
    path
  } = options;

  const isNumbers = /^[0-9.]+$/;

  // const dateString = getDate();
  // TODO: this should be PASSED in...
  // const re = new RegExp(gitInfo);
  const files = fs.readdirSync(path).filter(file => {
    const test = file.split(separator).shift();

    return test.length === numberPaddedLength && test.match(isNumbers);
  });

  //     // .reduce((result, file) => (re.test(file) ? result + 1 : result), 1);
  // ;

  const lastFile = files && files.length > 0 && files[files.length - 1];

  // eslint-disable-next-line
  console.log('FILE: ', lastFile);

  return getCurrentNumber;
};

module.exports = getCurrentNumber;
