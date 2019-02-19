'use strict';

const moment = require('moment');

const {
  settings: { DATE_FORMAT }
} = require('../config');

const getDate = (date, dateFormat) => {
  return moment(date).format(dateFormat || DATE_FORMAT);
};

module.exports = getDate;
