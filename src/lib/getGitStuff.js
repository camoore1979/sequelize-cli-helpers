'use strict';

const { spawnSync } = require('child_process');

// git rev-parse --abbrev-ref HEAD
const git = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']);

const getGit = () =>
  `${git.stdout
    .toString()
    .split('/')
    .pop()
    .trim()}`;

module.exports = getGit;
