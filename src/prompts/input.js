'use strict';

const { prompt } = require('enquirer');

const input = async (questionText, options = {}) => {
  const { initial } = options;

  const question = {
    type: 'input',
    name: 'answer',
    message: `${questionText}`,
    initial: initial || ''
  };

  const response = await prompt(question);
  return response.answer;
};

module.exports = input;
