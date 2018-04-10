import fs from 'fs';
import path from 'path';
import program from 'commander';
import jsonfile from 'promise-jsonfile';
import chalk from 'chalk';
import shell from 'shelljs';
import ora from 'ora';

import utils from './src/utils';
import { version as VERSION, } from './package.json';

const { spinnerEcho, } = utils;
const TEMPLATE_DIR = path.join(__dirname, '..', 'templates');
const BPC_NAME = chalk.bold.blue(`boilerplate-creator ${VERSION}`);
const legalTemps = ['npm', 'cli', 'react', 'react-ts',];
const legalLics = ['MIT', 'WTFPL', 'Apache', 'GPL', 'BSD', 'Mozilla',];

// error if no npm
if(!shell.which('npm') || !shell.which('node')) {
    shell.echo(`${chalk.red('Error:')} boilerplate-creator requires npm and nodejs`);
    shell.exit(1);
}

program.name(chalk.green('bpc'))
    .usage(chalk.green('[project name] [options]'))
    .description(`${BPC_NAME}: create a boilerplate`)
    .option('-t, --template [temp]', `which template to use [temp] support(${legalTemps.join('|')})`, 'react')
    .option('-l, --licence [lic]', `generate licence file [lic] e.g.(${legalLics.join('|')})`, 'MIT')
    .option('-f, --force', 'force on non-empty directory')
    .version(VERSION, '-v, --version')
    .parse(process.argv);

// error if ileegal template name
if(legalTemps.indexOf(program.template) === -1) {
    shell.echo(`${chalk.red('Error:')} illegal template '${chalk.red(program.template)}'`);
    shell.exit(1);
}

// get destination name
const projectName = program.args.shift().replace(/\//g, '');
// if project is an app, otherwise it's a npm library or a cli tool
const isApp = program.template !== 'npm' && program.template !== 'cli';
// other variables and constants
let spinner;
const start = new Date().getTime();

shell.echo();
shell.echo(BPC_NAME);

// check if target folder or file exists
if(!program.force && utils.fExists(projectName)) {
    shell.echo();
    if(!utils.confirm(`${chalk.yellow(projectName)} already exists, overwrite it? [y/N]`)) {
        shell.exit(1);
    }
}

// read package.json
spinner = spinnerEcho(chalk.magentaBright('initializing configuration file', 'succeed'));
jsonfile.read(path.join(TEMPLATE_DIR, program.template, 'package.json')).then(pkg => {
    spinner.succeed();
    // remove target folder if exists
    shell.rm('-rf', projectName);
    // create target folder and copy configuration files into it
    utils.mkdir(projectName);
    utils.copyTemplateMulti('_common', `${projectName}`, ['package.json',]);
    utils.copyTemplateMulti(program.template, `${projectName}`, ['package.json',]);
    pkg.licence = program.licence;
    pkg.name = projectName;
    utils.write(`${projectName}/package.json`, `${JSON.stringify(pkg, null, 2)}\n`);
    // cd into target folder
    shell.cd(projectName);
    // install
    spinner = spinnerEcho(chalk.magentaBright('installing npm dependencies, this may take a while'));
    shell.exec('npm install', {silent: true,}, () => {
        // done
        spinner.succeed();
        if(isApp) {
            spinnerEcho(chalk.magentaBright('Get started with following commands: '), 'info');
            shell.echo();
            shell.echo(`   ${chalk.yellow('$')} ${chalk.blueBright(`cd ${projectName}`)}`);            
            shell.echo(`   ${chalk.yellow('$')} ${chalk.blueBright('npm start')}`);            
        }
        spinnerEcho(chalk.magentaBright(`done in ${((new Date().getTime() - start) / 1e3).toFixed(2)}s, enjoy it!`), 'succeed');
    });
}).catch(err => {
    throw err;
});
