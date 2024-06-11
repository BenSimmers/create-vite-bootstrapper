const path = require("path");
const fs = require("fs-extra");
const execa = require("execa");
const inquirer = require("inquirer");
const chalk = require("chalk");

async function BootstrapApp(projectDirectory) {
  const projectPath = path.resolve(process.cwd(), projectDirectory);
  const repoUrl = "https://github.com/BenSimmers/TypeScript-Vite-React-app.git";

  console.clear();
  console.log(
    chalk.blue(
      "Welcome to the React TypeScript Vite Tailwind CSS Bootstrapper!\n",
    ),
  );
  console.log(chalk.green("Press ^C at any time to quit."));
  console.log(chalk.yellow(`To view the template, visit: ${repoUrl}\n`));

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

  console.log(chalk.green("\nCloning the repository..."));
  await execa("git", ["clone", repoUrl, projectPath]);

  process.chdir(projectPath);

  // we would want to move away from this, theres some weird caching issue with the repo where the old .husky folder is still there
  if (fs.existsSync(path.resolve(projectPath, ".husky")))
    fs.removeSync(path.resolve(projectPath, ".husky"));

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

module.exports = BootstrapApp;
