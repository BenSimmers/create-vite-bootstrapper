const path = require("path");
const fs = require("fs-extra");
const inquirer = require("inquirer");
const chalk = require("chalk");

const tui = require("./tui");
const REPOURL = require("./constants").REPOURL;


/**
 * @param {string} projectDirectory
 */
async function BootstrapApp(projectDirectory) {
  const projectPath = path.resolve(process.cwd(), projectDirectory);

  console.clear();
  console.log(
    chalk.blue(
      "Welcome to the React TypeScript Vite Tailwind CSS Bootstrapper!\n",
    ),
  );
  console.log(chalk.green("Press ^C at any time to quit."));
  console.log(chalk.yellow(`To view the template, visit: ${REPOURL}\n`));

  if (fs.existsSync(projectPath)) {
    console.error(chalk.red(`Error: Directory ${projectPath} already exists.`));
    process.exit(1);
  }

  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: path.basename(projectPath),
    },
  ]);

  await tui(projectPath, projectName, projectDirectory);
}

module.exports = BootstrapApp;

