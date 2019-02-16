'use strict';

const fs = require('fs');
// const path = require('path');

const config = require('../config');

const getDate = require('../lib/getDate');
const getGitStuff = require('../lib/getGitStuff');
const getRandomString = require('../lib/getRandomString');


const {
  defaults: { DEFAULT_EXTENSION },
  sequelize: { 'migrations-path': migrationsPath }
} = config;

// const slug =
// process.argv.slice(2).length > 0
//   ? process.argv.slice(2).pop()
//   : randomString();


// const acceptedOptions = {
//   Tz: 'date with timestamp',
//   G: 'git info'
// };

// TODO: use underscores or dashes or periods for name separators
// TODO: parse description per some regex, remove spaces? remove unsafe chars? enforce lower case?
//: 'Tz.'
const createFileName = options => {
  const { description /* format */ } = options;

  const dateString = getDate();
  const gitInfo = getGitStuff();
  const randomString = getRandomString();

  const re = new RegExp(gitInfo);
  const count = fs
    .readdirSync(migrationsPath)
    .map(file => file)
    .reduce((result, file) => (re.test(file) ? result + 1 : result), 1);

  const fileName = `${dateString}-0${count.toString()}-${gitInfo}-${description}-${randomString}.${DEFAULT_EXTENSION}`;
  // const fileName = path.join(dir, script);
  // const fileName = `${dir}/${script}`;

  return fileName;
};

module.exports = createFileName;
