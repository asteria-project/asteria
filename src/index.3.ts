import { AsteriaProcess, AsteriaData, StringData, ListData, FilterOperator, FilterCondition } from './com/asteria/gaia/gaia.index';
import { Ouranos, AsteriaProcessBuilder, AsteriaDataBuilder } from './com/asteria/ouranos/ouranos.index';
import { CsvToListModule, CsvToListModuleConfig, FilterListModuleConfig, FilterListModule } from './com/asteria/crios/crios.index';
import { FileReaderModule } from './com/asteria/cronos/cronos.index';
import * as path from 'path';


const buildFilePath: Function = (fileName: string)=> { 
    return path.join(__dirname, 'temp-data', fileName);
};

const inputPath: string = buildFilePath('worldcitiespop.csv');
//buildFilePath('worldcitiespop-dev.csv')

const processBuilder: AsteriaProcessBuilder = AsteriaProcessBuilder.getInstance();

const inputPathData: AsteriaData<StringData> = AsteriaDataBuilder.getInstance().buildStringData(inputPath);

const readFileProcess: AsteriaProcess<StringData> = 
    processBuilder.build<StringData>(new FileReaderModule(), null, inputPathData);

const csvToListConfig: CsvToListModuleConfig = {
    trimFirstRow: true,
    separator: ';',
    colsMapping: [
        { index: 0, property: 'country' },
        { index: 2, property: 'city' },
        { index: 3, property: 'region' },
        { index: 4, property: 'population', castFunc: Number },
        { index: 5, property: 'latitude' },
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

Ouranos.buildSession('UsMegaCities')
       .getContext()
       .getProcessManager()
       .add(readFileProcess)
       .add(csvToListProcess)
       .add(filterListProcess)
       .run()
        .then((value: AsteriaData<ListData<any>>)=> {
            console.log(value.data);
        }).catch((err: any)=> {
            console.log('err=' + err);
        });
