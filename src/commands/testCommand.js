'use strict';

const fs = require('fs');
const handlebars = require('handlebars');

const template = fs.readFileSync('../templates/migrations/create_table.hbs', 'UTF-8');

// console.log('template: \n', template);
const compiled = handlebars.compile(template, { strict: true });

const output = compiled({ tableName: 'material_subgroups' });

console.log('output: \n', output);
