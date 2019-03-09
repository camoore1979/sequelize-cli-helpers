'use strict';

const fs = require('fs');
// const path = require('path');
const handlebars = require('handlebars');

const getTemplate = templatePath => {

  // if pathToTemplate is NOT absolute, then it should be a template NAME
  // then look in a common dir for that e.g., ../templates
  // const { dir: parsedDir } = path.parse(module.filename);
  // const pathToTemplate = path.resolve(parsedDir, '../templates/migrations/create_table.hbs');

  return fs.readFileSync(templatePath, 'UTF-8');
};
module.exports = (templatePath, context) => {
  const template = getTemplate(templatePath);
  const compiled = handlebars.compile(template, { strict: true });
  return compiled(context);
};
