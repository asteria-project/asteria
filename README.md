# Asteria Project

Asteria is a specification for building data analytics streams that are executed through sequential data processors in a JavaScript environment.

![Asteria Logo](https://raw.githubusercontent.com/asteria-project/asteria/master/assets/logos/asteria.png)

## Motivation

## Example

In this sample application, we use the Hyperion processor to load a CSV file of all cities over the world and extract only US cities that have more than 1,000,000 people.

 ```javascript
Hyperion.build({
            name: 'UsMegaCities',
            processes: [
                {
                    type: 'read-file',
                    config: 'worldcitiespop.csv'
                },
                {
                    type: 'csv-to-list',
                    config: { separator: ';' }
                },
                {
                    type: 'filter',
                    config: 'Population  > 1000000 AND Country = \'us\''
                }
            ]
        }).print();
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
            "config": { "separator": ";" }
        },
        {
            "type": "filter",
            "config": "Population  > 1000000 AND Country = 'us'"
        }
    ]
}
```

The previous sample application can be implemented by using the Ouranos framework as shown below:

```javascript
const fileReaderConfig: FileReaderConfig = { path: 'worldcitiespop.csv') };
const csvToListConfig: CsvToListConfig = { separator: ';' };
const filterConfig: FilterConfig = {
    condition: FilterCondition.AND,
    filters: [
        { property: 'Population',   operator: FilterOperator.GREATER_THAN,  value: 1000000 },
        { property: 'Country',      operator: FilterOperator.LIKE,          value: 'us' }
    ]
 };

Ouranos.createSession({ name: 'UsMegaCities'})
       .getContext()
       .getProcessor()
       .add( Ouranos.buildProcess(FileReaderProcess, fileReaderConfig) )
       .add( Ouranos.buildProcess(CsvToListProcess, csvToListConfig) )
       .add( Ouranos.buildProcess(FilterProcess, filterConfig) )
       .print();
```

## Understanding the Theogony

The Asteria project ships with a large set of modules that can be combined together to create different kind of applications.

Developer typically use high level modules to create workflows based on the Asteria base processes (_e.g. Hyperion_). Low level modules can be used to create custom process implementations and well designed complex applications (_e.g. Ouranos, Cronos_).

| Project | Module | Description |
| ------- | ------ | ----------- |
| Asteria | `asteria` | The specification module of the Asteria Project. |
| Gaia | `asteria-gaia` | The core module of the Asteria specification for JavaScript implementations. |
| Ouranos | `asteria-ouranos` | Ouranos is the default implementation of the Asteria Project for JavaScript implementations. |
| Cronos | `asteria-cronos` | Cronos provides the Asteria stream modules for the Ouranos implementation. |
| Hyperion | `asteria-hyperion` | Hyperion provides the API to create Asteria process definitions in JSON format. The Hyperion files can be used to share any Asteria process over distributed systems. |
| Japet | `asteria-japet` | The Japet framework is the implementation of the query language defined by the Astria specification. |

## Assets

### Logos

- [asteria.ai](#) - The Asteria Project logo in vectorial format (_illustrator_).
- [asteria.png](#) - The Asteria Project logo in PNG format (_512x512 px_).
