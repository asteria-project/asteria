:arrow_forward: [Asteria Project Documentation](https://github.com/asteria-project/asteria/blob/master/documentation/asteria-documentation.md) > [Getting started](https://github.com/asteria-project/asteria/blob/master/documentation/getting-started.md)

# Getting started

Welcome to Asteria! Asteria helps you build data analytics applications for different porposes: big data, signal processing, real time streaming manipulation, etc.

This guide shows you how to build and run a simple Asteria app.

## Prerequisites

Before you begin, make sure your development environment includes [Node.js](https://nodejs.org/)® and an [npm packages](https://docs.npmjs.com/about-npm/index.html) manager.

Moreover, you shouhld 

### Node.js

[Node.js](https://nodejs.org/) is a JavaScript runtime that uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

Asteria requires [Node.js](https://nodejs.org/) 10.x.

### npm package manager

Asteria projects depend on features and functionality provided by libraries that are available as npm packages. To download and install npm packages, you must have an npm package manager.

The entire Asteria documentation uses the [npm client](https://docs.npmjs.com/cli/install) command line interface, which is installed with [Node.js](https://nodejs.org/) by default.

### TypeScript

[TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) is a typed superset of JavaScript that compiles to plain JavaScript. It offers classes, modules, and interfaces to help you build robust components.

All Asteria projects require [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) 3.x.

## Ouranos framework

Asteria is a JavaScript specification which ships with a bunch of convenient frameworks to help developer to create data analytics applications faster.

Ouranos is the default implementation of the Asteria specification. It provides a well-designed architecture for easily building stream-based data analytics components.

### Create a new project

First create a new directory for your project into your personal workspace. Then, add a `package.json` file to your project to help you to manage dependencies.

To create a `package.json` file with values that you supply, use the npm init command.

1. On the command line, navigate to the root directory of your package. cd /path/to/package.
2. Run the following command: `npm init`.
3. Answer the questions in the command line questionnaire.
4. Run the following command to install TypeScript: `npm install typescript --save-dev`.

### Install the Ouranos framework

To install the Ouranos framework with npm, open a terminal/console window and enter the following command:

```shell
npm install asteria-ouranos --save
```

## Create your first Ouranos application

### Understanding sessions

Sessions are the execution container of Ouranos applications. Developer use sessions to declare contexts where Asteria processes are encapsulated in order to pipe and process data.

You use the `Ouranos` class as entry point to create a new session:

```javascript
import {Ouranos} from 'asteria-ouranos';

Ouranos.createSession({ name: 'SampleSession'});
```

Once you have created a new session, you can access its Asteria processor by using the session context:

```javascript
import {Ouranos} from 'asteria-ouranos';

Ouranos.createSession({ name: 'SampleSession'})
       .getContext()
       .getProcessor();
```

### Declare Asteria processes

Processes are the fundamental building blocks of Asteria applications. 