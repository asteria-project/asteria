:arrow_forward: [Asteria Project Documentation](https://github.com/asteria-project/asteria/blob/master/documentation/asteria-documentation.md) > [Helios: Asteria Server](https://github.com/asteria-project/asteria/blob/master/documentation/helios/helios.md)

# Helios: Asteria Server

## What is Helios?

Helios is a low-level server, built over [Node.js](https://nodejs.org/), that provides developer a robust environement to build Asteria distributed applications.

Developer can also use [Crios](https://github.com/asteria-project/asteria-crios), the high-level distribution of the Helios server, to easily deploy their Asteria apps.

## Requirements

Asteria Helios needs the following system parameters in order to work correctly:

- Node.js 10+
- npm 3+
- TypeScript 3+

## Installation

Set up the Asteria Helios module with:

```bash
$ npm install asteria-helios --save
```

## Create and start a new server instance

You create new server instances by using the `HeliosFactory` class; then, you simply use the `start()` method  to start the server:

```javascript
import { HeliosFactory } from 'asteria-helios';

const server: Helios = HeliosFactory.create();
server.start();
```

The Helios splash screen should appear in the standard output, which ensure that the server runs correctly:

![Helios: Asteria Serve](https://raw.githubusercontent.com/asteria-project/asteria/master/documentation/helios/media/helios-splash-screen.png)

## Server settings

## Workspace

## Helios REST API