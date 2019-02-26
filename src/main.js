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

// utils tool functions
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
const done = (spinner, projectName, isApp, isAutoInstall, startTime) => {
  // done
  shell.exec('rm -rf templates', { async: true });
  shell.exec('rm -rf .git', { async: true });

  spinner.text = 
  chalk.magentaBright('project initialized.');
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
  shell.echo(`   ${chalk.yellow('$')} # do something`);
  shell.echo(
    isApp
      ? `   ${chalk.yellow('$')} ${chalk.blueBright('npm start')}`
      : `   ${chalk.yellow('$')} ${chalk.blueBright('npm run watch')}`
  );
  spinnerEcho(
    chalk.magentaBright(
      `done in ${((new Date().getTime() - startTime) / 1e3).toFixed(
        2
      )}s, enjoy it!`
    ),
    'succeed'
  );
};


const initProgram = function () {
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

function main() {
  initProgram();

  let spinner;
  const start = new Date().getTime();
  
  shell.echo();
  shell.echo(BPC_NAME);

  // check if target folder or file exists
  if (!program.force && fExists(projectName)) {
    shell.echo();
    if (
      !confirm(
        `${chalk.yellow(projectName)} already exists, overwrite it? [y/N]`
      )
    ) {
      shell.exit(1);
    }
  }

  spinner = spinnerEcho(
    chalk.keyword('orange')('have a cup of coffee while initializing project')
  );
  shell.exec(`rm -rf ${projectName}`);
  shell.mkdir(projectName);
  shell.cd(projectName);
  shell.exec('git init', { silent: true });
  shell.exec('git remote add origin https://github.com/oychao/boilerplate-creator', { silent: true });
  shell.exec('git config core.sparseCheckout true', { silent: true });
  shell.exec(`echo "templates/${program.template}" >> .git/info/sparse-checkout`, { silent: true });
  shell.exec('git pull --depth=1 origin master', { silent: true }, () => {
    shell.mv(`templates/${program.template}/*`, '.');
    shell.mv(`templates/${program.template}/.*`, '.');
    if (program.install) {
      spinner.text = chalk.keyword('orange')('installing dependencies')
      shell.exec('npm i', { silent: true }, () => {
        done(spinner, projectName, isApp, true, start);
      });
    } else {
      done(spinner, projectName, isApp, true, start);
    }
  });
}

main();
