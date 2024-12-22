const execa = require("execa");
const chalk = require("chalk");
const inquirer = require("inquirer");
const REPOURL = require("./constants").REPOURL;
const APIURL = require("./constants").APIURL;
const LIBURL = require("./constants").LIBURL;

const TEMPLATE_CHOICES = {
  REACT_TS_VITE_TAILWIND: "React TS Vite Tailwind Front-end",
  BUN_TS_BACKEND_API: "Bun TS Backend API",
  TS_LIBRARY_PROJECT: "TypeScript Library/Project Template",
};

/**
 * Clone the repository to the specified path.
 * @param {string} url
 * @param {string} path
 */
const cloneRepository = async (url, path) => {
  console.log(chalk.green("\nCloning the repository..."));
  await execa("git", ["clone", url, path]);
};

/**
 * Handle the Redux template branch.
 * @returns {Promise<void>}
 * */
const handleReduxTemplate = async () => {
  const { redux } = await inquirer.prompt([
    {
      type: "confirm",
      name: "redux",
      message: "Would you like to use the Redux template branch?",
    },
  ]);

  if (redux) {
    console.log(chalk.green("\nChecking out the Redux template branch..."));
    await execa("git", ["checkout", "tech/redux-and-react-19"]);
  }
};

/**
 * @param {string} projectPath
 * @returns {Promise<void>}
 * */
async function tui(projectPath) {
  try {
    console.log(chalk.green("Choose what template you want to use:"));
    const { template } = await inquirer.prompt([
      {
        type: "list",
        name: "template",
        message: "Choose a template for either front-end or back-end development:",
        choices: Object.values(TEMPLATE_CHOICES),
      },
    ]);

    switch (template) {
      case TEMPLATE_CHOICES.REACT_TS_VITE_TAILWIND:
        await cloneRepository(REPOURL, projectPath);
        await handleReduxTemplate();
        break;
      case TEMPLATE_CHOICES.BUN_TS_BACKEND_API:
        await cloneRepository(APIURL, projectPath);
        break;
      case TEMPLATE_CHOICES.TS_LIBRARY_PROJECT:
        await cloneRepository(LIBURL, projectPath);
        break;
      default:
        console.log(chalk.red("Invalid template choice."));
    }
  } catch (error) {
    console.error(chalk.red("An error occurred:"), error);
  }
}

module.exports = tui;