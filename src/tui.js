const execa = require("execa");
const chalk = require("chalk");
const inquirer = require("inquirer");
const REPOURL = require("./constants").REPOURL;
const APIURL = require("./constants").APIURL;

async function tui(projectPath, projectName, projectDirectory) {
  // console.log(chalk.green("\nCloning the repository..."));
  // await execa("git", ["clone", REPOURL, projectPath]);

  console.log(chalk.green("Choose what template you want to use:"));
  const { template } = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "Choose a template for either front-end or back-end development:",
      choices: ["React TS Vite Tailwind Front-end", "Bun TS Backend API"],
    },
  ]);

  if (template === "React TS Vite") {
    console.log(chalk.green("\nCloning the repository..."));
    await execa("git", ["clone", REPOURL, projectPath]);
  }

  if (template === "Bun Backend API") {
    console.log(chalk.green("\nCloning the repository..."));
    await execa("git", ["clone", APIURL, projectPath]);
  }

  process.chdir(projectPath);

  console.log(
    chalk.green("\nInstalling dependencies... This may take a few minutes."),
  );
  await execa("npm", ["install"]);

  await execa("git", ["init"]);

  console.log(
    chalk.green(`\nSuccess! Created ${projectName} at ${projectPath}`),
  );
  console.log("\nInside that directory, you can run several commands:");

  console.log(chalk.cyan(`  npm run dev`));
  console.log(" Starts the development server.");

  console.log(chalk.cyan(`  npm run build`));
  console.log(" Bundles the app into static files for production.");

  console.log("\nWe suggest that you begin by typing:");
  console.log(chalk.cyan(`  cd ${projectDirectory}`));
  console.log(chalk.cyan("  npm run dev"));
}

module.exports = tui;