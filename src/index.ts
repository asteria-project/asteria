import { Ouranos, FileReaderProcess, FileReaderConfig, CsvToListProcess, CsvToListConfig } from './com/asteria/asteria.index';
import * as path from 'path';

const fileReaderConfig: FileReaderConfig = { path: path.join(__dirname, 'temp-data', 'worldcitiespop-dev.csv') };
const csvToListConfig: CsvToListConfig = { separator: ';' };

Ouranos.createSession({ name: 'UsMegaCities'})
       .getContext()
       .getProcessor()
       .add( Ouranos.buildProcess(FileReaderProcess, fileReaderConfig) )
       .add( Ouranos.buildProcess(CsvToListProcess, csvToListConfig) )
       .run();