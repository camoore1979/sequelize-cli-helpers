'use strict';

const createFileName = require('../generators/fileName/createFileName');


module.exports = {
  command: 'abc',
  desc: 'touch a file',
  handler: argv => {
    const fileName = createFileName();
    console.log(`Saved! ${fileName}`);
  }

  // const rl = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout,
  //   prompt: `touch ${fileName}? (y/n): `
  // });

  // rl.prompt();
  // rl.on('line', line => {
  //   switch (line.trim()) {
  //   case 'n':
  //     return rl.close();
  //   case 'y':
  //     // fs.writeFile(fileName, null, err => err && Error.throw(err));
  //     // eslint-disable-next-line no-console

  //     return rl.close();
  //   default:
  //     break;
  //   }
  //   return rl.prompt();
  // }).on('close', () => {
  // });
};
