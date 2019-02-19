'use strict';

const config = require('../config');

const {
  defaults: { DEFAULT_PADDED_NUMBER_LENGTH }
} = config;

/**
 * @function getNextNumber
 * @description
 * @param {number} number 
 * @returns {string} stringified number left padded with zeroes
 */
const getNextNumber = number => {
  return String(number + 1).padStart(DEFAULT_PADDED_NUMBER_LENGTH, '0');
};

module.exports = getNextNumber;
