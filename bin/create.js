#!/usr/bin/env node

const { program } = require("commander");
const BootstrapApp = require("../src/index");

program
  .version("1.0.0")
  .arguments("<project-directory>")
  .description(
    "Create a new React app using Vite, TypeScript, and Tailwind CSS.",
  )
  .action((projectDirectory) => {
    BootstrapApp(projectDirectory);
  });

program.parse(process.argv);
