'use strict';

// for testing, see https://medium.com/@zorrodg/integration-tests-on-node-js-cli-part-2-testing-interaction-user-input-6f345d4b713a
// https://github.com/ewnd9/inquirer-test

const test = require('tape');
// const {
//   fork, spawn
// } = require('child_process');

const cmd = require('./helper/cmd');
const { ENTER } = cmd;

// const getStream = require('get-stream');
const stringToStream = require('string-to-stream');

// const {
//   chunksToLinesAsync, chomp
// } = require('@rauschma/stringio');

// async function echoReadable(readable) {
//   for (const line of await chunksToLinesAsync(readable)) {
//     // (C)
//     console.log('LINE: ' + chomp(line));
//   }
// }

test('setup getAddress', function (t) {
  //run setup_test_db.sh
  t.equal(1, 1, 'it works');
  t.end();
});

test('sCliHelpers ', async function (t) {
  //run setup_test_db.sh
  // const sCliHelpers = spawn('node index.js touch');

  // const source = spawn('node', ['index.js', 'touch'], ['pipe', 'pipe', 'inherit']);
  //, { stdio: ['ignore', 'pipe', process.stderr] }); // (A)

  const myProcess = cmd.create('index.js');
  const response = await myProcess.execute(['touch'],
    [
      'y', 
      ENTER, 
      '',
      'y', ENTER
    ],
    { env: { DEBUG: true } });

  console.log(response);
  t.end();

  // source.stdout.on('data', data => {
  //   const incoming = data;
  //   incoming && console.log(`stdout: ${incoming}`);
  //   if (incoming.includes('enter a file description') && !incoming.includes('Y')) {
  //     // console.log(`${data}`);
  //     console.log('here 1');
  //     stringToStream('Y\x0D').pipe(source.stdin);
  //     // stringToStream('").pipe(source.stdin);
  //     // source.resume();/
  //   }

  //   const expectedFileName = '-Y.js';
  //   if (incoming.includes('Create file with name') && incoming.includes(expectedFileName)) {
  //     // console.log(`${data}`);
  //     console.log('here 2');
  //     // stringToStream('y').pipe(source.stdin);
  //     // stringToStream('").pipe(source.stdin);
  //     // source.resume();/
  //   }
  // });

  // source.stdin.on('data', data => {
  //   const incoming = data;
  //   incoming && console.log(`stdin: ${incoming}`);
  // });

  // // source.stderr.on('data', data => {
  // //   console.log(`stderr: ${data}`);
  // // });

  // source.on('error', error => {
  //   // console.log(`child process exited with code ${code}`);
  //   // t.end();
  //   console.log('Failed to start subprocess.');
  //   console.dir(error);
  //   // stringToStream('description').pipe(source.stdin);
  // });

  // source.on('exit', code => {
  //   console.log(`child process exited with code ${code}`);
  //   // t.end();

  //   // stringToStream('description').pipe(source.stdin);
  // }); // await getStream(source.stdout); // (B)

  // source.on('close', code => {
  //   console.log(`child process closed with code ${code}`);
  //   t.end();

  //   // stringToStream('description').pipe(source.stdin);
  // }); // await getStream(source.stdout); // (B)
  // await echoReadable(source.stderr); // (B)
  // console.log('source: ', source.stdout);
});
