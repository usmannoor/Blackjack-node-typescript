# Blackjack APIs using Mongoose Node.js Express TypeScript.

This project is a glimpse of Blackjack/Poker game which contains the following features:
- Create Deck (Shuffled/Un-shuffled)
- Open Deck
- Draw Deck

There are **2 types of card decks**:
- SHORT (containing 36 cards)
- FULL (containing 52 cards)


# Getting started

- Install dependencies

```
npm install
npm run tsc
```

- Build and run the project with auto reload (nodemon)

```
npm run server
```

- Build and run the project

```
npm run start
```

- Lint

```
npm run lint
npm run lint:fix
```

- Test

```
npm run test-dev
```

Finally, navigate to `http://localhost:5000/` and you should see the API running!

I have used **Environment Variables** inside the project.

## Project Structure

The most obvious difference in a TypeScript + Node project is the folder structure. In a TypeScript project, it's best to have separate _source_ and _distributable_ files. TypeScript (`.ts`) files live in your `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `npm run start`

| Name               | Description                                                                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **config**         | Contains DB connection and constants file.                                                        |
| **dist**           | Contains the distributable (or output) from your TypeScript build                                                                                             |
| **node_modules**   | Contains all your npm dependencies                                                                                                                            |
| **src**            | Contains your source code that will be compiled to the dist dir                                                                                               |
| **src/middleware** | Contains the middleware to intercept requests (JOI Validation has been used)                                                                                                              |
| **src/models**     | Models define Mongoose schemas that will be used in storing and retrieving data from MongoDB                                                                  |
| **src/routes**     | Routes define the endpoints of your API                                                                                                                       |
| **src/interfaces** | Contains all interface to better handle type checking with TypeScript                                                                                 |
| **src/server.ts**  | Entry point to your express app                                                                                                                               |
| package.json       | File that contains npm dependencies as well as build scripts                                                    |
| tsconfig.json      | Config settings for compiling server code written in TypeScript                                                                                               |
| tslint.json        | Config settings for TSLint code style checking                                                                                                                |

### Configuring TypeScript compilation

TypeScript uses the file `tsconfig.json` to adjust project compile options.
Let's dissect this project's `tsconfig.json`, starting with the `compilerOptions` which details how your project is compiled.

```json
{
  "compilerOptions": {
    "declaration": false,
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "noImplicitAny": false,
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "baseUrl": ".",
    "importHelpers": true,
    "typeRoots": [
      "node_modules/@types"
    ],
    "paths": {
      "*": ["node_modules/*", "src/types/*"]
    },
    "allowSyntheticDefaultImports": true
  },
  "exclude": [
    "node_modules",
    "src/test/*.ts"
  ]
}
```

| `compilerOptions`            | Description                                                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"module": "commonjs"`       | The **output** module type (in your `.js` files). Node uses commonjs, so that is what we use                                                               |
| `"esModuleInterop": true,`   | Allows usage of an alternate module import syntax: `import foo from 'foo';`                                                                                |
| `"target": "es6"`            | The output language level. Node supports ES6, so we can target that here                                                                                   |
| `"noImplicitAny": false`      | Disables a stricter setting which throws errors when something has a default `any` value                                                                    |
| `"moduleResolution": "node"` | TypeScript attempts to mimic Node's module resolution strategy. Read more [here](https://www.typescriptlang.org/docs/handbook/module-resolution.html#node) |
| `"sourceMap": true`          | We want source maps to be output along side our JavaScript. See the [debugging](#debugging) section                                                        |
| `"outDir": "dist"`           | Location to output `.js` files after compilation                                                                                                           |
| `"baseUrl": "."`             | Part of configuring module resolution. See [path mapping section](#installing-dts-files-from-definitelytyped)                                              |
| `"typeRoots": []`             | By default all visible `@types` packages are included in compilation)                                              |
| `"allowSyntheticDefaultImports": true`             | Allows to do imports like `import bodyParser from "body-parser"`                                              |
| `paths: {...}`               | Part of configuring module resolution. See [path mapping section](#installing-dts-files-from-definitelytyped)                                              |
| `exclude`                    | Used for other libraries in testing infrastructure which aren’t needed in the main application like `node_modules` and `tests`.                                              |

The rest of the file define the TypeScript project context.
The project context is basically a set of options that determine which files are compiled when the compiler is invoked with a specific `tsconfig.json`.
In this case, we use the following to define our project context:

```json
{
  "include": [
        "src/**/*"
    ]
}
```

`include` takes an array of glob patterns of files to include in the compilation.

### Running the build

All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
In `package.json`, you will see a `scripts` section with all the different scripts you can call.
To call a script, simply run `npm run <script-name>` from the command line.
Below is a list of all the scripts this template has available:

| Npm Script     | Description                                                                                   |
| -------------- | --------------------------------------------------------------------------------------------- |
| `tsc`          | Transpiles TypeScript codes to JavaScript.                                                    |
| `watch-tsc`    | Transpiles TypeScript codes to JavaScript, with auto reload.                                  |
| `deploy`       | Runs node on `dist/server.js` which is the app's entry point.                                 |
| `watch-deploy` | Runs node on `dist/server.js` which is the app's entry point, with auto reload.               |
| `server`       | Transpiles TypeScript codes to JavaScript then run node on `dist/server.js` with auto reload. |
| `start`        | Transpiles TypeScript codes to JavaScript then run node on `dist/server.js`.                  |
| `lint`         | Checkout the code errors related to linting rules.                  |
| `lint:fix`     | Fix the linting errors.                  |
| `test-dev`     | Tests the functionality using mocha chai framework.                  |

Since we're developing with TypeScript, it is important for the codes to be transpiled first to JavaScript before running the node server. It is best to deploy the app using: `npm run server` or `npm run start` command.

# Dependencies

Dependencies are being managed through `package.json`.
In that file you'll find two sections:

## `dependencies`

| Package           | Description                                     |
| ----------------- | ----------------------------------------------- |
| express           | Node.js web framework.                          |
| mongoose          | MongoDB modeling tool in an async environment.  |
| request           | Simplified HTTP client for Node.js.             |
| typescript        | Typed superset of JavaScript.                   |
| uuid              | Unique uuids                                    |
| joi               | API request validation                          |

## `devDependencies`

Since TypeScript is being used, dependencies should be accompanied by their corresponding DefinitelyTyped @types package.

| Package             | Description                             |
| ------------------- | --------------------------------------- |
| @types/chai         | DefinitelyTyped for chai                |
| @types/mocha        | DefinitelyTyped for mocha               |
| ts-node             | Dependency for test                     |
| @types/express      | DefinitelyTyped for express             |
| @types/mongoose     | DefinitelyTyped for mongoose            |
| concurrently        | Run multiple commands concurrently      |
| nodemon             | Reload node application on code changes |
| tslint              | Code linting                            |

To install or update these dependencies you can use `npm install` or `npm update`.
