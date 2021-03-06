'use strict';

const { input } = require('../../prompts/');

const getCurrentNumber = require('../../lib/getCurrentNumber');
const getDate = require('../../lib/getDate');
const getGitStuff = require('../../lib/getGitStuff');
const padNumber = require('../../lib/padNumber');
const getRandomString = require('../../lib/getRandomString');
const getSafeString = require('../../lib/getSafeString');

// const acceptedFormatOptions = {
//   D: 'description',
//   G: 'git info',
//   N: 'padded string of numbers',
//   Tz: 'date with timestamp'
// };

module.exports = async options => {
  const {
    paths: { 'migrations-path': migrationsPath },
    date,
    dateFormat,
    fileNameFormat,
    fileType,
    forceConfirmation,
    matchNumberOn,
    numberPaddedLength,
    separator,
    tableName
  } = options;

  const formatParts = fileNameFormat.split('.');
  let currentNumber;
  let dateValue;
  let description;
  let gitInfo;
  let randomString;

  if (formatParts.includes('D')) {
    if (fileType === 'migration:table') {
      const newTableName = !tableName ? await input('enter the new table being created:') : tableName;
      options.tableName = newTableName;
      description = `create-table-${newTableName}`;
    } else {
      description = await input('enter a file description');
    }
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
    forceConfirmation && (await input(`use this date string [${dateValue}]?`, { initial: dateValue }));
  }

  if (formatParts.includes('N')) {
    currentNumber = getCurrentNumber({
      ...options,
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
      forceConfirmation &&
        (await input(`use this next number [${currentNumber}]?`, { initial: currentNumber }));
    }
  }

  return {
    ...options,
    fileNameParts: {
      D: description,
      G: gitInfo,
      N: currentNumber,
      R: randomString,
      Tz: dateValue
    }
  };
};
