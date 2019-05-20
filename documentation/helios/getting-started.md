:arrow_forward: [Asteria Project Documentation](https://github.com/asteria-project/asteria/blob/master/documentation/asteria-documentation.md) > [Helios: Asteria Server](https://github.com/asteria-project/asteria/blob/master/documentation/helios/helios.md) > [Getting Started](https://github.com/asteria-project/asteria/blob/master/documentation/helios/getting-started.md)

# Getting Started

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


## Helios execution modes

Helios server can be started in both, development and production modes. Each mode execution uses its own configuration file:

- development mode: `server-config.dev.json`
- production mode: `server-config.json`

By default Helios instances start in production mode. To launch the server in development mode, you must specify the `dev` parameter in the command line:

```shell
$ crios start dev
```
