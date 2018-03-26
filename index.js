import fs from 'fs';
import path from 'path';
import program from 'commander';

import filehandler from './src/filehandler';
import { version as VERSION, } from './package.json';

import pkgCli from './templates/cli/package.json';
import pkgReact from './templates/react/package.json';

const pkgs = { cli: pkgCli, react: pkgReact, };

program.name('bpcreate')
    .usage('[dir] [options]')
    .description('create a boilerplate')
    .option('-t, --template [temp]', 'which template to use [temp] support(react|cli)', 'react')
    .option('-l, --licence [lic]', 'generate licence file [lic] support(MIT|WTFPL)', 'MIT')
    .version(VERSION, '-v, --version')
    .parse(process.argv);

const projectName = program.args.shift();

Object.values(pkgs).forEach(pkg => {
    pkg.licence = program.licence;
    pkg.name = projectName;
});

function main() {
    filehandler.mkdir(projectName, '.');
    filehandler.copyTemplateMulti(program.template, `${projectName}`, ['package.json',]);
    filehandler.write(`${projectName}/package.json`, `${JSON.stringify(pkgs[program.template], null, 2)}\n`);
}

main();
