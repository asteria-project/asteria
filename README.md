# Asteria Project

[![JEC version](https://img.shields.io/badge/ASTERIA-1.0-%239966FF.svg)](https://github.com/asteria-project)
[![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/mit-license.php)

Asteria is a specification for building data analytics streams that are executed through sequential data processors in a JavaScript environment.

![Asteria Logo](https://raw.githubusercontent.com/asteria-project/asteria/master/assets/logos/asteria.png)

## Motivation

Asteria Project is a  complete set of data analytics tools built over TypeScript and Node.js. It has been designed with different purposes in mind:

- provide a structure for creating modules-based data analytics processors
- focus on extensibility and ease-of-use
- put forward flexibility for many different uses (e.g. big data, signal processing, real-time cryptography, etc.)

## Documentation

The [Asteria Project Documentation](https://github.com/asteria-project/asteria/blob/master/documentation/asteria-documentation.md) will take you from total beginner to Asteria expert.

## Examples

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

Preceding code will produce the following data set:

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
