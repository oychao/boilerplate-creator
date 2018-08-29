import chalk from 'chalk';
import shell from 'shelljs';

import utils from './utils';

const { spinnerEcho } = utils;

/**
 * @description
 * @param {Object} spinner
 * @param {String} projectName
 * @param {Boolean} isApp
 * @param {Boolean} isAutoInstall
 * @param {Number} startTime
 */
export default (spinner, projectName, isApp, isAutoInstall, startTime) => {
  // done
  spinner.succeed();
  spinnerEcho(
    chalk.magentaBright(
      isApp
        ? 'Get started with following commands: '
        : 'Edit your code and build the project: '
    ),
    'info'
  );
  shell.echo();
  shell.echo(
    `   ${chalk.yellow('$')} ${chalk.blueBright(`cd ${projectName}`)}`
  );
  if (!isAutoInstall) {
    shell.echo(`   ${chalk.yellow('$')} ${chalk.blueBright('npm install')}`);
  }
  shell.echo(`   ${chalk.yellow('$')} # do something`);
  shell.echo(
    isApp
      ? `   ${chalk.yellow('$')} ${chalk.blueBright('npm start')}`
      : `   ${chalk.yellow('$')} ${chalk.blueBright('npm run build')}`
  );
  spinnerEcho(
    chalk.magentaBright(
      `done in ${((new Date().getTime() - startTime) / 1e3).toFixed(
        2
      )}s, enjoy it!`
    ),
    'succeed'
  );
};
