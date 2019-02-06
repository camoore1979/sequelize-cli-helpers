'use strict';

const readline = require('readline');

const createFileName = require('./createFileName');

const doStuff = () => {
  const fileName = createFileName();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `touch ${fileName}? (y/n): `
  });

  rl.prompt();
  rl.on('line', line => {
    switch (line.trim()) {
    case 'n':
      return rl.close();
    case 'y':
      // fs.writeFile(fileName, null, err => err && Error.throw(err));
      // eslint-disable-next-line no-console
      console.log(`Saved! ${fileName}`);
      return rl.close();
    default:
      break;
    }
    return rl.prompt();
  }).on('close', () => {
    process.exit(0);
  });
};

module.exports = doStuff;
