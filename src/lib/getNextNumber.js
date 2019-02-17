'use strict';

// const config = require('../config');

// const {
//   defaults: {  }
// } = config;

/* numberFormat */
const getNextNumber = number => {
  return String(number).padStart(6, '0');
};

module.exports = getNextNumber;
