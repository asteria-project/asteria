import { Ouranos, FileReaderProcess, FileReaderConfig, CsvToListProcess, CsvToListConfig, FileWriterProcess, FilterProcess, FilterConfig, FilterCondition, FilterOperator } from './com/asteria/asteria.index';
import * as path from 'path';

const tempDataPath: string = path.join(__dirname, 'temp-data');
const fileReaderConfig: FileReaderConfig = { path: path.join(tempDataPath, 'worldcitiespop.csv') };
const fileWriterProcess: FileReaderConfig = { path: path.join(tempDataPath, 'us-mega-cities.csv') };
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
       //.add( Ouranos.buildProcess(ListToCsvProcess) )
       .add( Ouranos.buildProcess(FileWriterProcess, fileWriterProcess) )
       .run();