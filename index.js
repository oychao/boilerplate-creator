import fs from 'fs';
import path from 'path';
import program from 'commander';
import jsonfile from 'jsonfile';

import filehandler from './src/filehandler';
import { version as VERSION, } from './package.json';

const TEMPLATE_DIR = path.join(__dirname, '..', 'templates');

program.name('bpcreate')
    .usage('[dir] [options]')
    .description('create a boilerplate')
    .option('-t, --template [temp]', 'which template to use [temp] support(react|cli)', 'react')
    .option('-l, --licence [lic]', 'generate licence file [lic] support(MIT|WTFPL)', 'MIT')
    .version(VERSION, '-v, --version')
    .parse(process.argv);

const projectName = program.args.shift();

function main() {
    filehandler.mkdir(projectName, '.');
    filehandler.copyTemplateMulti(program.template, `${projectName}`, ['package.json',]);
    jsonfile.readFile(path.join(TEMPLATE_DIR, program.template, 'package.json'), (err, pkg) => {
        if (err) {
            throw err;
        }
        pkg.licence = program.licence;
        pkg.name = projectName;
        filehandler.write(`${projectName}/package.json`, `${JSON.stringify(pkg, null, 2)}\n`);
    });
}

main();
