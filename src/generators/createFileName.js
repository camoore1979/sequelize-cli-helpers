'use strict';

const config = require('../config');
// const fs = require('fs');
// const path = require('path');
// const { spawnSync } = require('child_process');

const getDate = require('../lib/getDate');

const {
  defaults: { DEFAULT_EXTENSION }
} = config;

// const slug =
// process.argv.slice(2).length > 0
//   ? process.argv.slice(2).pop()
//   : randomString();



// // const re = new RegExp(branch);

// const dir = '/folder/';
// const count = 2;
// // const count = fs
// //   .readdirSync(dir)
// //   .map(file => file)
// //   .reduce((result, file) => (re.test(file) ? result + 1 : result), 1);

const createFileName = () => {
  const timeStamp = getDate();

  const fileName = `${timeStamp}-my-file.${DEFAULT_EXTENSION}`;
  // const fileName = path.join(dir, script);
  // const fileName = `${dir}/${script}`;

  return fileName;
};

module.exports = createFileName;
