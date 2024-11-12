const path = require("path");
const fs = require("fs-extra");
const inquirer = require("inquirer");
const chalk = require("chalk");

const tui = require("./tui");

/**
 * @param {string} projectDirectory
 */
async function BootstrapApp(projectDirectory) {
  const projectPath = path.resolve(process.cwd(), projectDirectory);

  console.clear();
  console.log(
    chalk.blue(
      "Welcome\n",
    ),
  );
  console.log(chalk.green("Press ^C at any time to quit."));

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

