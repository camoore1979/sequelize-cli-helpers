'use strict';

const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

/**
 * @function generateFromTemplate
 * @description 
 * @param {string} templatePath name of template to use, or absolute path to template to use
 * @param {object} context object with data to be used by the template
 * @returns {string} compiled and rendered template
 */

 
const getPathToTemplate = templatePath => {
  // if pathToTemplate is NOT absolute, then it should be a template NAME
  // then look in a common dir for that e.g., ../templates
  let pathToTemplate = templatePath;

  const parsedPath = path.parse(templatePath);
  if (!path.isAbsolute(templatePath) || !parsedPath.dir || parsedPath.dir === '../templates') {
    const { dir: parsedDir } = path.parse(module.filename);
    pathToTemplate = path.resolve(parsedDir, `../../templates/${templatePath}`);  
  }

  // console.dir(parsedPath);
  // console.log('boolean: ', path.isAbsolute(templatePath));
  // console.log('pathToTemplate: ', pathToTemplate);

  return pathToTemplate;
};

const getTemplate = templatePath => {
  const pathToTemplate = getPathToTemplate(templatePath);
  return fs.readFileSync(pathToTemplate, 'UTF-8');
};

module.exports = (templatePath, context) => {
  const template = getTemplate(templatePath);
  const compiled = handlebars.compile(template, { strict: true });
  return compiled(context);
};
