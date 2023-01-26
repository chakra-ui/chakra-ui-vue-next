Thanks for showing interest to contribute to Chakra UI 💖, you rock!

When it comes to open source, there are different ways you can contribute, all
of which are valuable. Here's a few guidelines that should help you as you
prepare your contribution.

## Setup the Project

The following steps will get you up and running to contribute to Chakra UI:

1. Fork the repo (click the <kbd>Fork</kbd> button at the top right of
   [this page](https://github.com/chakra-ui/chakra-ui-vue-next))

2. Clone your fork locally

```sh
git clone https://github.com/<your_github_username>/chakra-ui-vue-next.git
cd chakra-ui
```

3. Install dependencies and bootstrap the project
```sh
yarn
# After the dependencies are installed, the `postinstall` script with trigger `preconstruct dev` which will build all the component packages.
```

> If you run into any issues during these steps, kindly reach out to the Chakra UI
> Vue team here:[https://discord.gg/cMpMfvxa](https://discord.gg/cMpMfvxa)

## For Windows OS Users
There may be some trouble specific to the local setup in Windows. The following are suggestions in ensuring the local environment boots up successfully:

- The package dependencies and scripts should work with Node `v16.16.0 and higher`
- If you receive the error `EPERM: operation not permitted, symlink` and mentions `preconstruct`, you will need to enable OS developer mode. See Github issue [#381 for Preconstruct](https://github.com/preconstruct/preconstruct/issues/381)

## Development

To improve our development process, we've set up tooling and systems. Chakra UI
uses a monorepo structure and we treat each component as an independent package
that can be consumed in isolation.

If you are looking to build a new component, and it has been approved by the team, head over to the [components-guide.md](./docs/guides/component-guide.md) to help you get started!

### Tooling

- [Lerna](https://lerna.js.org/) to manage installation of dependencies and
  running various scripts. We also have pnpm workspaces enabled by default.
- [Testing Library](https://testing-library.com/) for testing components and
  hooks
- [Vite SSR](https://www.vitejs.org/) for a blazing fast documentation website.
  versioning and changelogs
- [Changeset](https://github.com/atlassian/changesets) for changes
  documentation, changelog generation, and release management.

### Commands

**`pnpm install`**: bootstraps the entire project, symlinks all dependencies for
cross-component development and builds all components.

**`pnpm playground:dev`**: starts components playground server and loads stories in SFCs in the `packages/**/examples/*.vue` file.

**`pnpm docs:dev`**: run the documentation site locally.

**`pnpm docs:build`**: run build for all component packages.

**`pnpm test`**: run test for all component packages.

**`pnpm release`**: publish changed packages.

**`pnpm pkg [package] <cmd>`**: Run a command on the specific package you're
working on. You can run `build`, `test`, `lint` commands.

#### Package Aliasing and pnpm Workspace

Since we're using lerna monorepo + pnpm workspaces by default, this enables us
to run commands within component packages directly from the root.

Each component is named this way: `@chakra-ui/[component]`. Let's say we want to
build the button component. Here's how to do it:

> *Take note that in order to prevent template tags name clashing with HTML elements or other Vue library components,*
> *we prefix all component names with a `c-` in kebab-case or a capital `C` in PascalCase.*

```bash
pnpm workspace @chakra-ui/c-button build

# or

lerna run build --scope @chakra-ui/c-button
```

**Shortcut:**
```bash
# to build
pnpm pkg @chakra-ui/c-tabs build

# to test
pnpm pkg @chakra-ui/c-tabs test
pnpm pkg @chakra-ui/c-tabs test --watch

```

This alias is particularly useful when you're working on a specific component
and want to avoid running the command for all components.

### Documentation

The documentation site is built with Vite.js on SSR. If you'd like to contribute to the
docs, simply run `pnpm build`, and `pnpm docs:dev`

### Components Development Playground

Build components in isolation with Vite using `pnpm playground:dev`

Run `pnpm start` in a separate terminal first so the packages are built and a watcher set up for changes.

## Think you found a bug?

Please conform to the issue template and provide a clear path to reproduction
with a code example. The best way to show a bug is by sending a CodeSandbox
link.

You may wish to use our starters to help you get going:

TODO: Add Typescript starter for `@chakra-ui/vue` v1
TODO: Add Javascript starter for `@chakra-ui/vue` v1

## Proposing new or changed API?

Please provide thoughtful comments and some sample API code. Proposals that
don't line up with our roadmap or don't have a thoughtful explanation will be
closed.

## Making a Pull Request?

Pull requests need only the :+1: of two or more collaborators to be merged; when
the PR author is a collaborator, that counts as one.

### Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

### Steps to PR

1. Fork of the chakra-ui-vue repository and clone your fork

2. Create a new branch out of the `main` branch. We follow the convention
   `[type/scope]`. For example `fix/accordion-hook` or `docs/menu-typo`. `type`
   can be either `docs`, `fix`, `feat`, `build`, or any other conventional
   commit type. `scope` is just a short id that describes the scope of work.

3. Make and commit your changes following the
   [commit convention](https://github.com/chakra-ui/chakra-ui/blob/main/CONTRIBUTING.md#commit-convention).
   As you develop, you can run `pnpm pkg <module> build` and
   `pnpm pkg <module> test` to make sure everything works as expected. Please
   note that you might have to run `pnpm boot` first in order to build all
   dependencies.

4. Run `pnpm changeset` to create a detailed description of your changes. This
   will be used to generate a changelog when we publish an update.
   [Learn more about Changeset](https://github.com/atlassian/changesets/tree/master/packages/cli).
   Please note that you might have to run `git fetch origin main:master` (where
   origin will be your fork on GitHub) before `pnpm changeset` works.

> If you made minor changes like CI config, prettier, etc, you can run
> `pnpm changeset add --empty` to generate an empty changeset file to document
> your changes.

### Tests

All commits that fix bugs or add features need a test.

> **Dear Chakra UI Vue team:** Please do not merge code without tests

## Want to write a blog post or tutorial

That would be amazing! Reach out to the Chakra UI Vue core team here:
https://discord.gg/dQHfcWF. We would love to support you any way we can.

## Want to help improve the docs?

By default, the GitHub REST API has an anonymous user rate limit. This can be
hit during heavy local docs development if the server is frequently restarted.

Creating a GitHub token and storing it as the `GITHUB_TOKEN` environment
variable allows the user to avoid the limit.

Visit
https://github.com/settings/tokens/new?description=Chakra+website+development to
create a new personal access token. After creating the token, be sure to copy
the token string to your clipboard.

You'll then run the following command in the terminal that you'll start the docs
from:

```sh
export GITHUB_TOKEN=<PASTE YOUR TOKEN HERE>
```

## License

By contributing your code to the chakra-ui-vue GitHub repository, you agree to
license your contribution under the MIT license.
