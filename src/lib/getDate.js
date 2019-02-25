'use strict';

const moment = require('moment');

const getDate = (date, dateFormat) => {
  return moment(date).format(dateFormat || '');
};

module.exports = getDate;
