
const moment = require('moment');
// const fs = require('fs');
// const path = require('path');
const { spawnSync } = require('child_process');


const createFileName = () => {
  const randomString = () =>
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);

  const slug =
    process.argv.slice(2).length > 0
      ? process.argv.slice(2).pop()
      : randomString();

  // git rev-parse --abbrev-ref HEAD
  // e.g. task/MEST-1221
  const git = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
  const branch = `${git.stdout
    .toString()
    .split('/')
    .pop()
    .trim()}`;

  // const dir = path.join(__dirname, '../', 'migrations');
  // const re = new RegExp(branch);

  const dir = '/folder/';
  const count = 2;
  // const count = fs
  //   .readdirSync(dir)
  //   .map(file => file)
  //   .reduce((result, file) => (re.test(file) ? result + 1 : result), 1);

  const dts = moment().format('YYYYMMDDHHmmss');
  const script = `${dts}-0${count.toString()}-${branch}-${slug}.js`;
  // const fileName = path.join(dir, script);
  const fileName = `${dir}/${script}`;

  return fileName;
};

module.exports = createFileName;
