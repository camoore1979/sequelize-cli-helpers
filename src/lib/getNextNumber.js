'use strict';

const config = require('../config');

/**
 * @function getNextNumber
 * @description
 * @param {number} number
 * @returns {string} stringified number left padded with zeroes
 */
const getNextNumber = number => {
  const {
    settings: { PADDED_NUMBER_LENGTH }
  } = config;
    
  return String(number + 1).padStart(PADDED_NUMBER_LENGTH, '0');
};

module.exports = getNextNumber;
