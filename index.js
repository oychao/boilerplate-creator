import fs from 'fs';
import path from 'path';
import program from 'commander';

import filehandler from './src/filehandler';
import { version as VERSION } from './package.json';

import p1 from './templates/1/package.json';

const pkgs = { '1': p1 };

program.name('bpcreate')
    .usage('[dir] [options]')
    .description('create a boilerplate')
    .option('    --template [temp]', 'which template to use [temp] support(1)', 1)
    .option('    --licence [lic]', 'generate licence file [lic] support(MIT|WTFPL)', 'MIT')
    .version(VERSION, '-v, --version')
    .parse(process.argv);

const projectName = program.args.shift();

Object.values(pkgs).forEach(pkg => {
    pkg.licence = program.licence;
    pkg.name = projectName;
});

function main() {
    filehandler.mkdir(projectName, '.');
    filehandler.copyTemplateMulti('1', `${projectName}`, ['package.json']);
    filehandler.write(`${projectName}/package.json`, `${JSON.stringify(pkgs[program.template], null, 2)}\n`);
}

main();
