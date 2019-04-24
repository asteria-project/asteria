import { AsteriaProcessManager } from './com/asteria/spec/process/AsteriaProcessManager';
import { AsteriaManagerFactory } from './com/asteria/ouranos/factory/AsteriaManagerFactory';
import { AsteriaProcess } from './com/asteria/spec/process/AsteriaProcess';
import { AsteriaProcessBuilder } from './com/asteria/ouranos/util/AsteriaProcessBuilder';
import { AsteriaData } from './com/asteria/spec/data/AsteriaData';
import { CsvToListModule } from './com/asteria/ouranos/module/CsvToListModule';
import { CsvToListModuleConfig } from './com/asteria/ouranos/config/CsvToListModuleConfig';
import { AsteriaDataBuilder } from './com/asteria/ouranos/util/AsteriaDataBuilder';
import { FilterListModule } from './com/asteria/ouranos/module/FilterListModule';
import { FilterListModuleConfig } from './com/asteria/ouranos/config/FilterListModuleConfig';
import { FilterOperator } from './com/asteria/spec/filter/FilterOperator';
import { DistinctListByKeyModule } from './com/asteria/ouranos/module/DistinctListByKeyModule';
import * as path from 'path';
import { FileLoaderModule } from './com/asteria/cronos/module/FileLoaderModule';

const processBuilder: AsteriaProcessBuilder = AsteriaProcessBuilder.getInstance();

const inputPath: AsteriaData<string> = AsteriaDataBuilder.getInstance().build(
    path.join(__dirname, 'temp-data', 'GeoLite2-City-Blocks-IPv4.csv')
);
const loadFileProcess: AsteriaProcess<any> =
    processBuilder.build<any>(new FileLoaderModule(), null, inputPath);

const csvToListConfig: CsvToListModuleConfig = {
    trimFirstRow: true,
    colsMapping: [
        { index: 1, property: 'geonameId' },
        { index: 6, property: 'postalCode' },
        { index: 7, property: 'latitude' },
        { index: 8, property: 'longitude' }
    ]
};
const csvToListProcess: AsteriaProcess<any> =
    processBuilder.build<any>(new CsvToListModule(), csvToListConfig);

const distinctListModule: AsteriaProcess<any> =
processBuilder.build<any>(new DistinctListByKeyModule(), { key: 'zipcode' });

const filterListModuleConfig: FilterListModuleConfig = {
    filters: [
        {
            property: 'zipcode',
            operator: FilterOperator.START_WITH,
            value: '06'
        }
    ]
};
const filterListModule: AsteriaProcess<any> =
    processBuilder.build<any>(new FilterListModule(), filterListModuleConfig);

const manager: AsteriaProcessManager = AsteriaManagerFactory.getInstance()
                                                            .getManager();
manager.add(loadFileProcess);
manager.add(csvToListProcess);
//manager.add(filterListModule);
//manager.add(distinctListModule);
manager.run()
        .then((value: AsteriaData<Array<any>>)=> {
            console.log(value.data.length);
            console.log(value.data[0]);
        }).catch((err: any)=> {
            console.log('err=' + err);
        });

