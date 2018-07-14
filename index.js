import fs from 'fs';
import path from 'path';
import program from 'commander';
import jsonfile from 'promise-jsonfile';
import chalk from 'chalk';
import shell from 'shelljs';
import ora from 'ora';

import utils from './src/utils';
import { version as VERSION } from './package.json';

const { spinnerEcho } = utils;
const TEMPLATE_DIR = path.join(__dirname, '..', 'templates');
const BPC_NAME = chalk.bold.blue(`boilerplate-creator ${VERSION}`);
const npmTemps = ['npm', 'npm-ts', 'cli', 'cli-ts'];
const legalTemps = npmTemps.concat(['react', 'react-ts', 'vue', 'vue-ts']);
const legalTempsHintStr = legalTemps
    .reduce((acc, temp) => `${acc}|${chalk.yellow(temp)}`, '')
    .slice(1);
const legalLics = ['MIT', 'WTFPL', 'Apache', 'GPL', 'BSD', 'Mozilla'];

// error if no npm
if (!shell.which('npm') || !shell.which('node')) {
    shell.echo(
        `${chalk.red('Error:')} boilerplate-creator requires npm and nodejs.`
    );
    shell.exit(1);
}

// build a cli program
program
    .name(chalk.green('bpc'))
    .usage(chalk.green('[project name] [options]'))
    .description(`${BPC_NAME}: create a boilerplate quickly`)
    .option(
        '-t, --template [temp]',
        `which template to use [temp] support(${legalTempsHintStr})`,
        'react'
    )
    .option(
        '-l, --license [lic]',
        `generate license file [lic] e.g.(${legalLics.join('|')})`,
        'MIT'
    )
    .option('-f, --force', 'force on non-empty directory')
    .option(
        '    --ts',
        'use typescript, \'bpc demo -t react-ts\' is equivalent to \'bpc demo -t react --ts\''
    )
    .version(VERSION, '-v, --version')
    .parse(process.argv);

// handle typescript option
if (program.ts && program.template.slice(-3, 0) !== '-ts') {
    program.template += '-ts';
}

// error if ileegal template name
if (legalTemps.indexOf(program.template) === -1) {
    shell.echo(
        `${chalk.red('Error:')} illegal template '${chalk.red(
            program.template
        )}'`
    );
    shell.echo(`Support (${legalTempsHintStr}).`);
    shell.exit(1);
}

// get destination name
let projectName;
try {
    projectName = program.args.shift().replace(/\//g, '');
} catch (e) {
    // output help document if no project name is given
    shell.echo();
    shell.echo(chalk.red('  Illegal Usage!'));
    program.outputHelp();
    shell.exit(1);
}
// if project is an app, otherwise it's a npm library or a cli tool
const isApp = npmTemps.indexOf(program.template) === -1;
// other variables and constants
let spinner;
const start = new Date().getTime();

shell.echo();
shell.echo(BPC_NAME);

// check if target folder or file exists
if (!program.force && utils.fExists(projectName)) {
    shell.echo();
    if (
        !utils.confirm(
            `${chalk.yellow(projectName)} already exists, overwrite it? [y/N]`
        )
    ) {
        shell.exit(1);
    }
}

// read package.json
spinner = spinnerEcho(
    chalk.magentaBright('initializing configuration file', 'succeed')
);
jsonfile
    .read(path.join(TEMPLATE_DIR, program.template, 'pkg.json'))
    .then(pkg => {
        spinner.succeed();
        // remove target folder if exists
        shell.rm('-rf', projectName);
        // create target folder and copy configuration files into it
        utils.mkdir(projectName);
        utils.copyTemplateMulti('_common', `${projectName}`, ['pkg.json']);
        utils.copyTemplateMulti(program.template, `${projectName}`, [
            'pkg.json'
        ]);
        pkg.license = program.license;
        pkg.name = projectName;
        utils.write(
            `${projectName}${path.sep}package.json`,
            `${JSON.stringify(pkg, null, 2)}\n`
        );
        // cd into target folder
        shell.cd(projectName);
        // install
        spinner = spinnerEcho(
            chalk.magentaBright(
                'installing npm dependencies, this may take a while'
            )
        );
        shell.exec('npm install', { silent: true }, () => {
            // done
            spinner.succeed();
            if (isApp) {
                spinnerEcho(
                    chalk.magentaBright(
                        'Get started with following commands: '
                    ),
                    'info'
                );
                shell.echo();
                shell.echo(
                    `   ${chalk.yellow('$')} ${chalk.blueBright(
                        `cd ${projectName}`
                    )}`
                );
                shell.echo(`   ${chalk.yellow('$')} # do something`);
                shell.echo(
                    `   ${chalk.yellow('$')} ${chalk.blueBright('npm start')}`
                );
            } else {
                spinnerEcho(
                    chalk.magentaBright(
                        'Edit your code and build the project: '
                    ),
                    'info'
                );
                shell.echo();
                shell.echo(
                    `   ${chalk.yellow('$')} ${chalk.blueBright(
                        `cd ${projectName}`
                    )}`
                );
                shell.echo(`   ${chalk.yellow('$')} # do something`);
                shell.echo(
                    `   ${chalk.yellow('$')} ${chalk.blueBright(
                        'npm run build'
                    )}`
                );
            }
            spinnerEcho(
                chalk.magentaBright(
                    `done in ${((new Date().getTime() - start) / 1e3).toFixed(
                        2
                    )}s, enjoy it!`
                ),
                'succeed'
            );
        });
    })
    .catch(err => {
        throw err;
    });
