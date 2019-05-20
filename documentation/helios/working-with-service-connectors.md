:arrow_forward: [Asteria Project Documentation](https://github.com/asteria-project/asteria/blob/master/documentation/asteria-documentation.md) > [Helios: Asteria Server](https://github.com/asteria-project/asteria/blob/master/documentation/helios/helios.md) > [Working with service connectors](https://github.com/asteria-project/asteria/blob/master/documentation/helios/working-with-service-connectors.md)

# Working with service connectors

Helios server architecture is built over a Service Provider Interface (SPI) to manage user and technical data persistence. SPI provides a flexible way to let developer deploy Helio servers over different data storage stacks (MongoDB, SQL, etc.).

## SpiContext interface

The `SpiContext` interface provides an operation for adding services with a particular scope. Helios services are components that provide implementation of communication interfaces accessible through namespaces declared in the SPI.

Any instance of `ServiceContext` defines a service connector. Service connectors provide the contextual declaration and execution environment of a service.

Service connectors cannot be set at runtime (after the server instance started).

## Helios services

The current section shows how to configure services for an Helios instance.

## Service contexts declarations

Each Helios instance exposes a `SpiContext` object which allows to register custom implementations of Helios services. Developer declare a new `ServiceContext` implementation by using the `addServiceContext()` method.

The following example shows how to replace the default `ProcessorRegistry` service by another implementation based upon MongoDB:


```javascript
import { Helios, HeliosFactory } from 'asteria-helios';
import { MongoDBProcessorRegistryServiceContext } from 'asteria-helios-mongodb';

const server: Helios = HeliosFactory.create();
server.getContext()
      .getSpiContext()
      .addServiceContext(new MongoDBProcessorRegistryServiceContext());
server.start();
```

### Helios instance configurator

The default implementation of Helios server uses local files storage to manage data persistence. So, developer have to set all services manually when they want to use a uniformized database environment for managing data.

In that case, Helios configurators are useful to setup server instances and hide painful config declarations. The following sample application shows how to configure and start a new server instance based on the MongoDB configurator:

```javascript
import { MongoDBConfigurator, MongoDBConfiguratorOptions } from 'asteria-helios-mongodb';

const options: MongoDBConfiguratorOptions = {
  ...
};
MongoDBConfigurator.create(options).start();
```
