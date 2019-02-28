import fs from 'fs';
import chalk from 'chalk';
import program from 'commander';
import shell from 'shelljs';
import ora from 'ora';
import readline from 'readline-sync';

import {
  version as VERSION
} from '../package.json';

// init global constants and variables
let projectName;
let isApp;
const BPC_NAME = chalk.bold.blue(`boilerplate-creator ${VERSION}`);
const npmTemps = ['npm', 'npm-ts', 'cli'];
const legalTemps = npmTemps.concat(['react', 'react-ts', 'vue', 'vue-ts', 'riact', 'riact-ts']);
const legalTempsHintStr = legalTemps
  .reduce((acc, temp) => `${acc}|${chalk.yellow(temp)}`, '')
  .slice(1);
const silent = { silent: true };

// utils tool functions
const execAsync = async function (directive, config) {
  return new Promise(function(resolve, reject) {
    shell.exec(directive, { ...silent, ...config }, () => {
      resolve();
    });
  });
};
const spinnerEcho = (info, done) => {
  shell.echo();
  const spinner = new ora({
    text: info,
    color: 'green',
    spinner: 'arrow3'
  }).start();
  if (done) {
    spinner[done]();
  } else {
    return spinner;
  }
};
const confirm = (msg, cb) => /^y|yes|ok|true$/i.test(readline.question(msg));
const fExists = target => {
  try {
    fs.accessSync(target);
    return true;
  } catch (e) {
    return false;
  }
};
const done = async function (spinner, projectName, isApp, isAutoInstall, startTime) {
  // done
  shell.exec('rm -rf templates', { async: true });
  shell.exec('rm -rf .git', { async: true });

  spinner.text = chalk.magentaBright('dependencies installed.');
  spinner.succeed();
  spinnerEcho(
    chalk.magentaBright(
      isApp
        ? 'get started with following commands: '
        : 'edit your code and build the project: '
    ),
    'info'
  );
  shell.echo();
  shell.echo(
    `   ${chalk.yellow('$')} ${chalk.blueBright(`cd ${projectName}`)}`
  );
  if (!isAutoInstall) {
    shell.echo(`   ${chalk.yellow('$')} ${chalk.blueBright('npm install')}`);
  }
  shell.echo(
    isApp
      ? `   ${chalk.yellow('$')} ${chalk.blueBright('npm start')}`
      : `   ${chalk.yellow('$')} ${chalk.blueBright('npm run watch')}`
  );
  shell.echo(`   ${chalk.yellow('$')} # do something`);
  spinnerEcho(
    chalk.magentaBright(
      `done in ${((new Date().getTime() - startTime) / 1e3).toFixed(
        2
      )}s, enjoy it!`
    ),
    'succeed'
  );
};


const initProgram = async function () {
  // build a program
  program
    .name(chalk.green('bpc'))
    .usage(chalk.green('[project name] [options]'))
    .description(`${BPC_NAME}: create a boilerplate quickly`)
    .option(
      '-t, --template [temp]',
      `which template to use, [temp] support(${legalTempsHintStr})`,
      'react'
    )
    .option('-f, --force', 'force on non-empty directory')
    .option('-i, --install', 'install dependencies automatically')
    .option(
      '    --ts',
      'use typescript, \'bpc demo -t react-ts\' is equivalent to \'bpc demo -t react --ts\''
    )
  // .option('-b, --branch [branch]', 'which branch to pull code from', 'master')
    .version(VERSION, '-v, --version')
    .parse(process.argv);

  // handle typescript option
  if (program.ts && program.template.slice(-3, 0) !== '-ts') {
    program.template += '-ts';
  }

  // error if illegal template name
  if (legalTemps.indexOf(program.template) === -1) {
    shell.echo(
      `${chalk.red('Error:')} illegal template '${chalk.red(program.template)}'`
    );
    shell.echo(`Support (${legalTempsHintStr}).`);
    shell.exit(1);
  }

  // get destination name
  try {
    projectName = program.args.shift().replace(/\//g, '');
  } catch (e) {
    // output help document if no project name is given
    shell.echo();
    shell.echo(chalk.red('  Illegal Usage!'));
    program.outputHelp();
    shell.exit(1);
  }

  // check if the project is an app or a npm package
  isApp = npmTemps.indexOf(program.template) === -1;
};

const main = async function () {
  await initProgram();

  let spinner;
  const start = new Date().getTime();
  
  shell.echo();
  shell.echo(BPC_NAME);

  // check if target folder or file exists
  if (!program.force && fExists(projectName)) {
    shell.echo();
    if (
      !confirm(
        `${chalk.keyword('orange')(projectName)} already exists, overwrite it? [y/N]`
      )
    ) {
      shell.exit(1);
    }
  }

  spinner = spinnerEcho(
    chalk.keyword('gold')('have a cup of tea while initializing project')
  );
  await execAsync(`rm -rf ${projectName}`);
  await execAsync(`mkdir ${projectName}`);
  shell.cd(projectName);
  await execAsync('git init');
  await execAsync('git remote add origin https://github.com/oychao/boilerplate-creator');
  await execAsync('git config core.sparseCheckout true');
  await execAsync(`echo "templates/${program.template}" >> .git/info/sparse-checkout`);
  await execAsync('git pull --depth=1 origin master');
  await execAsync(`mv templates/${program.template}/* .`);
  await execAsync(`mv templates/${program.template}/.* .`);
  if (program.install) {
    spinner.text = chalk.magentaBright('project initialized.');
    spinner.succeed();
    spinner = spinnerEcho(chalk.keyword('gold')('installing dependencies'));
    await execAsync('npm i');
  }
  await done(spinner, projectName, isApp, program.install, start);
};

main();
