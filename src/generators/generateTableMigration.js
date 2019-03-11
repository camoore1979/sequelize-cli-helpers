'use strict';

const fs = require('fs');

const splitAttributesString = require('../lib/splitAttributesString');
const generateFromTemplate = require('./helpers/generateFromTemplate');

/**
 * @function generateTableMigration
 * @description generates a Sequelize migration to create a table
 * @param {object} argv
 * @returns {string} compiled and rendered template string
 */

const getMigrationTemplate = (path, migrationName) => {
  const pathExists = path && fs.existsSync(path);
  return pathExists ? `${path}/${migrationName}` : migrationName;
};

module.exports = argv => {
  const {
    attributes,
    tableName,
    paths: { templates: templatePath }
  } = argv;

  const attrs = splitAttributesString(attributes);
  const pathToTemplate = getMigrationTemplate(templatePath, 'migration_create_table.hbs');

  return generateFromTemplate(pathToTemplate, {
    attributes: attrs,
    tableName
  });
};
