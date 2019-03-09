'use strict';

const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const splitAttributesString = require('../lib/splitAttributesString');

const { dir: parsedDir } = path.parse(module.filename);
const pathToTemplate = path.resolve(parsedDir, '../templates/migrations/create_table.hbs');
const template = fs.readFileSync(pathToTemplate, 'UTF-8');

module.exports = argv => {
  const {
    attributes, tableName 
  } = argv;

  const attrs = splitAttributesString(attributes);

  console.dir(attrs);

  const compiled = handlebars.compile(template, { strict: true });
  const output = compiled({ tableName });

  return output;
};
