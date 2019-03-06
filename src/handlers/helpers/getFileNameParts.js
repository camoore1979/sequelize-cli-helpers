'use strict';

const { input } = require('../../prompts');

const getCurrentNumber = require('../../lib/getCurrentNumber');
const getDate = require('../../lib/getDate');
const getGitStuff = require('../../lib/getGitStuff');
const padNumber = require('../../lib/padNumber');
const getRandomString = require('../../lib/getRandomString');
const getSafeString = require('../../lib/getSafeString');

module.exports = async options => {
  const {
    sequelize: { 'migrations-path': migrationsPath },
    settings
  } = options;
  const {
    date, dateFormat, fileNameFormat, forceConfirmation, matchNumberOn, numberPaddedLength 
  } = settings;

  const formatParts = fileNameFormat.split('.');
  let currentNumber;
  let dateValue;
  let description;
  let gitInfo;
  let randomString;

  if (formatParts.includes('D')) {
    description = await input('enter a file description');
    description = getSafeString(description);
  }

  if (formatParts.includes('G')) {
    gitInfo = getGitStuff();
    gitInfo = getSafeString(gitInfo);
  }

  if (formatParts.includes('R')) {
    randomString = getRandomString();
  }

  if (formatParts.includes('Tz')) {
    dateValue = date || getDate(undefined, dateFormat);
    forceConfirmation && (await input(`use this date string [${dateValue}]?`, { initial: dateValue }));
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
    if (!currentNumber) {
      currentNumber = await input('enter the number to use');
      currentNumber = padNumber(currentNumber, numberPaddedLength);
    } else {
      currentNumber = Number(currentNumber) + 1;
      currentNumber = padNumber(currentNumber, numberPaddedLength);
      forceConfirmation && (await input(`use this number [${currentNumber}]?`, { initial: currentNumber }));
    }
  }

  return {
    D: description,
    G: gitInfo,
    N: currentNumber,
    R: randomString,
    Tz: dateValue
  };
};
