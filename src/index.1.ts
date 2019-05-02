import { AsteriaProcessManager, AsteriaProcess, AsteriaData, StringData } from './com/asteria/gaia/gaia.index';
import { AsteriaManagerFactory, AsteriaProcessBuilder, AsteriaDataBuilder } from './com/asteria/ouranos/ouranos.index';
import { CsvToListModule, CsvToListModuleConfig, DataStorageModule, MergeListByKeyModule, MergeListByKeyModuleConfig } from './com/asteria/crios/crios.index';
import { FileReaderModule } from './com/asteria/cronos/cronos.index';

import * as path from 'path';
import { ListData } from './com/asteria/asteria.index';

const buildFilePath: Function = (fileName: string)=> { 
    return path.join(__dirname, 'temp-data', fileName);
};

const processBuilder: AsteriaProcessBuilder = AsteriaProcessBuilder.getInstance();

const inputPath1: AsteriaData<StringData> = 
    AsteriaDataBuilder.getInstance().buildStringData( buildFilePath('GeoLite2-City-Blocks-IPv4.csv') );

const readFile1Process: AsteriaProcess<StringData> = 
    processBuilder.build<StringData>(new FileReaderModule(), null, inputPath1);

const inputPath2: AsteriaData<StringData> = 
    AsteriaDataBuilder.getInstance().buildStringData( buildFilePath('GeoLite2-City-Locations-en.csv') );

const readFile2Process: AsteriaProcess<StringData> =
    processBuilder.build<any>(new FileReaderModule(), null, inputPath2);

const csv1ToListConfig: CsvToListModuleConfig = {
    trimFirstRow: true,
    colsMapping: [
        { index: 1, property: 'geonameId' },
        { index: 6, property: 'postalCode' },
        { index: 7, property: 'latitude' },
        { index: 8, property: 'longitude' }
    ]
};

const csv1ToListProcess: AsteriaProcess<StringData> =
    processBuilder.build<StringData>(new CsvToListModule(), csv1ToListConfig);

const csv2ToListConfig: CsvToListModuleConfig = {
    trimFirstRow: true,
    colsMapping: [
        { index: 0, property: 'geonameId' },
        { index: 12, property: 'city' }
    ]
};

const csv2ToListProcess: AsteriaProcess<StringData> =
    processBuilder.build<StringData>(new CsvToListModule(), csv2ToListConfig);

const storageProcess1: AsteriaProcess<ListData<any>> =
    processBuilder.build<ListData<any>>(new DataStorageModule(), { key: 'csv1' });

const storageProcess2: AsteriaProcess<ListData<any>> =
    processBuilder.build<ListData<any>>(new DataStorageModule(), { key: 'csv2' });

const mergeListByKeyConfig: MergeListByKeyModuleConfig = {
    key: 'geonameId',
    source: 'csv1',
    target: 'csv2'
};

const mergeListByKeyProcess: AsteriaProcess<ListData<any>> =
    processBuilder.build<ListData<any>>(new MergeListByKeyModule(), mergeListByKeyConfig);
    

/*const filterListModuleConfig: FilterListModuleConfig = {
    filters: [
        {
            property: 'zipcode',
            operator: FilterOperator.START_WITH,
            value: '06'
        }
    ]
};
const filterListProcess: AsteriaProcess<any> =
    processBuilder.build<any>(new FilterListModule(), filterListModuleConfig);*/

const manager: AsteriaProcessManager = AsteriaManagerFactory.getInstance().getManager();
manager.add(readFile1Process);
manager.add(csv1ToListProcess);
manager.add(storageProcess1);
manager.add(readFile2Process);
manager.add(csv2ToListProcess);
manager.add(storageProcess2);
manager.add(mergeListByKeyProcess);
manager.run()
        .then((value: AsteriaData<ListData<any>>)=> {
            console.log(value.data[0]);
        }).catch((err: any)=> {
            console.log('err=' + err);
        });
