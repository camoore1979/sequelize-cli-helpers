'use strict';

/**
 * @function padNumber
 * @description
 * @param {number} number
 * @returns {string} stringified number left padded with zeroes
 */
const padNumber = (number, numberPaddedLength) => {
  return String(Number(number)).padStart(numberPaddedLength, '0');
};

module.exports = padNumber;
