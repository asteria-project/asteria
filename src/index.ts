import { AsteriaProcessManager } from './com/asteria/spec/process/AsteriaProcessManager';
import { AsteriaManagerFactory } from './com/asteria/ouranos/factory/AsteriaManagerFactory';
import { AsteriaProcess } from './com/asteria/spec/process/AsteriaProcess';
import { AsteriaProcessBuilder } from './com/asteria/ouranos/util/builder/AsteriaProcessBuilder';
import { AsteriaData } from './com/asteria/spec/data/AsteriaData';
import { CsvToListModule } from './com/asteria/ouranos/module/CsvToListModule';
import { CsvToListModuleConfig } from './com/asteria/ouranos/config/CsvToListModuleConfig';
import { AsteriaDataBuilder } from './com/asteria/ouranos/util/builder/AsteriaDataBuilder';
import { FileLoaderModule } from './com/asteria/cronos/module/FileLoaderModule';
import * as path from 'path';
import { DataStorageModule } from './com/asteria/ouranos/module/DataStorageModule';
import { MergeListByKeyModule } from './com/asteria/ouranos/module/MergeListByKeyModule';
import { MergeListByKeyModuleConfig } from './com/asteria/ouranos/config/MergeListByKeyModuleConfig';

const buildFilePath: Function = (fileName: string)=> { 
    return path.join(__dirname, 'temp-data', fileName);
};

const processBuilder: AsteriaProcessBuilder = AsteriaProcessBuilder.getInstance();

const inputPath1: AsteriaData<string> = AsteriaDataBuilder.getInstance().build(
    buildFilePath('GeoLite2-City-Blocks-IPv4.csv')
);
const inputPath2: AsteriaData<string> = AsteriaDataBuilder.getInstance().build(
    buildFilePath('GeoLite2-City-Locations-en.csv')
);

const loadFile1Process: AsteriaProcess<any> =
    processBuilder.build<any>(new FileLoaderModule(), null, inputPath1);

const loadFile2Process: AsteriaProcess<any> =
    processBuilder.build<any>(new FileLoaderModule(), null, inputPath2);

const csv1ToListConfig: CsvToListModuleConfig = {
    trimFirstRow: true,
    colsMapping: [
        { index: 1, property: 'geonameId' },
        { index: 6, property: 'postalCode' },
        { index: 7, property: 'latitude' },
        { index: 8, property: 'longitude' }
    ]
};

const csv2ToListConfig: CsvToListModuleConfig = {
    trimFirstRow: true,
    colsMapping: [
        { index: 0, property: 'geonameId' },
        { index: 12, property: 'city' }
    ]
};

const csv1ToListProcess: AsteriaProcess<any> =
    processBuilder.build<any>(new CsvToListModule(), csv1ToListConfig);

const csv2ToListProcess: AsteriaProcess<any> =
    processBuilder.build<any>(new CsvToListModule(), csv2ToListConfig);

const storageProcess1: AsteriaProcess<any> =
    processBuilder.build<any>(new DataStorageModule(), { key: 'csv1' });

const storageProcess2: AsteriaProcess<any> =
    processBuilder.build<any>(new DataStorageModule(), { key: 'csv2' });

const mergeListByKeyConfig: MergeListByKeyModuleConfig = {
    key: 'geonameId',
    source1: 'csv1',
    source2: 'csv2'
};
const mergeListByKeyProcess: AsteriaProcess<any> =
    processBuilder.build<any>(new MergeListByKeyModule(), mergeListByKeyConfig);
    

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

const manager: AsteriaProcessManager = AsteriaManagerFactory.getInstance()
                                                            .getManager();
manager.add(loadFile1Process);
manager.add(csv1ToListProcess);
manager.add(storageProcess1);
manager.add(loadFile2Process);
manager.add(csv2ToListProcess);
manager.add(storageProcess2);
manager.add(mergeListByKeyProcess);
manager.run()
        .then((value: AsteriaData<Array<any>>)=> {
            console.log(value.data[0]);
        }).catch((err: any)=> {
            console.log('err=' + err);
        });

