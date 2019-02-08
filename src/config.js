'use strict';

const findUp = require('find-up');
const fs = require('fs');
const configPath = findUp.sync(['.sequelizerc']);

const testPath = findUp.sync(['.testrc']);

console.log('configPath: ', configPath);
console.log('testPath: ', testPath);


const sequelizeSettings = require(configPath);

// const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {};

const CONTEXT = process.cwd();

module.exports = {
  context: CONTEXT,
  ...sequelizeSettings
};
