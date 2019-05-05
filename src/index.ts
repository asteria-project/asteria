import { Ouranos, FileReaderProcess, FileReaderConfig, CsvToListProcess, CsvToListConfig, FileWriterProcess } from './com/asteria/asteria.index';
import * as path from 'path';

const tempDataPath: string = path.join(__dirname, 'temp-data');
const fileReaderConfig: FileReaderConfig = { path: path.join(tempDataPath, 'worldcitiespop-dev.csv') };
const fileWriterProcess: FileReaderConfig = { path: path.join(tempDataPath, 'test.txt') };
const csvToListConfig: CsvToListConfig = { separator: ';' };

Ouranos.createSession({ name: 'UsMegaCities'})
       .getContext()
       .getProcessor()
       .add( Ouranos.buildProcess(FileReaderProcess, fileReaderConfig) )
       .add( Ouranos.buildProcess(CsvToListProcess, csvToListConfig) )
       .add( Ouranos.buildProcess(FileWriterProcess, fileWriterProcess) )
       .run();