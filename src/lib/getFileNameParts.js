'use strict';

const { input } = require('../prompts/');

const getCurrentNumber = require('./getCurrentNumber');
const getDate = require('./getDate');
const getGitStuff = require('./getGitStuff');
const padNumber = require('./padNumber');
const getRandomString = require('./getRandomString');
const getSafeString = require('./getSafeString');

module.exports = async options => {
  const {
    sequelize: { 'migrations-path': migrationsPath },
    settings
  } = options;
  const {
    date, dateFormat, fileNameFormat, matchNumberOn, numberPaddedLength, separator
  } = settings;

  const formatParts = fileNameFormat.split('.');
  let currentNumber;
  let dateValue;
  let description;
  let gitInfo;
  let randomString;

  if (formatParts.includes('D')) {
    description = await input('enter a file description');
    description = getSafeString(description, separator);
  }

  if (formatParts.includes('G')) {
    gitInfo = getGitStuff();
    gitInfo = getSafeString(gitInfo, separator);
  }

  if (formatParts.includes('R')) {
    randomString = getRandomString();
  }

  if (formatParts.includes('Tz')) {
    dateValue = date || getDate(undefined, dateFormat);
  }

  if (formatParts.includes('N')) {
    currentNumber = getCurrentNumber({
      ...settings,
      path: migrationsPath,
      matchValue:
        matchNumberOn === 'D'
          ? description
          : matchNumberOn === 'G'
            ? gitInfo
            : matchNumberOn === 'Tz'
              ? dateValue
              : undefined
    });
    
    // TODO: validate input types... e.g string / numbers
    // TODO: only input number to use if matching on number... otherwise return 1
    currentNumber = currentNumber ? Number(currentNumber) + 1 : await input('enter the number to use');
    currentNumber = padNumber(currentNumber, numberPaddedLength);
  }

  return {
    D: description,
    G: gitInfo,
    N: currentNumber,
    R: randomString,
    Tz: dateValue
  };
};
