import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import program from 'commander';
import shell from 'shelljs';
import ora from 'ora';
import readline from 'readline-sync';
import jsonfile from 'promise-jsonfile';
import fsex from 'fs-extra';
import axios from 'axios';
import { version as VERSION } from '../package.json';

// init global constants and variables
let isApp;
let templateSource;
const configFilePath = path.resolve(__dirname, '..', 'config.json');
const regexGithubAddr = /^(https:\/\/github.com\/[a-zA-Z\d-]+\/[a-zA-Z\d-]+(\.git)?)$/;
const BPC_NAME = chalk.bold.blue(`boilerplate-creator ${VERSION}`);
const npmTemps = ['npm', 'npm-ts', 'cli'];
const legalTemps = npmTemps.concat(['react', 'react-ts', 'vue', 'vue-ts']);
const legalTempsHintStr = legalTemps.reduce((acc, temp) => `${acc}|${chalk.yellow(temp)}`, '').slice(1);
const silent = {
  silent: true
};

// utils tool functions
const execAsync = async function(directive, config) {
  return new Promise(function(resolve, reject) {
    shell.exec(
      directive,
      {
        ...silent,
        ...config
      },
      () => {
        resolve();
      }
    );
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
const done = async function(spinner, projectName, isApp, isAutoInstall, startTime) {
  // done
  await fsex.remove('templates');
  await fsex.remove('.git');

  spinner.text = chalk.magentaBright('dependencies installed');
  spinner.succeed();
  spinnerEcho(
    chalk.magentaBright(isApp ? 'get started with following commands: ' : 'edit your code and build the project: '),
    'info'
  );
  shell.echo();
  shell.echo(`   ${chalk.yellow('$')} ${chalk.blueBright(`cd ${projectName}`)}`);
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
    chalk.magentaBright(`done in ${((new Date().getTime() - startTime) / 1e3).toFixed(2)}s, enjoy it!`),
    'succeed'
  );
};

const initProgram = async function() {
  // get template source
  templateSource = (await jsonfile.read(configFilePath)).source;
  // build a program
  program
    .name(chalk.green('bpc'))
    .usage('<options>')
    .description(`${BPC_NAME}: create a boilerplate quickly`)
    .option(
      '-c, --config <source>',
      `set custom source, e.g. ${chalk.yellow('https://github.com/oychao/boilerplate-creator')}`
    )
    .option('-i, --init [project name]', 'initialized a named project', 'helloworld')
    .option('-t, --template [temp]', `which template to use, [temp] support(${legalTempsHintStr})`, 'react')
    .option('-f, --force', 'force on non-empty directory')
    .option('-a, --auto', 'automatically install dependencies')
    .option('    --ts', 'use typescript, \'bpc demo -t react-ts\' is equivalent to \'bpc demo -t react --ts\'')
    // .option('-b, --branch [branch]', 'which branch to pull code from', 'master')
    .version(VERSION, '-v, --version')
    .parse(process.argv);

  // handle typescript option
  if (program.ts && program.template.slice(-3, 0) !== '-ts') {
    program.template += '-ts';
  }

  // check if the project is an app or a npm package
  isApp = -1 === npmTemps.indexOf(program.template);
};

const validate = async function() {
  const spinner = spinnerEcho(chalk.keyword('gold')(`checking if template ${program.config ? 'source ' : ''}valid`));
  const targetTemplate =
    program.config ||
    `${-1 === templateSource.indexOf('.git') ? templateSource : templateSource.slice(0, -4)}/tree/master/templates/${
      program.template
    }`;
  try {
    const res = await axios.get(targetTemplate);
    if (200 === res.status) {
      spinner.text = chalk.magentaBright('valid template source');
      spinner.succeed();
    } else {
      throw new TypeError('invalid template source');
    }
    return 1;
  } catch (error) {
    spinner.text = program.config
      ? chalk.red(`invalid template source, please check if ${program.config} is a valid github repository`)
      : chalk.red(`invalid template, please check if templates/${program.template} exists on ${templateSource}`);
    spinner.fail();
    return -1;
  }
};

const main = async function() {
  await initProgram();

  let spinner;
  const start = new Date().getTime();

  shell.echo();
  shell.echo(BPC_NAME);

  if (program.config) {
    if (regexGithubAddr.test(program.config) && -1 !== (await validate())) {
      shell.echo();
      await jsonfile.write(configFilePath, {
        source: program.config
      });
      shell.echo(chalk.green('  template source address updated'));
    }
    shell.echo();
    return;
  }

  if (-1 === (await validate())) {
    return;
  }

  // check if target folder or file exists
  const projectName = program.init;
  if (!program.force && fExists(projectName)) {
    shell.echo();
    if (!confirm(`${chalk.keyword('orange')(projectName)} already exists, overwrite it? [y/N]`)) {
      shell.exit(1);
    }
  }

  spinner = spinnerEcho(chalk.keyword('gold')('have a cup of tea while initializing project'));
  // windows, not working yet
  await fsex.remove(projectName);
  // await execAsync(`rm -rf ${projectName}`);
  await execAsync(`mkdir ${projectName}`);
  shell.cd(projectName);
  await execAsync('git init');
  await execAsync(`git remote add origin ${templateSource}`);
  await execAsync('git config core.sparseCheckout true');
  // only check specific folder
  await execAsync(`echo templates/${program.template} >> .git/info/sparse-checkout`);
  await execAsync('git pull --depth=1 origin master');
  await fsex.copy(`templates/${program.template}/`, './');
  if (program.auto) {
    spinner.text = chalk.magentaBright('project initialized.');
    spinner.succeed();
    spinner = spinnerEcho(chalk.keyword('gold')('installing dependencies'));
    await execAsync('npm i');
  }
  await done(spinner, projectName, isApp, program.install, start);
};

main();
