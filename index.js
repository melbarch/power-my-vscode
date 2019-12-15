#!/usr/bin/env node
'use strict';

const exec = require('child_process').exec;
const promisify = require('util').promisify;
const asyncExec = promisify(exec);

const chalk = require('chalk');
const log = console.log;

// TODO : move this into another file :
const vsMarketPlaceItems = [
  // Linters :
  'dbaeumer.vscode-eslint',
  'ms-vscode.vscode-typescript-tslint-plugin',

  // utilities :
  'wix.vscode-import-cost',
  'msjsdiag.debugger-for-chrome',
  'kisstkondoros.vscode-codemetrics',
  'CoenraadS.bracket-pair-colorizer-2',
  'mikestead.dotenv',
  'ritwickdey.LiveServer',

  // theme :
  'sdras.night-owl'
];

let failures = 0;

const installExtension = async extentionId => {
  const command = `code --install-extension ${extentionId}`;
  const { stdout, stderr } = await asyncExec(command);
  log(chalk.blue('Begin installing ') + chalk.green(extentionId));
  if (stdout) {
    log(stdout);
  }
  if (stderr) {
    log(chalk.bold.red('Error : ') + stderr);
    failures++;
  }
};

(async () => {
  log(chalk.bold.green('Let\'s make your VS Code great again!'));
  const elementsCount = vsMarketPlaceItems.length;
  // TODO : we can try to install only uninstalled extensions as code cli provide list of already installed extensions
  for (let index = 0; index < elementsCount; index++) {
    await installExtension(vsMarketPlaceItems[index]);
  }
  if (failures === 0) {
    log(chalk.bold.green('Your VSCode have been given super powers successfully!'));
  } else {
    log(chalk.yellowBright(
      `Only ${elementsCount - failures} out of ${elementsCount} have been installed successfully!`
    ));
  }
})();
