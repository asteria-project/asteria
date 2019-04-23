import { AsteriaProcessManager } from './com/asteria/spec/process/AsteriaProcessManager';
import { AsteriaManagerFactory } from './com/asteria/cronos/factory/AsteriaManagerFactory';
import { AsteriaProcess } from './com/asteria/spec/process/AsteriaProcess';
import { AsteriaProcessBuilder } from './com/asteria/cronos/util/AsteriaProcessBuilder';
import { AsteriaData } from './com/asteria/spec/data/AsteriaData';
import { StringData } from './com/asteria/spec/data/StringData';
import { CsvToListModule } from './com/asteria/cronos/module/CsvToListModule';
import { CsvToListModuleConfig } from './com/asteria/spec/config/CsvToListModuleConfig';
import { MOCK_DATA } from './MockData';
import { DataInputModule } from './com/asteria/cronos/module/DataInputModule';
import { AsteriaDataBuilder } from './com/asteria/cronos/util/AsteriaDataBuilder';
import { FilterListModule } from './com/asteria/cronos/module/FilterListModule';
import { FilterListModuleConfig } from './com/asteria/spec/config/FilterListModuleConfig';
import { FilterOperator } from './com/asteria/spec/filter/FilterOperator';
import { DistinctListByKeyModule } from './com/asteria/cronos/module/DistinctListByKeyModule';

const input: AsteriaData<string> = AsteriaDataBuilder.getInstance().build(MOCK_DATA);

const processBuilder: AsteriaProcessBuilder = AsteriaProcessBuilder.getInstance();

const inputModule: AsteriaProcess<StringData> = 
    processBuilder.build<StringData>(new DataInputModule(), null, input);
const csvToListConfig: CsvToListModuleConfig = {
    trimFirstRow: true,
    colsMapping: [
        { index: 2, property: 'zipcode' },
        { index: 3, property: 'city' }
    ]
};
const csvToListModule: AsteriaProcess<any> =
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
manager.add(inputModule);
manager.add(csvToListModule);
manager.add(filterListModule);
//manager.add(distinctListModule);
manager.run()
       .then((value: AsteriaData<Array<any>>)=> {
            console.log(value.data);
       }).catch((err: any)=> {
            console.log('err=' + err);
       });
