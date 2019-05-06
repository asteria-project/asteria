import { Ouranos, FileReaderProcess, FileReaderConfig, CsvToListProcess, CsvToListConfig, FileWriterProcess, FilterProcess, FilterConfig, FilterCondition, FilterOperator, ListToCsvProcess, ListToCsvConfig } from '../src/com/asteria/asteria.index';
import * as path from 'path';

const tempDataPath: string = path.join(__dirname, 'temp-data');
const fileReaderConfig: FileReaderConfig = { path: path.join(tempDataPath, 'worldcitiespop.csv') };
const fileWriterProcess: FileReaderConfig = { path: path.join(tempDataPath, 'us-mega-cities.csv') };
const csvToListConfig: CsvToListConfig = {
    separator: ';',
    colsMapping: [
        { index: 0, property: 'country' },
        { index: 2, property: 'city' },
        { index: 3, property: 'region' },
        { index: 4, property: 'population' },
        { index: 5, property: 'latitude' },
        { index: 6, property: 'longitude' }
    ]
};
const listToCsvConfig: ListToCsvConfig = { separator: ';' };
const filterConfig: FilterConfig = {
    condition: FilterCondition.AND,
    filters: [
       { property: 'population',   operator: FilterOperator.GREATER_THAN,  value: 1000000 },
       { property: 'country',      operator: FilterOperator.EQUAL,          value: 'us' }
    ]
};

Ouranos.createSession({ name: 'UsMegaCities'})
       .getContext()
       .getProcessor()
       .add( Ouranos.buildProcess(FileReaderProcess, fileReaderConfig) )
       .add( Ouranos.buildProcess(CsvToListProcess, csvToListConfig) )
       .add( Ouranos.buildProcess(FilterProcess, filterConfig) )
       .add( Ouranos.buildProcess(ListToCsvProcess, listToCsvConfig) )
       .add( Ouranos.buildProcess(FileWriterProcess, fileWriterProcess) )
       .run();

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
