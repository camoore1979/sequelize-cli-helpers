#!/usr/bin/env node

const doStuff = require('./src/stuff');
doStuff();

exports.printMsg = function () {
  console.log('This is a message from the demo package'); // eslint-disable-line no-console
};
