# Asteria Project

Asteria is a specification for building data analytics streams that are executed through sequential data processors in a JavaScript environment.

![Asteria Logo](https://raw.githubusercontent.com/asteria-project/asteria/master/assets/logos/asteria.png)

## Motivation

## Example

In this sample application, we use the Hyperion processor to load a CSV file of all cities over the world and extract only US cities that have more than 1,000,000 people.

_(The raw data set used to build this sample is available under OPEN DATA LICENSE at: https://public.opendatasoft.com/explore/dataset/worldcitiespop)_


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
        }).run();
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
       .run();
```

Both preceding Asteria implementations will produce the following data set:

```json
{"Country":"us","City":"san diego","AccentCity":"San Diego","Region":"CA","Population":1287050,"Latitude":32.7152778,"Longitude":-117.1563889,"geopoint":"32.7152778, -117.1563889"}
{"Country":"us","City":"houston","AccentCity":"Houston","Region":"TX","Population":2027712,"Latitude":29.7630556,"Longitude":-95.3630556,"geopoint":"29.7630556, -95.3630556"}
{"Country":"us","City":"chicago","AccentCity":"Chicago","Region":"IL","Population":2841952,"Latitude":41.85,"Longitude":-87.65,"geopoint":"41.85, -87.65"}
{"Country":"us","City":"phoenix","AccentCity":"Phoenix","Region":"AZ","Population":1428509,"Latitude":33.4483333,"Longitude":-112.0733333,"geopoint":"33.4483333, -112.0733333"}
{"Country":"us","City":"san antonio","AccentCity":"San Antonio","Region":"TX","Population":1256810,"Latitude":29.4238889,"Longitude":-98.4933333,"geopoint":"29.4238889, -98.4933333"}
{"Country":"us","City":"philadelphia","AccentCity":"Philadelphia","Region":"PA","Population":1453268,"Latitude":39.9522222,"Longitude":-75.1641667,"geopoint":"39.9522222, -75.1641667"}
{"Country":"us","City":"new york","AccentCity":"New York","Region":"NY","Population":8107916,"Latitude":40.7141667,"Longitude":-74.0063889,"geopoint":"40.7141667, -74.0063889"}
{"Country":"us","City":"dallas","AccentCity":"Dallas","Region":"TX","Population":1211704,"Latitude":32.7833333,"Longitude":-96.8,"geopoint":"32.7833333, -96.8"}
{"Country":"us","City":"los angeles","AccentCity":"Los Angeles","Region":"CA","Population":3877129,"Latitude":34.0522222,"Longitude":-118.2427778,"geopoint":"34.0522222, -118.2427778"}
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
