'use strict';

const fs = require('fs');
// const moment = require('moment');

const getCurrentNumber = options => {
  const {
    // dateFormat,
    fileNameFormat,
    numberPaddedLength,
    path,
    separator
  } = options;

  const isNumbers = /^[0-9.]+$/;
  let filterFunc;

  // first see what format is first
  const fileNameParts = fileNameFormat.split('.');
  // const firstFileNamePart = fileNameParts.slice().shift();

  // which position is number in??
  const numberPositionInFormat = fileNameParts.indexOf('N') + 1;
  // const datePositionInFormat = fileNameParts.indexOf('Tz') + 1;

  // test for number
  if (numberPositionInFormat === 1) {
    filterFunc = file => {
      const test = file.split(separator).shift();
      return test.length === numberPaddedLength && test.match(isNumbers);
    };
  }

  // test for date
  // if (datePositionInFormat === 1) {
  //   filterFunc = file => {
  //     const test = file.split(separator).shift();
  //     const dateStringLength = moment().format(dateFormat).length;
  //     return test.length === dateStringLength && moment.isDate(new Date(test));
  //   };
  // }
  const files = fs.readdirSync(path);
  const lastFile = filterFunc && files.filter(filterFunc).pop();
  // eslint-disable-next-line
  // console.log('FILE: ', lastFile);

  return Number(lastFile ? lastFile.split(separator).shift() : 0);
};

module.exports = getCurrentNumber;

// const dateString = getDate();
// TODO: this should be PASSED in...
// const re = new RegExp(gitInfo);
//     // .reduce((result, file) => (re.test(file) ? result + 1 : result), 1);
// ;
