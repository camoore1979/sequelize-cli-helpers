'use strict';

const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const parsedDirInfo = path.parse(module.filename);
// console.dir(parsedDirInfo);
const pathToTemplate = path.resolve(parsedDirInfo.dir, '../templates/migrations/create_table.hbs');
const template = fs.readFileSync(pathToTemplate, 'UTF-8');

module.exports = tableName => {
  // console.log('template: \n', template);
  const compiled = handlebars.compile(template, { strict: true });
  const output = compiled({ tableName });

  // console.log('output: \n', output);
  return output;
};
