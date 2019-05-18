:arrow_forward: [Asteria Project Documentation](https://github.com/asteria-project/asteria/blob/master/documentation/asteria-documentation.md) > [Understanding the Theogony](https://github.com/asteria-project/asteria/blob/master/documentation/understanding-the-theogony.md)

# Understanding the Theogony

The Asteria project ships with a large set of modules that can be combined together to create different kind of applications.

Developer typically use high level modules to create workflows based on the Asteria base processes (_e.g. Hyperion_). Low level modules can be used to create custom process implementations and well designed complex applications (_e.g. Ouranos, Cronos_).

## Asteria projects description

The following table gives a brief summary of the Asteria projects:

| Project | Module | Description |
| ------- | ------ | ----------- |
| Asteria | [`asteria`](https://github.com/asteria-project/asteria) | The specification module of the Asteria Project. |
| Gaia | [`asteria-gaia`](https://github.com/asteria-project/asteria-gaia) | The core API of the Asteria specification. |
| Ouranos | [`asteria-ouranos`](https://github.com/asteria-project/asteria-ouranos) | Ouranos is the default implementation of the Asteria Project for JavaScript implementations. |
| Cronos | [`asteria-cronos`](https://github.com/asteria-project/asteria-cronos) | Cronos provides the Asteria stream modules for the Ouranos implementation. |
| Hyperion | [`asteria-hyperion`](https://github.com/asteria-project/asteria-hyperion) | Hyperion provides the API to create Asteria process definitions in JSON format. The Hyperion files can be used to share any Asteria process over distributed systems. |
| Japet | [`asteria-japet`](https://github.com/asteria-project/asteria-japet) | The Japet framework is the implementation of the query language defined by the Astria specification. |
| Helios | [`asteria-helios`](https://github.com/asteria-project/asteria-helios) | Helios is a Node.js application that provides full functionalities based upon the Asteria project APIs. |
| Eos | [`asteria-eos`](https://github.com/asteria-project/asteria-eos) | Eos is a facade that exposes business objects of the Helios server. |
| Atlas | [`asteria-atlas`](https://github.com/asteria-project/asteria-atlas) | Atlas is an Angular application that allows to easily work with Asteria sessions. |
| Crios | [`asteria-crios`](https://github.com/asteria-project/asteria-crios) | Crios is an easy-to-use Helios environment to deploy Asteria REST APIs compatible with Atlas. |

## Asteria projects architecture

The architecture diagram below shows dependency relationships between Asteria projects:

![Asteria projects architecture](https://raw.githubusercontent.com/asteria-project/asteria/master/documentation/media/asteria-package-architecture.png)
