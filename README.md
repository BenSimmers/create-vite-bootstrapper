# create-vite-bootstrapper

This is a simple script to create a vite project with the following features:
- TypeScript
- ESLint
- Prettier
- TailwindCSS
- PostCSS

## Usage

```bash
npx create-vite-bootstrapper my-project
```

## Notes
This is a companion command for the template repository [TypeScript-Vite-React](https://github.com/BenSimmers/TypeScript-Vite-React-app.git) which is used as the boilerplate for the project.

## Contributing
- This is a simple script, but we are using changesets as a way to manage versioning. Please make sure to create a changeset for your changes.
- This is also import as when you make a PR the changeset will be added to the PR and the version will be updated automatically.
- To create a changeset run `yarn changeset` or `npx changeset` and follow the prompts.

