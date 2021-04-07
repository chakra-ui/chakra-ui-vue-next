# Guide to creating Components

> How to contribute high-quality, intuitive components to chakra

The goal of this document is to outline the process we follow internally to
develop any Chakra components. At Chakra UI, we strive to make the entire
codebase high-quality, readable, and easy to contribute.

**At the top level, we have a 5 step process to building components:**

1. Share and discuss the component
2. Setup the component package
3. Write the `README` for the component
4. Build the component and write tests as you go
5. Document the component

## 1. Share your ideas

We believe collaboration and communication encourages a mix of expertise, ideas
and perspectives to come together to achieve the level of quality we need for
Chakra UI.

There are two recommended ways to share your component ideas:

- Visit our Discord Server and post it in the `#💡-api-discussion` Channel to
  get a conversation rolling.
- Open a Github Discussion and share your component ideas to get community-wide
  feedback and inputs.

To help us to give quality feedback, we recommended that you follow this
structure for any component or hook you want to contribute:

- Quick description of the idea
- What Problem does it solve?
- What existing solutions have you tried?
- Your solution and how it's better than the alternatives
- API examples

## 2. Setup the component package

Assuming your component idea was accepted by the core team, and you need to
start building, here's what you need to do:

- Run the hygen command to generate your new component. 
  ```bash
  yarn scaffold component --name <COMPONENT_NAME> --description="MY_COMPONENT_DESCRIPTION"
  ```
  This creates a new package with the name `<COMPONENT_NAME>` with some basic sanity tests.

- Run `yarn pkg @chakra-ui/COMPONENT_NAME build` to build and link your component in the monorepo.
  
- Before you can play around with your new component in the playground you will have to export your component from the `@chakra-ui/vue-next` package in the  `core` directory under `packages`.

  * Inside the `index.ts` file, you will have to add `export * from '@chakra-ui/COMPONENT_NAME'`. 

  * Your component also needs to be added as a dependency inside the `package.json` of the `@chakra-ui/vue-next` package as following: 
    ```jsx
    "dependencies": {
      ...
      "@chakra-ui/COMPONENT_NAME": "*",
      ...
    }
    ```

**Run the following commands to start developing on your new component.**

> Commands with an asterisk(`*`) only need to be ran once only after creating a new package.

```bash
# 1. * Fixes all dependency resolutions in the respository*
yarn pkgs:fix

# 2. * Build core package with export from new component
yarn core build

# 3. Start watching for changes in
yarn pkg chakra-ui/COMPONENT_NAME watch

# 4. Starts development server
yarn dev
```


- Update the `package.json` with more relevant content. You need to update
  `description`, `keywords`, `peerDependencies`, `dependencies`, etc.
- Test the build, lint, and test scripts are working correctly

Voila! You're ready to write some beautiful code!

## 3. Build the component or hook

Whether you're developing a component or hook, we have a set of best practices
we advice to follow to deliver on the quality expectations.

### General

- Ensure you check the `@chakra-ui/vue-hooks`, and `@chakra-ui/vue-utils` package to be
  sure we don't already have the hook you're looking to create.
- Leverage existing code, hook, or utils as much as possible.
- Separate component logic from UI by writing hooks, and then writing the
  component theme or styles

### Hooks

Add types for custom hook props and return type

```tsx
export interface UseHookProps {}

export function useHook(props: UseHookProps) {
  return {}
}

export type UseHookReturn = ReturnType<typeof useHook>
```

### Compound components
When building compound component in Vue, we may need to use the `StylesProvider` or component context provider provided by `createContext`. 

**When providing component state, always make sure that you provide your component state in a computed variable**. This will ensure that your provided state is reactive. Otherwise it won't be if the user changes the component state dynamically.

### TypeScript

The end goal of this ensure all Chakra UI components are as strongly typed as
possible to enable teams leverage the library.

- Prefer named exports instead export default
- Reduce use of Generics. Generic code can be highly reusable, but that can also
  come with high complexity and mental overhead.
- Add prop types and return type for hooks
- Add JSDoc comments for each type (used for prop table generation)

## 4. Build and Test

The initial component setup include `test` and `build` scripts you can use to
bundle the component for NPM.

Ensure you run these commands before creating a PR.

### Testing Checklist

- [ ] Common use cases snapshotted
- [ ] Common use cases run through `axe`/`toHaveNoViolations`
- [ ] `role`/`aria`/`data` attributes tested
- [ ] Component behaviors tested (reacts to events, handles callbacks
      appropriately, updates state correctly, etc.)
- [ ] Controlled/uncontrolled use cases tested
- [ ] Associated utils/helpers/etc. tested

## 5. Documentation

- Add `README.md` component to the package
- Add the component to the website in the `sidebar` directory. (TODO)

## Resources

### TypeScript

- Clean Code Guide: https://github.com/labs42io/clean-code-typescript

### Testing

- Common Vue Testing Library scenarios:
  https://testing-library.com/docs/vue-testing-library/examples

- Common Unit Testing Practices:
  https://github.com/mawrkus/js-unit-testing-guide#unit-tests
