'use strict';

const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const splitAttributesString = require('../lib/splitAttributesString');

const getTemplate = () => {
  const { dir: parsedDir } = path.parse(module.filename);
  const pathToTemplate = path.resolve(parsedDir, '../templates/migrations/create_table.hbs');
  return fs.readFileSync(pathToTemplate, 'UTF-8');
};

const compileTemplate = (template, context) => {
  const compiled = handlebars.compile(template, { strict: true });
  return compiled(context);
};

module.exports = argv => {
  const {
    attributes,
    tableName
    // paths: { templates: templatePath }
  } = argv;

  const attrs = splitAttributesString(attributes);
  const template = getTemplate();

  return compileTemplate(template, {
    attributes: attrs,
    tableName
  });
};
