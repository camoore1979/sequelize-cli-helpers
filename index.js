#!/usr/bin/env node
'use strict';

require('./src/main');

exports.printMsg = function () {
  console.log('This is a message from the demo package');
};
