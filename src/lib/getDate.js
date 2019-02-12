'use strict';

const config = require('../config');
const moment = require('moment');

const {
  defaults: { DEFAULT_DATE_FORMAT }
} = config;

const createDate = () => {
  return moment().format(DEFAULT_DATE_FORMAT);
};

module.exports = createDate;
