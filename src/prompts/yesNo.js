'use strict';

// const { prompt } = require('enquirer');

const yesNo = async (inquirer, message) => {
  const yesAnswers = ['y', 'yes', 'true'];
  const confirm = {
    type: 'input',
    name: 'answer',
    message: `(y/N) ${message}`,
    initial: ''
  };

  
  const response = await inquirer.prompt(confirm);
  const { answer } = response;
  // console.log('you are here. answer: ', answer);
  return yesAnswers.some(possibleAnswer => possibleAnswer === String(answer).toLowerCase());
};

module.exports = yesNo;
