const path = require("path");
const fs = require("fs-extra");
const inquirer = require("inquirer");
const chalk = require("chalk");
const tui = require("./tui");

/**
 * Clear the console and display the welcome message.
 */
const displayWelcomeMessage = () => {
  console.clear();
  console.log(chalk.blue("Welcome\n"));
  console.log(chalk.green("Press ^C at any time to quit."));
};


/**
 * Check if the project directory already exists.
 * @param {string} projectPath
 */
const checkProjectDirectory = (projectPath) => {
  if (fs.existsSync(projectPath)) {
    console.error(chalk.red(`Error: Directory ${projectPath} already exists.`));
    process.exit(1);
  }
};

/**
 * Prompt the user for the project name.
 * @returns {Promise<string>}
 */
const promptProjectName = async () => {
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Enter the project name:",
    },
  ]);
  return projectName;
};

/**
 * Bootstrap the application.
 * @param {string} projectDirectory
 */
async function BootstrapApp(projectDirectory) {
  try {
    const projectPath = path.resolve(process.cwd(), projectDirectory);

    displayWelcomeMessage();
    checkProjectDirectory(projectPath);

    const projectName = await promptProjectName();
    await tui(projectPath, projectName, projectDirectory);
  } catch (error) {
    console.error(chalk.red("An error occurred:"), error);
  }
}

module.exports = BootstrapApp;
