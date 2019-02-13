'use strict';

const { spawnSync } = require('child_process');

// git rev-parse --abbrev-ref HEAD
// e.g. task/MEST-1221
const git = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
const getGit = () => `${git.stdout
  .toString()
  .split('/')
  .pop()
  .trim()}`;

module.exports = getGit;
