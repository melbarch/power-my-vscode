#!/usr/bin/env node
'use strict';

const program = require('commander');
const { exec } = require('child_process');
const fs = require('fs');
const { promisify } = require('util');
const asyncExec = promisify(exec);

const readFileAsync = promisify(fs.readFile);

const chalk = require('chalk');
const log = console.log;

let failures = 0;

const installExtension = async extentionId => {
  const command = `code --install-extension ${extentionId}`;
  const { stdout, stderr } = await asyncExec(command);
  log(chalk.blue('Begin installing ') + chalk.green(extentionId));
  if (stdout) {
    log(stdout);
  }
  if (stderr.includes('Failed Installing')) {
    log(chalk.bold.red('[Error]') + stderr);
    failures++;
  } else if (stderr) {
    log(chalk.yellow('[Warning]') + stderr);
  }
};

const loadSettingsFromFile = async filePath => {
  return JSON.parse(await readFileAsync(filePath, 'utf8'));
};

(async () => {
  program
    .option('-a, --auto', 'Detect current git user to retrieve his config')
    .option(
      '-g, --gitub-username <github_username>',
      'github username to use to lookup the fork'
    )
    .option(
      '-f, --file <filepath/to/file.json>',
      'file system path to extensions json file'
    )
    .option('-u, --url <url-to-json-file>', 'url to extensions json file')
    .parse(process.argv);

  let settings;

  if (program.gitubUsername) {
    // settings = loadSettingsFromGithub(program.gitubUsername);
    log(chalk.bold.red('Not yet implemented'));
    process.exit(1);
  } else if (program.file) {
    settings = await loadSettingsFromFile(program.file);
  } else if (program.url) {
    // settings = await loadSettingsFromUrl(program.url);
    log(chalk.bold.red('Not yet implemented'));
    process.exit(1);
  } else if (program.auto) {
    /*
    const {stdout, stderr} = await asyncExec('git config --global user.name');
    let currentUser;
    if (stdout) {
      currentUser = stdout;
    }
    if (stderr) {
      log(chalk.bold.red('Something went wrong! : ') + stderr);
    }
    settings = await loadSettingsFromUrl(getGithubSettingsUrl(currentUser));
    */
    log(chalk.bold.red('Not yet implemented'));
    process.exit(1);
  } else {
    settings = await loadSettingsFromFile('.vs-extensions.json');
  }

  const vsMarketPlaceItems = settings.extensions;
  log(chalk.bold.green('Let\'s make your VS Code great again!'));
  const elementsCount = vsMarketPlaceItems.length;
  for (let index = 0; index < elementsCount; index++) {
    await installExtension(vsMarketPlaceItems[index]);
  }
  if (failures === 0) {
    log(
      chalk.bold.green('Your VSCode have been given super powers successfully!')
    );
  } else {
    log(
      chalk.yellowBright(
        `Only ${elementsCount -
          failures} out of ${elementsCount} have been installed successfully!`
      )
    );
  }
})();
