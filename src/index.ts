import { AsteriaProcessManager } from './com/asteria/spec/process/AsteriaProcessManager';
import { AsteriaManagerFactory } from './com/asteria/ouranos/factory/AsteriaManagerFactory';
import { AsteriaProcess } from './com/asteria/spec/process/AsteriaProcess';
import { AsteriaProcessBuilder } from './com/asteria/ouranos/util/AsteriaProcessBuilder';
import { AsteriaData } from './com/asteria/spec/data/AsteriaData';
import { CsvToListModule } from './com/asteria/ouranos/module/CsvToListModule';
import { CsvToListModuleConfig } from './com/asteria/ouranos/config/CsvToListModuleConfig';
import { AsteriaDataBuilder } from './com/asteria/ouranos/util/AsteriaDataBuilder';
import { FileLoaderModule } from './com/asteria/cronos/module/FileLoaderModule';
import * as path from 'path';
import { DataStorageModule } from './com/asteria/ouranos/module/DataStorageModule';

const buildFilePath: Function = (fileName: string)=> { 
    return path.join(__dirname, 'temp-data', fileName);
};

const processBuilder: AsteriaProcessBuilder = AsteriaProcessBuilder.getInstance();

const inputPath: AsteriaData<string> = AsteriaDataBuilder.getInstance().build(
    buildFilePath('GeoLite2-City-Blocks-IPv4.csv')
);
const loadFileProcess: AsteriaProcess<any> =
    processBuilder.build<any>(new FileLoaderModule(), null, inputPath);

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

const csvToListProcess: AsteriaProcess<any> =
    processBuilder.build<any>(new CsvToListModule(), csv1ToListConfig);

const storageProcess: AsteriaProcess<any> =
    processBuilder.build<any>(new DataStorageModule(), { key: 'csv1' });

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
manager.add(loadFileProcess);
manager.add(csvToListProcess);
manager.add(storageProcess);
loadFileProcess.input.data = buildFilePath('GeoLite2-City-Locations-en.csv');
manager.add(loadFileProcess);
csvToListProcess.config = csv2ToListConfig;
manager.add(csvToListProcess);
storageProcess.config.key = 'csv2';
manager.add(storageProcess);
//manager.add(filterListProcess);
manager.run()
        .then((value: AsteriaData<Array<any>>)=> {
            console.log(value.data[0]);
        }).catch((err: any)=> {
            console.log('err=' + err);
        });

