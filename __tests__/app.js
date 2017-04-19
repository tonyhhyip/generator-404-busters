'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

/* globals jest, it, expect, describe, beforeEach, describe */

describe('404-busters', () => {
  beforeEach(() => helpers.run(path.join(__dirname, '..', 'generators', 'app'))
    .withPrompts({
      name: 'foo',
      license: 'MIT',
    }));

  it('file generate', () => {
    assert.file([
      'package.json',
      'gulpfile.js',
      'build/webpack.config.base.js',
      'deploy.sh',
    ]);
  });

  it('package.json', () => {
    assert.JSONFileContent('package.json', {
      name: 'foo',
      license: 'MIT',
      homepage: 'github.com/404busters/foo',
      repository: '404busters/foo',
      version: '0.0.1',
    });
  });
});
