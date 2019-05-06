import { Hyperion } from '../src/com/asteria/asteria.index';
import * as path from 'path';

const tempDataPath: string = path.join(__dirname, 'temp-data');
const inputPath: string = path.join(tempDataPath, 'worldcitiespop.csv');
const outputPath: string = path.join(tempDataPath, 'us-mega-cities.csv');

Hyperion.build({
    name: 'UsMegaCities',
    processes: [
        {
            type: 'read-file',
            config: inputPath
        },
        {
            type: 'csv-to-list',
            config: {
                separator: ';',
                colsMap: [
                    { id: 0, prop: 'country' },
                    { id: 2, prop: 'city' },
                    { id: 3, prop: 'region' },
                    { id: 4, prop: 'population' },
                    { id: 5, prop: 'latitude' },
                    { id: 6, prop: 'longitude' }
                ]
            }
        },
        {
            type: 'filter',
            config: 'population GREATER_THAN 1000000 AND country LIKE \'us\''
        },
        {
            type: 'list-to-csv',
            config: { separator: ';' }
        },
        {
            type: 'write-file',
            config: outputPath
        }
    ]
}).run();

/* output:
*************************************************
country;city;region;population;latitude;longitude
us;San Diego;CA;1287050;32.7152778;-117.1563889
us;Houston;TX;2027712;29.7630556;-95.3630556
us;Chicago;IL;2841952;41.85;-87.65
us;Phoenix;AZ;1428509;33.4483333;-112.0733333
us;San Antonio;TX;1256810;29.4238889;-98.4933333
us;Philadelphia;PA;1453268;39.9522222;-75.1641667
us;New York;NY;8107916;40.7141667;-74.0063889
us;Dallas;TX;1211704;32.7833333;-96.8
us;Los Angeles;CA;3877129;34.0522222;-118.2427778
*************************************************
*/
