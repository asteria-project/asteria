import { AsteriaProcessManager } from './com/asteria/gaia/process/AsteriaProcessManager';
import { AsteriaManagerFactory } from './com/asteria/ouranos/factory/AsteriaManagerFactory';
import { AsteriaProcess } from './com/asteria/gaia/process/AsteriaProcess';
import { AsteriaProcessBuilder } from './com/asteria/ouranos/util/builder/AsteriaProcessBuilder';
import { AsteriaData } from './com/asteria/gaia/data/AsteriaData';
import { CsvToListModule } from './com/asteria/crios/module/im/CsvToListModule';
import { CsvToListModuleConfig } from './com/asteria/crios/config/im/CsvToListModuleConfig';
import { AsteriaDataBuilder } from './com/asteria/ouranos/util/builder/AsteriaDataBuilder';
import { FileLoaderModule } from './com/asteria/cronos/module/im/FileLoaderModule';
import { StringData } from './com/asteria/gaia/data/StringData';

import * as path from 'path';
import { ListData } from './com/asteria/asteria.index';

const buildFilePath: Function = (fileName: string)=> { 
    return path.join(__dirname, 'temp-data', fileName);
};

const processBuilder: AsteriaProcessBuilder = AsteriaProcessBuilder.getInstance();

const inputPath: AsteriaData<StringData> = 
    AsteriaDataBuilder.getInstance().buildStringData( buildFilePath('worldcitiespop.csv') );

const loadFile1Process: AsteriaProcess<StringData> = 
    processBuilder.build<StringData>(new FileLoaderModule(), null, inputPath);

const csvToListConfig: CsvToListModuleConfig = {
    trimFirstRow: true,
    separator: ';',
    colsMapping: [
        { index: 0, property: 'country' },
        { index: 2, property: 'city' },
        { index: 3, property: 'region' },
        { index: 4, property: 'population' },
        { index: 5, property: 'Latitude' },
        { index: 6, property: 'longitude' }
    ]
};

const csvToListProcess: AsteriaProcess<StringData> =
    processBuilder.build<StringData>(new CsvToListModule(), csvToListConfig);
    

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
manager.add(loadFile1Process);
manager.add(csvToListProcess);
manager.run()
        .then((value: AsteriaData<ListData<any>>)=> {
            console.log(value.data[0]);
            console.log(value.data.length)
        }).catch((err: any)=> {
            console.log('err=' + err);
        });
