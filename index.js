import fs from 'fs';
import path from 'path';
import program from 'commander';
import jsonfile from 'promise-jsonfile';

import filehandler from './src/filehandler';
import { version as VERSION, } from './package.json';

const TEMPLATE_DIR = path.join(__dirname, '..', 'templates');

program.name('bpcreate')
    .usage('[project name] [options]')
    .description('create a boilerplate')
    .option('-t, --template [temp]', 'which template to use [temp] support(npm|cli|react)', 'npm')
    .option('-l, --licence [lic]', 'generate licence file [lic] support(MIT|WTFPL)', 'MIT')
    .version(VERSION, '-v, --version')
    .parse(process.argv);

const projectName = program.args.shift();

if (projectName === '_common') {
    throw new Error('illegal template name');
}

function main() {
    filehandler.mkdir(projectName);
    filehandler.copyTemplateMulti('_common', `${projectName}`, ['package.json',]);
    filehandler.copyTemplateMulti(program.template, `${projectName}`, ['package.json',]);
    jsonfile.read(path.join(TEMPLATE_DIR, program.template, 'package.json')).then(pkg => {
        pkg.licence = program.licence;
        pkg.name = projectName;
        filehandler.write(`${projectName}/package.json`, `${JSON.stringify(pkg, null, 2)}\n`);
    }).catch(err => {
        throw err;
    });
}

main();
