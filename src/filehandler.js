import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import chalk from 'chalk';

const MODE_0666 = parseInt('0666', 8);
const MODE_0755 = parseInt('0755', 8);
const TEMPLATE_DIR = path.join(__dirname, '..', 'templates');

const write = (file, str, mode) => {
    fs.writeFileSync(file, str, { mode: mode || MODE_0666, });
    console.log(`${chalk.blueBright('   create: ')}${file}`);
};

const mkdir = (base, dir) => {
    const loc = path.join(base, dir);
    console.log(`${chalk.blueBright('   create: ')}${loc}${path.sep}`);
    mkdirp.sync(loc, MODE_0755);
};

const copyTemplate = (from, to) => {
    write(to, fs.readFileSync(path.join(TEMPLATE_DIR, from), 'utf-8'));
};

const copyTemplateMulti = (fromDir, toDir, excludes) => {
    fs.readdirSync(path.join(TEMPLATE_DIR, fromDir))
        .filter(!!excludes ? file => excludes.indexOf(file) === -1 : () => true)
        .forEach(name => void (copyTemplate(path.join(fromDir, name), path.join(toDir, name))));
};

export default { write, mkdir, copyTemplate, copyTemplateMulti, };
