'use strict';

const fs = require('fs');

const safelySplitFileName = require('./safelySplitFilename');

const getFilterFunc = ({
  fileNameFormat, matchNumberOn, matchValue, numberPaddedLength, separator 
}) => {
  const formatParts = fileNameFormat.split('.');

  // Default to match on Number format
  matchNumberOn = matchNumberOn || 'N';
  const matchIndex = formatParts.indexOf(matchNumberOn);
  let testFunc;

  if (matchNumberOn === 'N') {
    const isNumbers = /^[0-9.]+$/;
    testFunc = test => test.length === numberPaddedLength && test.match(isNumbers);
  }

  return file => {
    const fileNameParts = safelySplitFileName(file, separator);
    const test = fileNameParts.length > matchIndex && fileNameParts[matchIndex];

    return (test && (testFunc && testFunc(test))) || test === matchValue;
  };
};

const getCurrentNumber = options => {
  const {
    // dateFormat,
    fileNameFormat,
    matchNumberOn,
    matchValue,
    numberPaddedLength,
    path,
    separator
  } = options;

  const fileNameParts = fileNameFormat.split('.');
  const numberIndex = fileNameParts.indexOf('N');

  const filterFunc = getFilterFunc({
    fileNameFormat,
    matchNumberOn,
    matchValue,
    numberPaddedLength,
    separator
  });

  const files = fs.readdirSync(path);
  const lastFile = filterFunc && files.filter(filterFunc).pop();
  const lastFileNameParts = lastFile && lastFile.split(separator);
  const lastFileNumber =
    lastFile && lastFileNameParts.length >= numberIndex && lastFileNameParts[numberIndex];

  return Number(lastFile ? lastFileNumber : 0);
};

module.exports = getCurrentNumber;

// const dateString = getDate();
// TODO: this should be PASSED in...
// const re = new RegExp(gitInfo);
//     // .reduce((result, file) => (re.test(file) ? result + 1 : result), 1);
// ;
