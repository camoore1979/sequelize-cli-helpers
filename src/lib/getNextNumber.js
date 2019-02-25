'use strict';

/**
 * @function getNextNumber
 * @description
 * @param {number} number
 * @returns {string} stringified number left padded with zeroes
 */
const getNextNumber = (number, numberPaddedLength) => {

  return String(number + 1).padStart(numberPaddedLength, '0');
};

module.exports = getNextNumber;
