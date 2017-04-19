'use strict';

const fs = require('fs');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.project = {};
  }

  askProjectName() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Name of project',
        default: '404busters-project',
      },
      {
        type: 'list',
        name: 'license',
        message: 'License of project',
        choices: [
          'MIT',
          'BSD-2-Clause',
          'BSD-3-Clause',
        ],
        default: 'MIT',
      },
    ])
      .then((answers) => {
        this.project.name = answers.name;
        this.project.license = answers.license;
        this.project.repository = `404busters/${answers.name}`;
        this.project.homepage = `github.com/404busters/${answers.name}`;
        this.project.author = { name: 'Team 404 Busters' };
        this.project.scripts = {
          build: 'gulp build',
          dev: 'gulp dev',
          gulp: 'gulp',
          server: 'gulp server',
          help: 'gulp help',
          test: 'yarn test:type && yarn test:src',
          'test:type': 'flow check',
          'test:src': 'jest',
        };
        this.project.version = '0.0.1';
      });
  }

  generatePackageFile() {
    const done = this.async();
    fs.writeFile(this.destinationPath('package.json'), JSON.stringify(this.project, null, 2), (e) => {
      if (e) {
        console.trace(e);
      }
      done(e);
    });
  }

  installBuildPackages() {
    const buildFlowPackages = [
      'gulp',
      'gulp-help',
      'gulp-util',
    ];

    const buildHtmlPackages = [
      'gulp-nunjucks',
      'gulp-htmlmin',
      'nunjucks',
      'gulp-rename',
    ];

    const buildCssPacakges = [
      'gulp-sass',
      'gulp-clean-css',
      'gulp-postcss',
    ];

    const buildJsPackages = [
      'autoprefixer',
      'babel-core',
      'babel-loader',
      'babel-plugin-syntax-flow',
      'babel-plugin-transform-flow-strip-types',
      'babel-preset-es2015',
      'webpack',
      'webpack-dev-server',
      'webpack-merge',
    ];

    const testPackages = [
      'flow-bin',
      'jest',
    ];

    const packages = [].concat(buildFlowPackages, buildHtmlPackages, buildCssPacakges, buildJsPackages, testPackages);

    this.yarnInstall(packages, { dev: true });
  }

  createGulpfile() {
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
  }

  createGulpTasks() {
    const done = this.async();
    const path = this.destinationPath('gulp');
    fs.mkdir(path, (e) => {
      if (e) {
        done(e);
      } else {
        done();
      }
    });
  }

  createBuildFiles() {
    const done = this.async();
    const path = this.destinationPath('build');
    fs.mkdir(path, (e) => {
      if (e) {
        done(e);
      } else {
        this.fs.copy(
          this.templatePath('build/webpack.*.js'),
          this.destinationPath('build')
        );
        done();
      }
    });
  }

  copyDeploymentScript() {
    this.fs.copy(
      this.templatePath('deploy.sh'),
      this.destinationPath('deploy.sh')
    );
  }

  printMessage() {
    this.log('Finish Generating');
  }
};
