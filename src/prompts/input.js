'use strict';

const { prompt } = require('enquirer');

const input = async questionText => {
  const question = {
    type: 'input',
    name: 'answer',
    message: `${questionText}`,
    initial: ''
  };

  const response = await prompt(question);
  return response.answer;
};

module.exports = input;
