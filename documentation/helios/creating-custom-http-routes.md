:arrow_forward: [Asteria Project Documentation](https://github.com/asteria-project/asteria/blob/master/documentation/asteria-documentation.md) > [Helios: Asteria Server](https://github.com/asteria-project/asteria/blob/master/documentation/helios/helios.md) > [Creating custom HTTP routes](https://github.com/asteria-project/asteria/blob/master/documentation/helios/creating-custom-http-routes.md)

# Creating custom HTTP routes

Helios server architecture allows developer to add implementations for serving custom functionalities over their own HTTP routes.

## HeliosRouteConfigurator interface

The `HeliosRouteConfigurator` interface let developer declare new HTTP routes and the way the Helios server instance responds to its associated HTTP calls.

The `createRoute()` method defined by `HeliosRouteConfigurator` interface provides access to the `HeliosRouter` object that manages all of the server HTTP routes.

By adding `GET`, `POST`, `PUT` and `DELETE` actions related to new routes, developer have full control over the custom REST API they add to an Helios server instance.

The following sample class show a basic "Hello World!" implementation of the `HeliosRouteConfigurator` interface:

```javascript
export class HelloWorldRouteConfigurator extends AbstractHeliosRouteConfigurator implements HeliosRouteConfigurator {

	constructor() {
      super('hello-world');
    }

    public createRoute(router: HeliosRouter, context: HeliosContext): void {
        router.getRouter().get('/hello-world', (req: HeliosRequest, res: HeliosResponse) => {
            res.send('Hello World!');
        });
       this.routeAdded('/hello-world');
    }
}
```

## Declaring custom routes HTTP

The Helios SPI provides access to the HTTP route configurator registry where developer can either:

- declare configuration for a new HTTP route 
- override configuration of an existing HTTP route

The HTTP Helios route configurator registry is exposed by the SPI through the `RouteRegistry` interface. To retrieve the service that exposes the HTTP route configurator registry implementation, you typically pass the `HeliosServiceName.ROUTE_CONFIG_REGISTRY` identifier as parameter of the `SpiContext.getService()` method.

The following code shows how to declare the previous `HelloWorldRouteConfigurator` class as a new route configuration of an Helios server instance.

```javascript
const helloWorldRouteConfig: HeliosRouteConfigurator = new HelloWorldRouteConfigurator();

const server: Helios = HeliosFactory.create();

server.getContext()
      .getSpiContext()
      .getService(HeliosServiceName.ROUTE_CONFIG_REGISTRY)
      .add(helloWorldRouteConfig);
```
