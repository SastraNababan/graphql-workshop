# Fullstack GraphQL Workshop

Welcome to the client portion of the workshop! For the morning session, we will be building a React app that pulls a list of movies, filters them by type, and allows you to favorite them after you've been logged in. The app is backed by Create React App and Apollo Client.

## File Structure (in order of importance):
- `index.js`: Where we set up Apollo Client
- `components/`: All of the React components that you will connect to Apollo
- `data.js`: Seed data powering the components before we switch to GraphQL
- `App.js`: The top-level App component. You won't need to modify this file.
- `index.css`: Some random CSS. You won't need to modify this file.

## Running on CodeSandbox

[![Edit fullstack-workshop-client](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/apollographql/fullstack-workshop-client/tree/00-start/)

1. Click the button above to navigate to the CodeSandbox. Fork it to your account by clicking Fork in the top menu.
2. That's it! CodeSandbox features HMR, a console, and a test runner. It's pretty awesome. 😍

### Sandboxes
- [`00-start`](https://codesandbox.io/s/github/apollographql/fullstack-workshop-client/tree/00-start): Your starting point
- [`01-apollo-client`](https://codesandbox.io/s/github/apollographql/fullstack-workshop-client/tree/01-apollo-client): Setting up Apollo Boost and React Apollo
- [`02-queries`](https://codesandbox.io/s/github/apollographql/fullstack-workshop-client/tree/02-queries): Writing Query components
- [`03-pagination`](https://codesandbox.io/s/github/apollographql/fullstack-workshop-client/tree/03-pagination): Writing Query components with Pagination
- [`04-login`](https://codesandbox.io/s/github/apollographql/fullstack-workshop-client/tree/04-login): Writing Mutation components for login & authentication
- [`05-mutations`](https://codesandbox.io/s/github/apollographql/fullstack-workshop-client/tree/05-mutations): Writing Mutation components & optimistic UI
- [`06-final`](https://codesandbox.io/s/github/apollographql/fullstack-workshop-client): Local state management with apollo-link-state

## FAQ
- **I didn't complete the last exercise and want to catch up**: No worries! Each branch is its own CodeSandbox so everyone can go at their own pace. To check out the completed solution for your exercise, just click the CodeSandbox links above.

## Running locally

1. Clone the repo: `git clone https://github.com/apollographql/fullstack-workshop-client`
2. Install the dependencies: `npm i`
3. Start the server: `npm start`