# `@chakra-ui/vue` for Vue 3 (WIP)

The official working repository for V1 of Chakra UI Vue with Vue 3 support.

[See Roadmap](https://www.notion.so/4517ba273ef3409d8e0e9ec3d121f6c1?v=ce00244a41b74b79b4d01ee4c3aa61ec)

### Install dependencies
```bash
yarn install
```

### Build components
```bash
yarn build
```

### Bootstrap and link packages
```bash
yarn bootstrap
```

### Component playground (based on vite)
```bash
yarn dev
```

## Development Guide
### Major todos:
- [ ] Documentation
- [ ] Accessibility JS hooks (Documented in Roadmap)

### Creating a new commit message
The commits follow the [conventional commit format](https://www.conventionalcommits.org/). Husky is setup to lint your commit messages to match this format. 
```bash
type(scope?): subject #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")
```

For example:

```bash
git commit -m "feat(component): create x component"

git commit -m "chore: update x dependencies"
```

For more information visit: [github.com/conventional-changelog/commitlint/#what-is-commitlint](https://github.com/conventional-changelog/commitlint/#what-is-commitlint)