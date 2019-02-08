#!/usr/bin/env node

const path = require('path');

// const myPack = requ
const dir = path.join(__dirname);
// console.log('__dirname: ', __dirname);
// console.log('__filename: ', __filename);
// console.log(`Current directory: ${process.cwd()}`);

require('./src/main');

// start();
// process.exit(0);

exports.printMsg = function () {
  console.log('This is a message from the demo package'); // eslint-disable-line no-console
};
