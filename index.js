import fs from 'fs';
import path from 'path';
import program from 'commander';
import jsonfile from 'promise-jsonfile';
import chalk from 'chalk';
import shell from 'shelljs';
import ora from 'ora';

import utils from './src/utils';

import filehandler from './src/filehandler';
import { version as VERSION, } from './package.json';

const { spinnerEcho, } = utils;
const TEMPLATE_DIR = path.join(__dirname, '..', 'templates');
const legalTemps = ['npm', 'cli', 'react', 'react-ts',];

// error if no npm
if(!shell.which('npm') || !shell.which('node')) {
    shell.echo(`${chalk.red('Error:')} boilerplate-generator requires npm and nodejs`);
    shell.exit(1);
}

program.name('bpcreate')
    .usage('[project name] [options]')
    .description('create a boilerplate')
    .option('-t, --template [temp]', `which template to use [temp] support(${legalTemps.join('|')})`, 'npm')
    .option('-l, --licence [lic]', 'generate licence file [lic] support(MIT|WTFPL)', 'MIT')
    .version(VERSION, '-v, --version')
    .parse(process.argv);

if(legalTemps.indexOf(program.template) === -1) {
    shell.echo(`${chalk.red('Error:')} illegal template '${chalk.red(program.template)}'`);
    shell.exit(1);
}

const projectName = program.args.shift();

if (projectName === '_common') {
    throw new Error('illegal template name');
}

function main() {
    let spinner;
    // if project is an app, otherwise it's a npm library or a cli tool
    const isApp = program.template !== 'npm' && program.template !== 'cli';
    const start = new Date().getTime();
    shell.echo();
    shell.echo(chalk.bold.blue(`boilerplate-generator ${VERSION}`));
    // read package.json
    spinner = spinnerEcho(chalk.magentaBright('initializing configuration file', 'succeed'));
    jsonfile.read(path.join(TEMPLATE_DIR, program.template, 'package.json')).then(pkg => {
        spinner.succeed();
        // remove target folder if exists
        shell.rm('-rf', projectName);
        // create target folder and copy configuration files into it
        filehandler.mkdir(projectName);
        filehandler.copyTemplateMulti('_common', `${projectName}`, ['package.json',]);
        filehandler.copyTemplateMulti(program.template, `${projectName}`, ['package.json',]);
        pkg.licence = program.licence;
        pkg.name = projectName;
        filehandler.write(`${projectName}/package.json`, `${JSON.stringify(pkg, null, 2)}\n`);
        // cd into target folder
        shell.cd(projectName);
        // install
        spinner = spinnerEcho(chalk.magentaBright('installing npm dependencies, this may take a while'));
        shell.exec('npm install', {silent: true,}, () => {
            // done
            spinner.succeed();
            if(isApp) {
                spinnerEcho(chalk.magentaBright('Get started with following commands: '), 'info');
                shell.echo(`   ${chalk.yellow('$')} ${chalk.blueBright(`cd ${projectName}`)}`);            
                shell.echo(`   ${chalk.yellow('$')} ${chalk.blueBright('npm start')}`);            
            }
            spinnerEcho(chalk.magentaBright(`done in ${((new Date().getTime() - start) / 1e3).toFixed(2)}s, enjoy it!`), 'succeed');
        });
    }).catch(err => {
        throw err;
    });
}

main();
