import { AsteriaProcessManager } from './com/asteria/gaia/process/AsteriaProcessManager';
import { AsteriaManagerFactory } from './com/asteria/ouranos/factory/AsteriaManagerFactory';
import { AsteriaProcess } from './com/asteria/gaia/process/AsteriaProcess';
import { AsteriaProcessBuilder } from './com/asteria/ouranos/util/builder/AsteriaProcessBuilder';
import { AsteriaData } from './com/asteria/gaia/data/AsteriaData';
import { CsvToListModule } from './com/asteria/crios/module/im/CsvToListModule';
import { CsvToListModuleConfig } from './com/asteria/crios/config/im/CsvToListModuleConfig';
import { AsteriaDataBuilder } from './com/asteria/ouranos/util/builder/AsteriaDataBuilder';
import { FileReaderModule } from './com/asteria/cronos/module/im/FileReaderModule';
import { StringData } from './com/asteria/gaia/data/StringData';
import { ListData } from './com/asteria/gaia/data/ListData';
import { FilterListModuleConfig } from './com/asteria/crios/config/im/FilterListModuleConfig';
import { FilterOperator } from './com/asteria/gaia/filter/FilterOperator';
import { FilterListModule } from './com/asteria/crios/module/im/FilterListModule';
import { FilterCondition } from './com/asteria/gaia/filter/FilterCondition';
import * as path from 'path';

const buildFilePath: Function = (fileName: string)=> { 
    return path.join(__dirname, 'temp-data', fileName);
};

const processBuilder: AsteriaProcessBuilder = AsteriaProcessBuilder.getInstance();

const inputPath: AsteriaData<StringData> = AsteriaDataBuilder.getInstance().buildStringData(
    buildFilePath('worldcitiespop.csv')
    //buildFilePath('worldcitiespop-dev.csv')
);

const readFileProcess: AsteriaProcess<StringData> = 
    processBuilder.build<StringData>(new FileReaderModule(), null, inputPath);

const csvToListConfig: CsvToListModuleConfig = {
    trimFirstRow: true,
    separator: ';',
    colsMapping: [
        { index: 0, property: 'country' },
        { index: 2, property: 'city' },
        { index: 3, property: 'region' },
        { index: 4, property: 'population', castFunc: Number },
        { index: 5, property: 'Latitude' },
        { index: 6, property: 'longitude' }
    ]
};

const csvToListProcess: AsteriaProcess<StringData> =
    processBuilder.build<StringData>(new CsvToListModule(), csvToListConfig);
 
const filterListModuleConfig: FilterListModuleConfig = {
    condition: FilterCondition.AND,
    filters: [
        {
            property: 'population',
            operator: FilterOperator.GREATER_THAN,
            value: 1000000
        },
        {
            property: 'country',
            operator: FilterOperator.LIKE,
            value: 'us'
        }
    ]
};
const filterListProcess: AsteriaProcess<any> =
    processBuilder.build<any>(new FilterListModule(), filterListModuleConfig);

const manager: AsteriaProcessManager = AsteriaManagerFactory.getInstance().getManager();
manager.add(readFileProcess);
manager.add(csvToListProcess);
manager.add(filterListProcess);
manager.run()
        .then((value: AsteriaData<ListData<any>>)=> {
            console.log(value.data);
        }).catch((err: any)=> {
            console.log('err=' + err);
        });
