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

  // first see what format is first


  // test for number

  const files = fs.readdirSync(path).filter(file => {
    const test = file.split(separator).shift();
    return test.length === numberPaddedLength && test.match(isNumbers);
  });

  const lastFile = files && files.length > 0 && files.pop();
  const lastNumber = lastFile ? lastFile.split(separator).shift() : 0;

  // test for date

  // eslint-disable-next-line
  console.log('FILE: ', lastFile);

  return Number(lastNumber);
};

module.exports = getCurrentNumber;

// const dateString = getDate();
// TODO: this should be PASSED in...
// const re = new RegExp(gitInfo);
//     // .reduce((result, file) => (re.test(file) ? result + 1 : result), 1);
// ;
