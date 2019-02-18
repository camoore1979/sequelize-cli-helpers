'use strict';

const moment = require('moment');

const {
  defaults: { DEFAULT_DATE_FORMAT }
} = require('../config');

const getDate = (date, dateFormat) => {
  return moment(date).format(dateFormat || DEFAULT_DATE_FORMAT);
};

module.exports = getDate;
