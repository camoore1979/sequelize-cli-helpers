'use strict';

const { yesNo } = require('../../prompts/');

const getFileNameParts = require('./getFileNameParts');
const generateFileName = require('../../generators/generateFileName');

module.exports = async options => {
  const { settings } = options;

  const fileNameParts = await getFileNameParts(options);
  const fileName = generateFileName({
    ...settings,
    fileNameParts
  });
  const confirm = await yesNo(`Create file with name "${fileName}"?`);

  return confirm ? fileName : false;
};
