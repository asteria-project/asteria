# Asteria Project

Asteria is a specification for building data analytics modules that are executed through sequential data processors in a JavaScript environment.

![Asteria Logo](https://raw.githubusercontent.com/asteria-project/asteria/master/assets/logos/asteria.png)

## Motivation

## Example

In this sample application, we use the Hyperion processor to load a CSV file of all cities over the world and extract only US cities that have more than 1,000,000 people.

```javascript
const config: HyperionConfig = {
    name: 'UsMegaCities',
    processes: [
        {
            type: 'read-file',
            config: 'worldcitiespop.csv'
        },
        {
            type: 'csv-to-list',
            config: {
                separator: ';',
                cast: [
                    { prop: 'Population', ref: 'number' }
                ]
            }
        },
        {
            type: 'filter',
            config: 'Population > 1000000 AND Country = \'us\''
        }
    ]
};
Hyperion.build(config).print();
```

Notice that the Hyperion config object specified above can be defined as a JSON string as shown below:

```json
{
    "name": "UsMegaCities",
    "processes": [
        {
            "type": "read-file",
            "config": "worldcitiespop.csv"
        },
        {
            "type": "csv-to-list",
            "config": {
                "separator": ";",
                "cast": [
                    { "prop": "Population", "ref": "number" }
                ]
            }
        },
        {
            "type": "filter",
            "config": "Population > 1000000 AND Country = 'us'"
        }
    ]
}
```

## Understanding the Theogony

The Asteria project ships with a large set of modules that can be combined together to create different kind of applications.

Developer typically use high level modules to create workflows based on the Asteria base processes (_e.g. Hyperion_). Low level modules can be used to create custom process implementations and well designed complex applications (_e.g. Ouranos, Cronos_).

| Project | Module | Description |
| ------- | ------ | ----------- |
| Asteria | `asteria` | The specification module of the Asteria Project. |
| Gaia | `asteria-gaia` | The core module of the Asteria specification for JavaScript implementations. |
| Ouranos | `asteria-ouranos` | Ouranos is the default implementation of the Asteria Project for JavaScript implementations. |
| Crios | `asteria-crios` | Crios provides the Asteria modules for the Ouranos implementation. |
| Cronos | `asteria-cronos` | Cronos provides a set of Asteria modules that can be deployed within a Node.js environment. |
| Atlas | `asteria-atlas` | Atlas provides a set of Asteria modules that can be used by Angular applications. |
| Hyperion | `asteria-hyperion` | Hyperion provides the API to create Asteria process definitions in JSON format. The Hyperion files can be used to share any Asteria process over distributed systems. |

## Assets

### Logos

- [asteria.ai](#) - The Asteria Project logo in vectorial format (_illustrator_).
- [asteria.png](#) - The Asteria Project logo in PNG format (_512x512 px_).
