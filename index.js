const fs = require('fs');
const path = require('path');
const program = require('commander');
const mkdirp = require('mkdirp');
const VERSION = require('../package').version;

const MODE_0666 = parseInt('0666', 8);
const MODE_0755 = parseInt('0755', 8);

const pkg = {
    name: program.name,
    version: '1.0.0',
    main: 'index.js',
    license: 'MIT'
};

program.name('bpcreate')
    .usage('[dir] [options]')
    .description('create a boilerplate')
    .option('-n, --name [name]', 'set project name [name]', 'hello-world')
    .option('-s, --state [lib]', 'set state library [lib]', 'react')
    .option('-l, --language [lan]', 'set language [lan] support(js|es|ts)', 'js')
    .option('    --eslint', 'generate .eslintrc file, no effect when language is typescript')
    .option('    --gitignore', 'generate .gitignore file')
    .option('    --npmignore', 'generate .npmignore file')
    .option('    --licence [lic]', 'generate licence file [lic] support(MIT|WTFPL)', 'MIT')
    .version(VERSION, '-v, --version')
    .parse(process.argv);

function write(file, str, mode) {
    fs.writeFileSync(file, str, { mode: mode || MODE_0666 });
    console.log('   \x1b[36mcreate\x1b[0m : ' + file);
}

function mkdir(base, dir) {
    const loc = path.join(base, dir);
    console.log('   \x1b[36mcreate\x1b[0m : ' + loc + path.sep);
    mkdirp.sync(loc, MODE_0755)
}

function main() {
    const dir = program.args.shift();
    mkdir(dir, '.');
    write(`${dir}/package.json`, JSON.stringify(pkg, null, 2) + '\n');
}

main();
