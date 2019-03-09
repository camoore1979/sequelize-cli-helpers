'use strict';

const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const { dir: parsedDir } = path.parse(module.filename);
const pathToTemplate = path.resolve(parsedDir, '../templates/migrations/create_table.hbs');
const template = fs.readFileSync(pathToTemplate, 'UTF-8');

module.exports = tableName => {
  const compiled = handlebars.compile(template, { strict: true });
  const output = compiled({ tableName });

  // console.log('output: \n', output);
  return output;
};
