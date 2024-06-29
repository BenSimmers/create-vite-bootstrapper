const execa = require("execa");
const chalk = require("chalk");
const REPOURL = require("./constants").REPOURL;

async function tui(projectPath, projectName, projectDirectory) {
  console.log(chalk.green("\nCloning the repository..."));
  await execa("git", ["clone", REPOURL, projectPath]);

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