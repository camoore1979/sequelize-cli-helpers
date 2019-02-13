'use strict';

const config = require('../config');
const moment = require('moment');

const {
  defaults: { DEFAULT_DATE_FORMAT }
} = config;

const getDate = dateFormat => {
  return moment().format(dateFormat || DEFAULT_DATE_FORMAT);
};

module.exports = getDate;
