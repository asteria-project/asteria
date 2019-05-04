import * as path from 'path';
import { Ouranos, OuranosProcessBuilder, FileReaderProcess, FileReaderConfig, StreamProcessBuilder, CsvToListProcess } from './com/asteria/asteria.index';

const builder: StreamProcessBuilder = OuranosProcessBuilder.getInstance();
const fileReaderConfig: FileReaderConfig = { path: path.join(__dirname, 'temp-data', 'worldcitiespop-dev.csv') };
const csvToListConfig: any = {  };

Ouranos.createSession({ name: 'UsMegaCities'})
       .getContext()
       .getProcessor()
       .add( builder.build(FileReaderProcess, fileReaderConfig) )
       .add( builder.build(CsvToListProcess, csvToListConfig) )
       .run();