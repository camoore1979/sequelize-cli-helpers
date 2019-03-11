'use strict';

// const { prompt } = require('enquirer');

const input = async (inquirer, questionText, options = {}) => {
  const { initial } = options;

  const question = {
    type: 'input',
    name: 'answer',
    message: `${questionText}`,
    initial: initial || ''
  };

  // const response = await prompt(question);
  const response = await inquirer.prompt(question);

  // console.log('response is: ', response.answer);

  return response.answer;
};

module.exports = input;
