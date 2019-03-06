'use strict';

const { prompt } = require('enquirer');

const yesNo = async message => {
  const yesAnswers = ['y', 'yes', 'true'];
  const confirm = {
    type: 'input',
    name: 'answer',
    message: `(y/N) ${message}`,
    initial: 'N'
  };

  const response = await prompt(confirm);
  const { answer } = response;

  return yesAnswers.some(possibleAnswer => possibleAnswer === (String(answer).toLowerCase()));
};

module.exports = yesNo;
