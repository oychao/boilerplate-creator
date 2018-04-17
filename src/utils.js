import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import chalk from 'chalk';
import ora from 'ora';
import shell from 'shelljs';
import readline from 'readline-sync';

const MODE_0666 = parseInt('0666', 8);
const MODE_0755 = parseInt('0755', 8);
const TEMPLATE_DIR = path.join(__dirname, '..', 'templates');

const filenameMap = {
    'npmignore': '.npmignore',
};
const __getRealname = key => filenameMap[key] || key;

const spinnerEcho = (info, done) => {
    shell.echo();
    const spinner = new ora({
        text: info,
        color: 'green',
        spinner: 'arrow3',
    }).start();
    if (done) {
        spinner[done]();
    } else {
        return spinner;
    }
};

const confirm = (msg, cb) => /^y|yes|ok|true$/i.test(readline.question(msg));

const write = (file, str, mode) => {
    fs.writeFileSync(file, str, { mode: mode || MODE_0666, });
    shell.echo(`${chalk.cyanBright('   create: ')}${file}`);
};

const mkdir = (base, dir = '.') => {
    const loc = path.join(base, dir);
    mkdirp.sync(loc, MODE_0755);
    shell.echo(`${chalk.cyanBright('   create: ')}${loc}${path.sep}`);
};

const copyTemplate = (from, to) => {
    if (fs.lstatSync(path.join(TEMPLATE_DIR, from)).isDirectory()) {
        if (!fs.existsSync(to)) {
            mkdir(to);
        }
        copyTemplateMulti(from, to);
    } else {
        write(to, fs.readFileSync(path.join(TEMPLATE_DIR, from), 'utf-8'));
    }
};

const copyTemplateMulti = (fromDir, toDir, excludes) => {
    fs.readdirSync(path.join(TEMPLATE_DIR, fromDir))
        .filter(!!excludes ? file => excludes.indexOf(file) === -1 : () => true)
        .forEach(name => {
            copyTemplate(path.join(fromDir, name), path.join(toDir, __getRealname(name)));
        });
};

const fExists = target => {
    try {
        fs.accessSync(target);
        return true;
    } catch (e) {
        return false;
    }
};

export default { spinnerEcho, confirm, write, mkdir, copyTemplate, copyTemplateMulti, fExists, };
