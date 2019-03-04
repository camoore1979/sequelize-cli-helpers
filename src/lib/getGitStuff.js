'use strict';

const { spawnSync } = require('child_process');

// git rev-parse --abbrev-ref HEAD
const git = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']);

/**
 * @function getGitInfo
 * @description returns string of branch name past the first forward slash, '/'
 * e.g. a branch name of issue/#1-root-end-point, this will return '#1-root-end-point'
 * @returns {string}
 */
const getGitInfo = () =>
  `${git.stdout
    .toString()
    .split('/')
    .pop()
    .trim()}`;

module.exports = getGitInfo;
