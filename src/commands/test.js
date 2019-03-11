'use strict';

const touchFile = require('../handlers/touchFile');
const inquirer = require('inquirer');

const builder = yargs => {
  const { dateFormat } = yargs.argv;

  return yargs.options({ fd: {
    alias: 'dateFormat',
    default: dateFormat,
    describe: 'format of date',
    type: 'string'
  } });
};

module.exports = {
  command: 'test',
  desc: 'to test command line stuff',
  builder,
  handler: async () => {
    const questions = [
      {
        type: 'confirm',
        name: 'toBeDelivered',
        message: 'Is this for delivery?',
        default: false
      },
      {
        type: 'input',
        name: 'phone',
        message: 'What\'s your phone number?',
        validate: function (value) {
          const pass = value.match(/^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i);
          if (pass) {
            return true;
          }

          return 'Please enter a valid phone number';
        }
      },
      {
        type: 'list',
        name: 'size',
        message: 'What size do you need?',
        choices: ['Large', 'Medium', 'Small'],
        filter: function (val) {
          return val.toLowerCase();
        }
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'How many do you need?',
        validate: function (value) {
          const valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        },
        filter: Number
      },
      {
        type: 'expand',
        name: 'toppings',
        message: 'What about the toppings?',
        choices: [
          {
            key: 'p',
            name: 'Pepperoni and cheese',
            value: 'PepperoniCheese'
          },
          {
            key: 'a',
            name: 'All dressed',
            value: 'alldressed'
          },
          {
            key: 'w',
            name: 'Hawaiian',
            value: 'hawaiian'
          }
        ]
      },
      {
        type: 'rawlist',
        name: 'beverage',
        message: 'You also get a free 2L beverage',
        choices: ['Pepsi', '7up', 'Coke']
      },
      {
        type: 'input',
        name: 'comments',
        message: 'Any comments on your purchase experience?',
        default: 'Nope, all good!'
      },
      {
        type: 'list',
        name: 'prize',
        message: 'For leaving a comment, you get a freebie',
        choices: ['cake', 'fries'],
        when: function (answers) {
          return answers.comments !== 'Nope, all good!';
        }
      }
    ];

    inquirer.prompt(questions).then(answers => {
      console.log('\nOrder receipt:');
      console.log(JSON.stringify(answers, null, '  '));
    });
  }
};
