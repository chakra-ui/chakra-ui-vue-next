# Cypress

## Stack


### Running Cypress locally
The testing stack for Chakra UI components uses Cypress for end to end component testing.

Since we're using Jest and Cypress with in the same project, there may be some issues with types clashing between [Jest](https://jestjs.io) and [Cypress](https://cypress.io) as mentioned [here](https://docs.cypress.io/guides/tooling/typescript-support#Clashing-types-with-Jest).

To address these issues, we've explicitly include Cypress as a local module and run tests with it. For this we are using [local-cypress](https://github.com/bahmutov/local-cypress).